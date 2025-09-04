import express from 'express';
import Student from '../models/Student.js';
import { authenticateToken, requireStudent } from '../middleware/auth.js';

const router = express.Router();

// Get student profile
router.get('/profile', authenticateToken, requireStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate('applications.jobId');
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update student profile
router.post('/profile', authenticateToken, requireStudent, async (req, res) => {
  try {
    const studentData = req.body;
    let student = await Student.findOne({ userId: req.user._id });

    if (student) {
      // Update existing profile
      student = await Student.findOneAndUpdate(
        { userId: req.user._id },
        studentData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      student = new Student({ userId: req.user._id, ...studentData });
      await student.save();
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student applications
router.get('/applications', authenticateToken, requireStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id })
      .populate('applications.jobId');
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.json(student.applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
