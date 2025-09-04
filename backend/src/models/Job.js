import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    minCGPA: {
      type: Number,
      min: 0,
      max: 10
    },
    course: [String],
    branch: [String],
    skills: [String]
  },
  package: {
    type: String
  },
  location: {
    type: String
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Internship', 'Part-time'],
    default: 'Full-time'
  },
  applicationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'rejected', 'closed'],
    default: 'draft'
  },
  approvedByCollege: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  collegeNotificationSent: {
    type: Boolean,
    default: false
  },
  applications: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected', 'selected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

jobSchema.index({ companyId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ applicationDeadline: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
