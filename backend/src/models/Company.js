import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String
  },
  description: {
    type: String
  },
  contactPerson: {
    name: String,
    email: String,
    phone: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  termsAndConditionsAccepted: {
    type: Boolean,
    default: false
  },
  verifiedByCollege: {
    type: Boolean,
    default: false
  },
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
}, {
  timestamps: true
});

companySchema.index({ userId: 1 });
companySchema.index({ companyName: 1 });

const Company = mongoose.model('Company', companySchema);

export default Company;
