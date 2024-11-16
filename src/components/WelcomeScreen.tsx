'use client';

import { Shield, LogIn } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="text-center py-12">
      <Shield className="mx-auto h-12 w-12 text-indigo-600" />
      <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
        Welcome to PetVax Tracker
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Please login to manage your pet's vaccine records
      </p>
      <a
        href="/api/auth/login"
        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <LogIn className="h-5 w-5 mr-2" />
        Get Started
      </a>
    </div>
  );
}