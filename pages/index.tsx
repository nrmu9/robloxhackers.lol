import React, { useEffect } from 'react';
import Head from 'next/head';
import GameCards from '@/components/GameCards'; // Import the new component

const IndexPage = () => {
  useEffect(() => {
    const handleAnimation = () => {
      const elements = document.querySelectorAll('.pop-up-animation');
      elements.forEach((element) => {
        element.classList.add('animated'); // Add 'animated' class to trigger animation
      });
    };

    handleAnimation(); // Trigger the animation when the component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..200&family=New+Amsterdam&display=swap" 
          rel="stylesheet" 
        />
        <style>{`
          .font-new-amsterdam {
            font-family: 'New Amsterdam', sans-serif;
          }
          .pop-up-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          .animated {
            opacity: 1;
            transform: translateY(0);
          }
          .glow-red {
            color: #ef4444; /* Matching the color of text-red-500 */
            text-shadow: 0 0 3px rgba(239, 68, 68, 0.5), 
                         0 0 6px rgba(239, 68, 68, 0.3);
          }
          .non-selectable {
            user-select: none; /* Prevent text selection */
          }
        `}</style>
      </Head>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center non-selectable">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center pop-up-animation">
            <span className="text-white">WWW.</span>
            <span className="text-red-500">VOXLIS</span>
            <span className="text-white">.NET</span>
          </h1>
          <p className="text-lg mb-0.1 text-center font-new-amsterdam pop-up-animation">
            Ready to <span className="glow-red">win</span>? {/* Apply same color as VOXLIS */}
          </p>
        </div>
        <div className="md:w-1/2 p-6">
          <GameCards /> {/* Render the GameCards component */}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
