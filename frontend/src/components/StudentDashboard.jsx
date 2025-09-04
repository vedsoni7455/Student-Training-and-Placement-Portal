import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Briefcase, Bell, FileText, 
  Calendar, Mail, Settings, LogOut 
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [profile, setProfile] = useState({
    firstName: localStorage.getItem('userFirstName') || '',
    lastName: localStorage.getItem('userLastName') || '',
    enrollmentNumber: '',
    course: '',
    branch: '',
    semester: '',
    cgpa: '',
    skills: [],
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    resumeUrl: ''
  });

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // Mock profile data
    setProfile({
      firstName: 'John',
      lastName: 'Doe',
      enrollmentNumber: 'EN2023001',
      course: 'B.Tech',
      branch: 'Computer Science',
      semester: 6,
      cgpa: 8.5,
      skills: ['React', 'Node.js', 'Python', 'MongoDB'],
      contactNumber: '+91 9876543210',
      address: {
        street: '123 College Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      }
    });

    // Mock jobs data
    setJobs([
      {
        id: 1,
        company: 'Google',
        title: 'Software Engineer Intern',
        package: '₹50,000/month',
        location: 'Bangalore',
        deadline: '2024-03-15',
        minCGPA: 7.5,
        requirements: ['React', 'JavaScript', 'Algorithms']
      },
      {
        id: 2,
        company: 'Microsoft',
        title: 'Frontend Developer',
        package: '₹12 LPA',
        location: 'Hyderabad',
        deadline: '2024-03-20',
        minCGPA: 8.0,
        requirements: ['React', 'TypeScript', 'CSS']
      }
    ]);

    // Mock applications
    setApplications([
      {
        id: 1,
        jobId: 1,
        company: 'Google',
        position: 'Software Engineer Intern',
        status: 'pending',
        appliedDate: '2024-03-10'
      }
    ]);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        message: 'New job posted by Amazon',
        type: 'info',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        message: 'Your application to Google is under review',
        type: 'success',
        timestamp: '1 day ago'
      }
    ]);
  }, []);

  const handleApplyJob = (jobId) => {
    // In real implementation, this would call the backend API
    const job = jobs.find(j => j.id === jobId);
    setApplications(prev => [...prev, {
      id: Date.now(),
      jobId,
      company: job.company,
      position: job.title,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    }]);
    
    setNotifications(prev => [{
      id: Date.now(),
      message: `Applied to ${job.title} at ${job.company}`,
      type: 'success',
      timestamp: 'Just now'
    }, ...prev]);
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressUpdate = (field, value) => {
    setProfile(prev => ({ 
      ...prev, 
      address: { ...prev.address, [field]: value } 
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In real implementation, this would upload to Firebase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, resumeUrl: e.target.result }));
        setNotifications(prev => [{
          id: Date.now(),
          message: 'Resume uploaded successfully!',
          type: 'success',
          timestamp: 'Just now'
        }, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Number</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.enrollmentNumber}
                onChange={(e) => handleProfileUpdate('enrollmentNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.enrollmentNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.contactNumber}
                onChange={(e) => handleProfileUpdate('contactNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.contactNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.course}
                onChange={(e) => handleProfileUpdate('course', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.course}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.branch}
                onChange={(e) => handleProfileUpdate('branch', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.branch}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.semester}
                onChange={(e) => handleProfileUpdate('semester', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="8"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.semester}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.cgpa}
                onChange={(e) => handleProfileUpdate('cgpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                step="0.01"
                min="0"
                max="10"
              />
            ) : (
              <p className="text-lg text-gray-900">{profile.cgpa}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
        {isEditing ? (
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume</h2>
        {profile.resumeUrl ? (
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-gray-800">Resume uploaded</p>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Resume
              </a>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No resume uploaded yet</p>
            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );

  const renderJobsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Available Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-lg text-blue-600">{job.company}</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {job.package}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-600">Location:</span>
              <p className="text-gray-800">{job.location}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Deadline:</span>
              <p className="text-gray-800">{job.deadline}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Min CGPA:</span>
              <p className="text-gray-800">{job.minCGPA}</p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-600">Requirements:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {job.requirements.map((req, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {req}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleApplyJob(job.id)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
      {applications.map(app => (
        <div key={app.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{app.position}</h3>
              <p className="text-lg text-blue-600">{app.company}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              app.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {app.status}
            </span>
          </div>
          <p className="text-gray-600">Applied on: {app.appliedDate}</p>
        </div>
      ))}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-800">{notification.message}</p>
          <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'jobs': return renderJobsTab();
      case 'applications': return renderApplicationsTab();
      case 'notifications': return renderNotificationsTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {profile.firstName} {profile.lastName}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white rounded-lg shadow p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'jobs' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase size={20} />
                <span>Available Jobs</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'applications' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                <span>My Applications</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
