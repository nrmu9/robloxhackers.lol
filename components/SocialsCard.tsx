import React from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

const SocialsCard: React.FC = () => {
  const socials = [
    {
      name: 'Reddit',
      link: 'https://www.reddit.com/r/robloxhackers',
      imagePath: '/Reddit.png',
      description: "Reddit's #1 ROBLOX Exploiting community!",
    },
    {
      name: 'Discord',
      link: 'https://robloxhackers.lol/discord',
      imagePath: '/Discord.png',
      description: 'Join our Discord server to chat with other members in real-time.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {socials.map((social, index) => (
        <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={250} glareEnable={true} glareMaxOpacity={0.10} glareColor='gray' glarePosition='all' glareBorderRadius='10px'>
          <div className="card-container bg-zinc-900 bg-opacity-20 border-zinc-800 border text-white rounded-lg shadow-lg p-6 max-w-md w-full h-full transform transition-transform flex flex-col justify-between relative">
            <div className="absolute top-4 right-4">
              <Image src={social.imagePath} alt={`${social.name} Logo`} width={24} height={24} />
            </div>
            <div className="flex-grow mb-4">
              <h2 className="text-2xl font-semibold mb-2">{social.name}</h2>
              <p>{social.description}</p>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => {
                  window.open(social.link, '_blank');
                }}
                className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105"
              >
                Visit {social.name}
              </button>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  );
};

export default SocialsCard;
