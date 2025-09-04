import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Settings, LogOut, Plus, Edit, Trash2 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
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
    }
  });

  useEffect(() => {
    // Mock data for demonstration
    setCompanies([
      {
        id: 1,
        companyName: 'Tech Solutions Inc.',
        website: 'https://techsolutions.com',
        description: 'Leading technology company',
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
        }
      }
    ]);
  }, []);

  const handleAddCompany = () => {
    const company = {
      id: Date.now(),
      ...newCompany
    };
    setCompanies(prev => [...prev, company]);
    setNewCompany({
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
      }
    });
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  const handleUpdateCompany = () => {
    setCompanies(prev => prev.map(c => c.id === selectedCompany.id ? selectedCompany : c));
    setSelectedCompany(null);
  };

  const renderCompanyForm = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{selectedCompany ? 'Edit Company' : 'Add New Company'}</h3>
      <input
        type="text"
        placeholder="Company Name"
        value={selectedCompany ? selectedCompany.companyName : newCompany.companyName}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, companyName: e.target.value}) : setNewCompany({...newCompany, companyName: e.target.value})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Website"
        value={selectedCompany ? selectedCompany.website : newCompany.website}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, website: e.target.value}) : setNewCompany({...newCompany, website: e.target.value})}
        className="border p-2 rounded mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={selectedCompany ? selectedCompany.description : newCompany.description}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, description: e.target.value}) : setNewCompany({...newCompany, description: e.target.value})}
        className="border p-2 rounded mb-2 w-full"
        rows={3}
      />
      <input
        type="text"
        placeholder="Contact Person Name"
        value={selectedCompany ? selectedCompany.contactPerson.name : newCompany.contactPerson.name}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, contactPerson: {...selectedCompany.contactPerson, name: e.target.value}}) : setNewCompany({...newCompany, contactPerson: {...newCompany.contactPerson, name: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Contact Email"
        value={selectedCompany ? selectedCompany.contactPerson.email : newCompany.contactPerson.email}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, contactPerson: {...selectedCompany.contactPerson, email: e.target.value}}) : setNewCompany({...newCompany, contactPerson: {...newCompany.contactPerson, email: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="tel"
        placeholder="Contact Phone"
        value={selectedCompany ? selectedCompany.contactPerson.phone : newCompany.contactPerson.phone}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, contactPerson: {...selectedCompany.contactPerson, phone: e.target.value}}) : setNewCompany({...newCompany, contactPerson: {...newCompany.contactPerson, phone: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Street Address"
        value={selectedCompany ? selectedCompany.address.street : newCompany.address.street}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, address: {...selectedCompany.address, street: e.target.value}}) : setNewCompany({...newCompany, address: {...newCompany.address, street: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="City"
        value={selectedCompany ? selectedCompany.address.city : newCompany.address.city}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, address: {...selectedCompany.address, city: e.target.value}}) : setNewCompany({...newCompany, address: {...newCompany.address, city: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="State"
        value={selectedCompany ? selectedCompany.address.state : newCompany.address.state}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, address: {...selectedCompany.address, state: e.target.value}}) : setNewCompany({...newCompany, address: {...newCompany.address, state: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Pincode"
        value={selectedCompany ? selectedCompany.address.pincode : newCompany.address.pincode}
        onChange={(e) => selectedCompany ? setSelectedCompany({...selectedCompany, address: {...selectedCompany.address, pincode: e.target.value}}) : setNewCompany({...newCompany, address: {...newCompany.address, pincode: e.target.value}})}
        className="border p-2 rounded mb-2 w-full"
      />
      <div className="flex space-x-2">
        {selectedCompany ? (
          <>
            <button
              onClick={handleUpdateCompany}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Company
            </button>
            <button
              onClick={() => setSelectedCompany(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleAddCompany}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={16} className="inline mr-2" />
            Add Company
          </button>
        )}
      </div>
    </div>
  );

  const renderCompaniesList = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Companies</h3>
      {companies.length === 0 && <p>No companies found.</p>}
      <ul>
        {companies.map(company => (
          <li key={company.id} className="border-b py-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{company.companyName}</h4>
                <p className="text-gray-600">{company.website}</p>
                <p className="text-gray-600">{company.contactPerson.name} - {company.contactPerson.email}</p>
                <p className="text-gray-600">{company.address.city}, {company.address.state}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCompany(company)}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                >
                  <Edit size={14} className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm"
                >
                  <Trash2 size={14} className="inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
        {renderCompanyForm()}
        {renderCompaniesList()}
      </main>
    </div>
  );
};

export default AdminDashboard;
