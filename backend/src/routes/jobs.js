import express from 'express';
import Job from '../models/Job.js';
import Company from '../models/Company.js';
import Student from '../models/Student.js';
import { authenticateToken, requireCompany, requireStudent, requireCollege } from '../middleware/auth.js';

const router = express.Router();

// Get all approved jobs (for students)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      status: 'approved',
      applicationDeadline: { $gt: new Date() }
    }).populate('companyId');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create job (company)
router.post('/', authenticateToken, requireCompany, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const jobData = { 
      ...req.body, 
      companyId: company._id,
      status: 'pending_approval',
      collegeNotificationSent: true
    };
    const job = new Job(jobData);
    await job.save();

    // Add job to company's jobsPosted array
    company.jobsPosted.push(job._id);
    await company.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Apply for job (student)
router.post('/:jobId/apply', authenticateToken, requireStudent, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Check if already applied
    const existingApplication = student.applications.find(
      app => app.jobId.toString() === job._id.toString()
    );
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    // Add application to student
    student.applications.push({
      jobId: job._id,
      status: 'pending'
    });
    await student.save();

    // Add application to job
    job.applications.push({
      studentId: student._id,
      status: 'pending'
    });
    await job.save();

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job applications (company)
router.get('/:jobId/applications', authenticateToken, requireCompany, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate('applications.studentId');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify company owns this job
    const company = await Company.findOne({ userId: req.user._id });
    if (job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(job.applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
