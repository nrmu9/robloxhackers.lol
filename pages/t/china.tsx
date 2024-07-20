import React, { useState, useEffect } from 'react';

const IndexPage = () => {
  // State to control the visibility of the text
  const [showText, setShowText] = useState(false);

  // Effect to set the text visibility after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 10000); // 4000 milliseconds = 4 seconds

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <img src="/hamster.gif" alt="Hamster GIF" className="w-128 h-128 mb-4" />
      <p className="text-lg text-red-500">Your Roblox cookie has been sent to www.gov.cn</p>
      {showText && (
        <p className="text-sm text-gray-500 mt-2">
          Create your own link by doing{' '}
          <a href="https://robloxhackers.lol/t/yourtext" className="text-blue-500 underline">
            https://robloxhackers.lol/t/yourtext!
          </a>
        </p>
      )}
    </div>
  );
};

export default IndexPage;
