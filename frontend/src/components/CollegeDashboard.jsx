import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle, XCircle, Bell, Users, Settings, LogOut 
} from 'lucide-react';

const CollegeDashboard = () => {
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    setCompanies([
      {
        id: 1,
        companyName: 'Tech Solutions Inc.',
        termsAccepted: true,
        verified: false
      },
      {
        id: 2,
        companyName: 'Innovatech Ltd.',
        termsAccepted: false,
        verified: false
      }
    ]);

    setNotifications([
      {
        id: 1,
        message: 'New company registration pending verification',
        type: 'info',
        timestamp: '1 hour ago'
      }
    ]);
  }, []);

  const verifyCompany = (companyId) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, verified: true } : c));
    setNotifications(prev => [{
      id: Date.now(),
      message: `Company ID ${companyId} verified successfully`,
      type: 'success',
      timestamp: 'Just now'
    }, ...prev]);
  };

  const rejectCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    setNotifications(prev => [{
      id: Date.now(),
      message: `Company ID ${companyId} rejected`,
      type: 'error',
      timestamp: 'Just now'
    }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">College Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.email}</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Companies Pending Verification</h2>
          {companies.length === 0 && <p>No companies pending verification.</p>}
          <ul>
            {companies.map(company => (
              <li key={company.id} className="flex justify-between items-center border-b py-3">
                <div>
                  <p className="font-semibold">{company.companyName}</p>
                  <p className="text-sm text-gray-600">Terms Accepted: {company.termsAccepted ? 'Yes' : 'No'}</p>
                  <p className="text-sm text-gray-600">Verified: {company.verified ? 'Yes' : 'No'}</p>
                </div>
                <div className="space-x-2">
                  {!company.verified && (
                    <>
                      <button
                        onClick={() => verifyCompany(company.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        <CheckCircle size={16} className="inline mr-1" />
                        Verify
                      </button>
                      <button
                        onClick={() => rejectCompany(company.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        <XCircle size={16} className="inline mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          {notifications.length === 0 && <p>No notifications.</p>}
          <ul>
            {notifications.map(notification => (
              <li key={notification.id} className="border-b py-2">
                <p>{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.timestamp}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CollegeDashboard;
