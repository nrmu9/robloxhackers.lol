import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { useRouter } from 'next/router';

const GameCards: React.FC = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // State to manage screen size

  const gameData = [
    { name: 'Roblox', image: '/rblx-index.png', path: '/exploits' },
    { name: 'Minecraft', image: '/mc-index.png', path: '/minecraft' },
    { name: 'Counter-Strike 2', image: '/cs2-index.png', path: '/cs2' },
  ];

  // Function to update the state based on screen size
  const updateMedia = () => {
    setIsMobile(window.innerWidth < 640); // Assume 640px as mobile breakpoint
  };

  useEffect(() => {
    updateMedia(); // Initial check
    window.addEventListener('resize', updateMedia); // Update on resize

    return () => window.removeEventListener('resize', updateMedia); // Cleanup
  }, []);

  const handleCardClick = (path: string) => {
    router.push(path); // Navigate within the same tab
  };

  const leftIndex = (selectedIndex - 1 + gameData.length) % gameData.length;
  const rightIndex = (selectedIndex + 1) % gameData.length;

  return (
    <div className="flex items-center justify-center flex-col md:flex-row overflow-hidden">
      {isMobile ? (
        // Mobile Layout: Stacked smaller cards with shake effect
        <div className="flex flex-col items-center">
          {gameData.map((game, index) => (
            <div
              key={index}
              className="w-full mb-4 p-2 shake-on-hover" // Apply shake effect
              onClick={() => handleCardClick(game.path)}
              style={{
                width: '80%', // Smaller width for mobile
                maxWidth: '150px', // Limit max width
                marginBottom: '10px', // Space between stacked cards
              }}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-auto object-cover" // Keep the aspect ratio
                    style={{ maxHeight: '150px' }} // Limit max height for mobile
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // PC Layout: Tilt cards
        <div className="relative flex items-center justify-center" style={{ width: '600px', height: '300px' }}>
          {/* Centered Card */}
          <div
            className="absolute transition-transform duration-700 ease-in-out non-selectable"
            style={{
              transform: `translate(-50%, -50%)`,
              width: '150px',
              height: '150px',
              left: '50%',
              top: '50%',
              zIndex: 10,
              opacity: 1,
            }}
            onClick={() => handleCardClick(gameData[selectedIndex].path)}
          >
            <Tilt
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer non-selectable shake-on-hover"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={250}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="gray"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="w-full h-full flex items-center justify-center non-selectable">
                <img
                  src={gameData[selectedIndex].image}
                  alt={gameData[selectedIndex].name}
                  className="w-full h-full object-cover non-selectable"
                />
              </div>
            </Tilt>
          </div>

          {/* Left Card */}
          <div
            className="absolute transition-transform duration-700 ease-in-out non-selectable"
            style={{
              left: 'calc(50% - 180px)',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(-15deg)`,
              width: '100px',
              height: '100px',
              opacity: 0.75,
              zIndex: 5,
            }}
            onClick={() => handleCardClick(gameData[leftIndex].path)}
          >
            <Tilt
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer non-selectable shake-on-hover"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={250}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="gray"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="w-full h-full flex items-center justify-center non-selectable">
                <img
                  src={gameData[leftIndex].image}
                  alt={gameData[leftIndex].name}
                  className="w-full h-full object-cover non-selectable"
                />
              </div>
            </Tilt>
          </div>

          {/* Right Card */}
          <div
            className="absolute transition-transform duration-700 ease-in-out non-selectable"
            style={{
              left: 'calc(50% + 180px)',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(15deg)`,
              width: '100px',
              height: '100px',
              opacity: 0.75,
              zIndex: 5,
            }}
            onClick={() => handleCardClick(gameData[rightIndex].path)}
          >
            <Tilt
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer non-selectable shake-on-hover"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={250}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="gray"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="w-full h-full flex items-center justify-center non-selectable">
                <img
                  src={gameData[rightIndex].image}
                  alt={gameData[rightIndex].name}
                  className="w-full h-full object-cover non-selectable"
                />
              </div>
            </Tilt>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCards;
