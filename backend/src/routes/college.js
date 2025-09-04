import express from 'express';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import { authenticateToken, requireCollege } from '../middleware/auth.js';

const router = express.Router();

// Get all companies pending verification
router.get('/companies/pending', authenticateToken, requireCollege, async (req, res) => {
  try {
    const companies = await Company.find({ 
      verifiedByCollege: false 
    }).populate('userId');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify company
router.post('/companies/:companyId/verify', authenticateToken, requireCollege, async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.companyId,
      { verifiedByCollege: true },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company verified successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs pending approval
router.get('/jobs/pending', authenticateToken, requireCollege, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      status: 'pending_approval' 
    }).populate('companyId');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve job
router.post('/jobs/:jobId/approve', authenticateToken, requireCollege, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { 
        status: 'approved',
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job approved successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject job
router.post('/jobs/:jobId/reject', authenticateToken, requireCollege, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { status: 'rejected' },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job rejected', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get placement statistics
router.get('/statistics', authenticateToken, requireCollege, async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const verifiedCompanies = await Company.countDocuments({ verifiedByCollege: true });
    const totalJobs = await Job.countDocuments();
    const approvedJobs = await Job.countDocuments({ status: 'approved' });
    const totalApplications = await Job.aggregate([
      { $unwind: '$applications' },
      { $count: 'total' }
    ]);

    res.json({
      totalCompanies,
      verifiedCompanies,
      totalJobs,
      approvedJobs,
      totalApplications: totalApplications[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
