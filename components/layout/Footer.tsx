import React, { useState, useEffect } from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white p-4 text-center border-t border-zinc-800">
      <div className="container mx-auto">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} r/robloxhackers. All rights reserved.</p>
        <p className="text-sm mt-2">Join our community on <a href="https://discord.gg/AvkSEZvp3a" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-200">Discord</a></p>
      </div>
    </footer>
  );
};

export default Footer;