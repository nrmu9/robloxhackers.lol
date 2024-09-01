import React from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Navbar from './Navbar';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin-ext'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const isHomepage = pathname === '/';

  return (
    <div
      className={`relative flex flex-col min-h-screen ${montserrat.className} ${
        isHomepage ? 'bg-transparent' : 'bg-black text-white'
      }`}
    >
      {isHomepage && (
        <>
          <video
            autoPlay
            loop
            muted
            className="background-video"
          >
            <source
              src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1313140/c80d1a3ea315f69f72cbb77bffe42c5ed0f7b945.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
        </>
      )}
      <Navbar />
      <main
        className={`flex-1 flex flex-col items-center justify-center pt-16 ${
          isHomepage ? 'text-white' : 'text-white'
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
