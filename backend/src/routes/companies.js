import express from 'express';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import { authenticateToken, requireCompany } from '../middleware/auth.js';

const router = express.Router();

// Get company profile
router.get('/profile', authenticateToken, requireCompany, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id }).populate('jobsPosted');
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update company profile
router.post('/profile', authenticateToken, requireCompany, async (req, res) => {
  try {
    const companyData = req.body;
    let company = await Company.findOne({ userId: req.user._id });

    if (company) {
      company = await Company.findOneAndUpdate(
        { userId: req.user._id },
        companyData,
        { new: true, runValidators: true }
      );
    } else {
      company = new Company({ userId: req.user._id, ...companyData });
      await company.save();
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get company jobs
router.get('/jobs', authenticateToken, requireCompany, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }
    const jobs = await Job.find({ companyId: company._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
