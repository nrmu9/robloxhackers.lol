import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-zinc-800 py-4 text-white text-center user-select-none">
      <div className="container mx-auto">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} voxlis.NET. All rights reserved.</p>
        <p className="text-sm mt-2">Join our community on <a href="https://discord.gg/AvkSEZvp3a" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-200">Discord</a></p>
      </div>
    </footer>
  );
};

export default Footer;
