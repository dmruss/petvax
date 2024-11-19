'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { VaccineForm } from './VaccineForm';
import { VaccineList } from './VaccineList';
import { WelcomeScreen } from './WelcomeScreen';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { swapKeys } from '../lib/utils';


export interface Vaccine {
  id: string;
  name: string;
  dateAdministered: string;
  nextDueDate: string;
  notificationEmail: string;
  notificationPhone: string;
}

export function VaccineManager() {
  const { user, isLoading } = useUser();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);


  useEffect(() => {
    // Simulate fetching data on page load
    let response;
    if (user) {
      const fetchData = async () => {
        try {
          response = await fetch(`/api/protected/vaccine?email=${user.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
        } catch (error) {
          console.error('Error:', error);
        }
        console.log('response json');
        let responseJson = await response.json();
        console.log(responseJson);
        if (response.ok) {
          let responseAppKeys = swapKeys(responseJson);
          console.log('KEYS');
          console.log(responseAppKeys);
          // Replace this with actual data fetching logic
          setVaccines(responseAppKeys);
        }
      };

      fetchData();
    }
  }, [user]); // Empty dependency array ensures this runs only once on component mount
  
  
  const handleAddVaccine = (vaccineData: Omit<Vaccine, 'id'>) => {
    const newVaccine = {
      ...vaccineData,
      id: crypto.randomUUID(),
    };
    setVaccines([...vaccines, newVaccine]);

   
    const vaccineFormData = {
      name: vaccineData.name,
      dateAdministered: vaccineData.dateAdministered,
      nextDueDate: vaccineData.nextDueDate,
      notificationEmail: vaccineData.notificationEmail,
      notificationPhone: vaccineData.notificationPhone,
      userEmail: user.email
    };
  
    try {
      const response = fetch('/api/protected/vaccine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaccineFormData),
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  
    

    toast.success('Vaccine record added successfully!');
  };

  const handleDeleteVaccine = (id: string) => {
    setVaccines(vaccines.filter((v) => v.id !== id));
    toast.success('Vaccine record deleted successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
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
  );
}