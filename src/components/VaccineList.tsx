'use client';

import { format } from 'date-fns';
import { Calendar, Syringe, Bell } from 'lucide-react';
import type { Vaccine } from './VaccineManager';

interface VaccineListProps {
  vaccines: Vaccine[];
  onDelete: (id: string) => void;
}

export function VaccineList({ vaccines, onDelete }: VaccineListProps) {
  return (
    <div className="space-y-4">
      {vaccines.map((vaccine) => (
        <div
          key={vaccine.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Syringe className="h-6 w-6 text-indigo-500" />
              <h3 className="text-lg font-semibold text-gray-900">{vaccine.name}</h3>
            </div>
            <button
              onClick={() => onDelete(vaccine.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Administered</p>
                <p className="text-sm font-medium">
                  {format(new Date(vaccine.dateAdministered), 'PPP')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Next Due</p>
                <p className="text-sm font-medium">
                  {format(new Date(vaccine.nextDueDate), 'PPP')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Notifications</p>
                <p className="text-sm">
                  {vaccine.notificationEmail && (
                    <span className="font-medium">{vaccine.notificationEmail}</span>
                  )}
                  {vaccine.notificationEmail && vaccine.notificationPhone && (
                    <span className="mx-2">•</span>
                  )}
                  {vaccine.notificationPhone && (
                    <span className="font-medium">{vaccine.notificationPhone}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}