import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Toaster, toast } from 'react-hot-toast';
import { Shield, LogOut, LogIn } from 'lucide-react';
import { VaccineForm } from './components/VaccineForm';
import { VaccineList } from './components/VaccineList';

interface Vaccine {
  id: string;
  name: string;
  dateAdministered: string;
  nextDueDate: string;
  notificationEmail: string;
  notificationPhone: string;
}

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  const handleAddVaccine = (vaccineData: Omit<Vaccine, 'id'>) => {
    const newVaccine = {
      ...vaccineData,
      id: crypto.randomUUID(),
    };
    setVaccines([...vaccines, newVaccine]);
    toast.success('Vaccine record added successfully!');
  };

  const handleDeleteVaccine = (id: string) => {
    setVaccines(vaccines.filter((v) => v.id !== id));
    toast.success('Vaccine record deleted successfully!');
  };
  console.log('VaccinesList: ', vaccines);
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                PetVax Tracker
              </span>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Vaccine Record
              </h2>
              <VaccineForm onSubmit={handleAddVaccine} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vaccine Records
              </h2>
              <VaccineList vaccines={vaccines} onDelete={handleDeleteVaccine} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Welcome to PetVax Tracker
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Please login to manage your pet's vaccine records
            </p>
            <button
              onClick={() => loginWithRedirect()}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Get Started
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;