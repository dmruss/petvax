import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetVax Tracker',
  description: 'Track your pet\'s vaccines and get reminders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Toaster position="top-right" />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}