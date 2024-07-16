import React from 'react';
import SocialsCard from '@/components/SocialsCard';
import Tilt from 'react-parallax-tilt';
import { useRouter } from 'next/router'; // Import the router

const IndexPage = () => {
  const router = useRouter(); // Initialize the router

  const handleMinecraftClick = () => {
    router.push('/minecraft'); // Navigate within the same tab
  };

  const handleRobloxClick = () => {
    router.push('/exploits'); // Navigate within the same tab
  };

  const handleCounterStrikeClick = () => {
    router.push('/cs2'); // Navigate within the same tab
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">robloxhackers.lol</h1>
          <p className="text-lg mb-4">
            Welcome to robloxhackers.lol, your go-to source for the latest information on security vulnerabilities, exploits, and updates. Stay ahead of potential threats and keep your knowledge up-to-date with our comprehensive resources.
          </p>
          <SocialsCard />
        </div>
        <div className="md:w-1/2 flex flex-col items-center mt-8 md:mt-0">
          <div className="text-left mb-4 ml-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Game Selection</h2>
            <p className="text-lg mb-4">
              Enhance your gaming experience with a variety of cheats and exploits! The Minecraft and Counter-Strike 2 pages are managed by our experienced contributors who are knowledgeable in their field.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-40 h-40 md:w-48 md:h-48">
              <div onClick={handleCounterStrikeClick}>
                <Tilt
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.05} // Increase scale for slightly bigger cards
                  transitionSpeed={250}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="gray"
                  glarePosition="all"
                  glareBorderRadius="10px"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/cs2-index.png" alt="CS" className="w-full h-full object-cover" />
                  </div>
                </Tilt>
              </div>
            </div>
            <div className="w-40 h-40 md:w-48 md:h-48">
              <div onClick={handleMinecraftClick}>
                <Tilt
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.05} // Increase scale for slightly bigger cards
                  transitionSpeed={250}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="gray"
                  glarePosition="all"
                  glareBorderRadius="10px"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/mc-index.png" alt="Minecraft" className="w-full h-full object-cover" />
                  </div>
                </Tilt>
              </div>
            </div>
            <div className="w-40 h-40 md:w-48 md:h-48">
              <div onClick={handleRobloxClick}>
                <Tilt
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.05} // Increase scale for slightly bigger cards
                  transitionSpeed={250}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="gray"
                  glarePosition="all"
                  glareBorderRadius="10px"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/rblx-index.png" alt="Roblox" className="w-full h-full object-cover" />
                  </div>
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
