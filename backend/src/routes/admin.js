import express from 'express';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Student from '../models/Student.js';
import Job from '../models/Job.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-firebaseUid');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/users/:userId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-firebaseUid');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user status
router.patch('/users/:userId/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive },
      { new: true }
    ).select('-firebaseUid');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all companies
router.get('/companies', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const companies = await Company.find().populate('userId');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students
router.get('/students', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const students = await Student.find().populate('userId');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs
router.get('/jobs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('companyId')
      .populate('applications.studentId');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get system statistics
router.get('/statistics', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalStudents = await Student.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Job.aggregate([
      { $unwind: '$applications' },
      { $count: 'total' }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications: totalApplications[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
