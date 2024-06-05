// components/layout/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-16">
        {children}
      </main>
      <div className="w-full flex justify-center">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2235454136284515"
          data-ad-slot="5668019133"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
