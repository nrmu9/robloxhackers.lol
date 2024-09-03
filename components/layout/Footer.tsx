import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-zinc-800 py-4 text-white text-center user-select-none">
      <div className="container mx-auto">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} voxlis.NET. All rights reserved.</p>
        <p className="text-sm mt-2">Join our community on <Link href="/discord" className="text-red-500 hover:text-red-400 transition-colors duration-200">Discord</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
