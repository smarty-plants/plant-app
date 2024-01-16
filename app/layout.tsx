import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Navbar from './navbar';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'SmartyPlants',
  description: 'A web app for managing your plants.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Toaster />
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Analytics />
        {/* <Toast /> */}
      </body>
    </html>
  );
}
