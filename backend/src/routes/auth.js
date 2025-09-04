import express from 'express';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify Firebase ID token
async function verifyFirebaseToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

// Register or login user
router.post('/login', async (req, res) => {
  const { idToken, role } = req.body;
  if (!idToken || !role) {
    return res.status(400).json({ message: 'idToken and role are required' });
  }
  
  try {
    // For development/testing without Firebase Admin
    if (!admin.apps.length) {
      // Mock authentication for development
      const mockUser = await User.findOne({ email: idToken }); // Using idToken as email for dev
      if (!mockUser) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      const token = jwt.sign({ userId: mockUser._id, role: mockUser.role }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });
      
      return res.json({ token, user: { id: mockUser._id, email: mockUser.email, role: mockUser.role } });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({ firebaseUid, email, role });
      await user.save();
    } else {
      user.role = role; // Update role if changed
      await user.save();
    }

    // Create JWT token for session
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Invalid authentication' });
  }
});

// Protected route example
router.get('/profile', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
