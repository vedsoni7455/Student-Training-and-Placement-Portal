import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building, Briefcase, Users, Bell, 
  FileText, Settings, LogOut, Plus, Edit, Trash2
} from 'lucide-react';

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [companyProfile, setCompanyProfile] = useState({
    companyName: '',
    website: '',
    description: '',
    contactPerson: {
      name: '',
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    termsAndConditionsAccepted: false,
    verifiedByCollege: false
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: {
      minCGPA: '',
      course: [],
      branch: [],
      skills: []
    },
    package: '',
    location: '',
    jobType: 'Full-time',
    applicationDeadline: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    setCompanyProfile({
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
    });

    setJobs([
      {
        id: 1,
        title: 'Software Engineer',
        status: 'approved',
        applications: 15,
        postedDate: '2024-03-01'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        status: 'pending_approval',
        applications: 8,
        postedDate: '2024-03-10'
      }
    ]);

    setApplications([
      {
        id: 1,
        studentName: 'John Doe',
        position: 'Software Engineer',
        status: 'pending',
        appliedDate: '2024-03-05',
        cgpa: 8.5,
        skills: ['React', 'Node.js', 'Python']
      }
    ]);
  }, []);

  const handleCreateJob = () => {
    // In real implementation, this would call the backend API
    const job = {
      id: Date.now(),
      title: newJob.title,
      status: 'draft',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [...prev, job]);
    setNewJob({
      title: '',
      description: '',
      requirements: {
        minCGPA: '',
        course: [],
        branch: [],
        skills: []
      },
      package: '',
      location: '',
      jobType: 'Full-time',
      applicationDeadline: ''
    });
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Briefcase className="text-blue-600 mr-3" size={24} />
          <div>
            <p className="text-2xl font-bold">{jobs.length}</p>
            <p className="text-gray-600">Total Jobs</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Users className="text-green-600 mr-3" size={24} />
          <div>
            <p className="text-2xl font-bold">{applications.length}</p>
            <p className="text-gray-600">Total Applications</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Building className="text-purple-600 mr-3" size={24} />
          <div>
            <p className="text-2xl font-bold">{companyProfile.verifiedByCollege ? 'Verified' : 'Pending'}</p>
            <p className="text-gray-600">Verification Status</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Create New Job</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({...newJob, title: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Package (e.g., ₹12 LPA)"
            value={newJob.package}
            onChange={(e) => setNewJob({...newJob, package: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) => setNewJob({...newJob, location: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Application Deadline"
            value={newJob.applicationDeadline}
            onChange={(e) => setNewJob({...newJob, applicationDeadline: e.target.value})}
            className="border p-2 rounded"
          />
        </div>
        <textarea
          placeholder="Job Description"
          value={newJob.description}
          onChange={(e) => setNewJob({...newJob, description: e.target.value})}
          className="border p-2 rounded w-full mt-4"
          rows={3}
        />
        <button
          onClick={handleCreateJob}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} className="inline mr-2" />
          Create Job
        </button>
      </div>

      <h3 className="text-xl font-semibold">Posted Jobs</h3>
      {jobs.map(job => (
        <div key={job.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-gray-600">Posted: {job.postedDate}</p>
              <p className="text-gray-600">Applications: {job.applications}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              job.status === 'approved' ? 'bg-green-100 text-green-800' :
              job.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {job.status.replace('_', ' ')}
            </span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
              <Edit size={14} className="inline mr-1" />
              Edit
            </button>
            <button className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm">
              <Trash2 size={14} className="inline mr-1" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Job Applications</h3>
      {applications.map(app => (
        <div key={app.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold">{app.studentName}</h4>
              <p className="text-gray-600">Applied for: {app.position}</p>
              <p className="text-gray-600">CGPA: {app.cgpa}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {app.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              app.status === 'selected' ? 'bg-green-100 text-green-800' :
              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {app.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-2">Applied on: {app.appliedDate}</p>
          <div className="mt-4 flex space-x-2">
            <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
              Select
            </button>
            <button className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm">
              Reject
            </button>
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
              View Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'jobs': return renderJobs();
      case 'applications': return renderApplications();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Company Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{companyProfile.companyName}</span>
              <span className="text-gray-700">({user?.email})</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <LogOut size={16} className="inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 bg-white rounded-lg shadow p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Building size={20} />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'jobs' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase size={20} />
                <span>Jobs</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'applications' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                <span>Applications</span>
              </button>
            </nav>
          </div>

          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
