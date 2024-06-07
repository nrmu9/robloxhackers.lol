// components/layout/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin-ext'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex flex-col min-h-screen bg-zinc-950 text-white ${montserrat.className}`}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;