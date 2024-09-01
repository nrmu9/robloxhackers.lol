import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { useRouter } from 'next/router';

const GameCards: React.FC = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const gameData = [
    { name: 'Roblox', image: '/rblx-index.png', path: '/exploits' },
    { name: 'Minecraft', image: '/mc-index.png', path: '/minecraft' },
    { name: 'Counter-Strike 2', image: '/cs2-index.png', path: '/cs2' },
  ];

  const handleCardClick = (path: string) => {
    router.push(path); // Navigate within the same tab
  };

  const leftIndex = (selectedIndex - 1 + gameData.length) % gameData.length;
  const rightIndex = (selectedIndex + 1) % gameData.length;

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {/* Cards Container */}
      <div className="relative flex items-center justify-center" style={{ width: '600px', height: '300px' }}>
        {/* Centered Card */}
        <div
          className="absolute transition-transform duration-700 ease-in-out non-selectable"
          style={{
            transform: `translate(-50%, -50%)`, // Centered
            width: '150px',
            height: '150px',
            left: '50%',
            top: '50%',
            zIndex: 10,
            opacity: 1, // Fully opaque
          }}
        >
          <div onClick={() => handleCardClick(gameData[selectedIndex].path)}>
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
                <img src={gameData[selectedIndex].image} alt={gameData[selectedIndex].name} className="w-full h-full object-cover non-selectable" />
              </div>
            </Tilt>
          </div>
        </div>

        {/* Left Card */}
        <div
          className="absolute transition-transform duration-700 ease-in-out non-selectable"
          style={{
            left: 'calc(50% - 180px)', // Positioned to the left of the center
            top: '50%',
            transform: `translate(-50%, -50%) rotate(-15deg)`, // Tilted to the left
            width: '100px',
            height: '100px',
            opacity: 0.75, // Semi-transparent
            zIndex: 5,
          }}
        >
          <div onClick={() => handleCardClick(gameData[leftIndex].path)}>
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
                <img src={gameData[leftIndex].image} alt={gameData[leftIndex].name} className="w-full h-full object-cover non-selectable" />
              </div>
            </Tilt>
          </div>
        </div>

        {/* Right Card */}
        <div
          className="absolute transition-transform duration-700 ease-in-out non-selectable"
          style={{
            left: 'calc(50% + 180px)', // Positioned to the right of the center
            top: '50%',
            transform: `translate(-50%, -50%) rotate(15deg)`, // Tilted to the right
            width: '100px',
            height: '100px',
            opacity: 0.75, // Semi-transparent
            zIndex: 5,
          }}
        >
          <div onClick={() => handleCardClick(gameData[rightIndex].path)}>
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
                <img src={gameData[rightIndex].image} alt={gameData[rightIndex].name} className="w-full h-full object-cover non-selectable" />
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCards;
