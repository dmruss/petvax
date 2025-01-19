'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Shield, LogOut, LogIn } from 'lucide-react';
import { upsertUser } from '../lib/pgInterface';

export function Navbar() {
  const { user, isLoading } = useUser();

  if (user) {
    const userData = {
      name: user.name,
      email: user.email,
    };
  
    try {
      const response = fetch('/api/protected/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // if (response.ok) {
      //   const result = response.json();
      //   console.log(result.message); // "User upserted successfully"
      // } else {
      //   console.error('Failed to upsert user');
      // }
    } catch (error) {
      console.error('Error:', error);
    }

  }
  

  return (
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
            {!isLoading && (
              user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user.email}
                  </span>
                  <a
                    href="/api/auth/logout"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </a>
                </div>
              ) : (
                <a
                  href="/api/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}