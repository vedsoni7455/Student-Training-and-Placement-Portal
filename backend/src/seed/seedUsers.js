import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Company from '../models/Company.js';

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vedbarbhaya:password1234@muiir-placement.nodhgpi.mongodb.net/MUIIR-Student-Portal');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Company.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const users = [
      {
        email: 'student1@example.com',
        firebaseUid: 'student1',
        role: 'student',
        profileCompleted: true
      },
      {
        email: 'student2@example.com',
        firebaseUid: 'student2',
        role: 'student',
        profileCompleted: true
      },
      {
        email: 'company1@example.com',
        firebaseUid: 'company1',
        role: 'company',
        profileCompleted: true
      },
      {
        email: 'college@example.com',
        firebaseUid: 'college',
        role: 'college',
        profileCompleted: true
      },
      {
        email: 'admin@example.com',
        firebaseUid: 'admin',
        role: 'admin',
        profileCompleted: true
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Created test users');

    // Create student profiles
    const students = [
      {
        userId: createdUsers[0]._id,
        firstName: 'John',
        lastName: 'Doe',
        enrollmentNumber: 'EN2023001',
        course: 'B.Tech',
        branch: 'Computer Science',
        semester: 6,
        cgpa: 8.5,
        skills: ['React', 'Node.js', 'Python'],
        contactNumber: '+91 9876543210',
        address: {
          street: '123 College Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      {
        userId: createdUsers[1]._id,
        firstName: 'Jane',
        lastName: 'Smith',
        enrollmentNumber: 'EN2023002',
        course: 'B.Tech',
        branch: 'Information Technology',
        semester: 6,
        cgpa: 9.0,
        skills: ['Java', 'Spring Boot', 'MySQL'],
        contactNumber: '+91 8765432109',
        address: {
          street: '456 University Road',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001'
        }
      }
    ];

    await Student.insertMany(students);
    console.log('Created student profiles');

    // Create company profile
    const company = {
      userId: createdUsers[2]._id,
      companyName: 'Tech Solutions Inc.',
      website: 'https://techsolutions.com',
      description: 'Leading technology company providing innovative solutions',
      contactPerson: {
        name: 'Robert Johnson',
        email: 'robert@techsolutions.com',
        phone: '+91 7654321098'
      },
      address: {
        street: '789 Tech Park',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      termsAndConditionsAccepted: true,
      verifiedByCollege: true
    };

    await Company.create(company);
    console.log('Created company profile');

    console.log('Seed data created successfully!');
    console.log('\nTest Users:');
    console.log('Student 1: student1@example.com (password: student1)');
    console.log('Student 2: student2@example.com (password: student2)');
    console.log('Company: company1@example.com (password: company1)');
    console.log('College: college@example.com (password: college)');
    console.log('Admin: admin@example.com (password: admin)');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedUsers();
