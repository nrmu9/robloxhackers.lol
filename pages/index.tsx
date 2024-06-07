import React from 'react';
import SocialsCard from '@/components/SocialsCard';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  const navigateToExploits = () => {
    router.push('/exploits');
  };

  const navigateToNews = () => {
    router.push('/news');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col items-start md:w-1/2 p-6">
          <h1 className="text-5xl font-bold mb-4">robloxhackers.lol</h1>
          <p className="text-lg mb-4">
            Welcome to robloxhackers.lol, your go-to source for the latest information on security vulnerabilities, exploits, and updates. Stay ahead of potential threats and keep your knowledge up-to-date with our comprehensive resources.
          </p>
          <SocialsCard />
        </div>
        <div className="flex flex-col md:w-1/2 space-y-8 mt-8 md:mt-0">
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1.05}
            transitionSpeed={250}
            glareEnable={true}
            glareMaxOpacity={0.10}
            glareColor="gray"
            glarePosition="all"
            glareBorderRadius="10px"
          >
            <div className="card-container bg-zinc-900 bg-opacity-20 border-zinc-800 border text-white rounded-lg shadow-lg p-6 transform transition-transform">
              <h2 className="text-3xl font-semibold mb-4 text-center">Stay Updated with Latest Exploits</h2>
              <p className="mb-4 text-center">
                Keep yourself informed with the latest information on security vulnerabilities and exploits. Visit our <Link href="/exploits" className="text-indigo-400 hover:underline">Exploits Page</Link> for detailed updates and stay ahead of potential threats.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={navigateToExploits}
                  className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105"
                >
                  Go to Exploits Page
                </button>
              </div>
            </div>
          </Tilt>
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1.05}
            transitionSpeed={250}
            glareEnable={true}
            glareMaxOpacity={0.10}
            glareColor="gray"
            glarePosition="all"
            glareBorderRadius="10px"
          >
            <div className="bg-red-600 bg-opacity-20 border border-red-500 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">Important News and Announcements</h2>
              <p className="mb-4 text-center">
                Visit the <Link href="/news" className="text-red-400 hover:underline">News Page</Link> to learn more about the latest news and announcements.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={navigateToNews}
                  className="inline-block bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:from-red-600 hover:to-red-800 transition-transform transform hover:scale-105"
                >
                  Go to News Page
                </button>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
