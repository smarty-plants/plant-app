import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Navbar from './navbar';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'SmartyPlants',
  description:
    'A web app for managing your plants.',
  favicon: '/favicon.ico',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Analytics />
        <Toast />
      </body>
    </html>
  );
}
