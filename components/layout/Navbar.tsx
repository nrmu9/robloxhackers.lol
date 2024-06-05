import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../contexts/authContext';
import Modal from '@/components/common/Modal';
import AddAnnouncement from '@/components/common/AddAnnouncement';

const Navbar: React.FC = () => {
  const { user, role, signInWithGitHub, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openAnnouncementModal = () => {
    setAnnouncementModalOpen(true);
  };

  const closeAnnouncementModal = () => {
    setAnnouncementModalOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(9, 9, 11, 0.1)] border-b border-zinc-800 shadow-lg backdrop-filter backdrop-blur-lg py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center text-lg font-semibold space-x-2">
          <Image src="/CE64px.png" alt="RobloxHackers Icon" width={24} height={24} />
          <Link href="/" className="font-bold relative group">
            r/robloxhackers
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="https://discord.gg/cs3uAQ2vcK" className="relative group">
            Discord
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="https://www.reddit.com/r/robloxhackers/" className="relative group">
            Reddit
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          {user ? (
            <>
              {role === 'admin' && (
                <button onClick={openAnnouncementModal} className="relative group">
                  Make Announcement
                  <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              )}
              <button onClick={logout} className="relative group">
                Logout
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <div className="flex items-center space-x-2 ml-auto">
                <Image
                  src={user.photoURL || '/default-profile.png'}
                  alt="Profile Picture"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{user.displayName || user.email}</span>
              </div>
            </>
          ) : (
            <button onClick={signInWithGitHub} className="relative group">
              Login
              <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-max-height duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-2 py-2 bg-[rgba(9, 9, 11, 0.1)] border-b border-zinc-800 backdrop-filter backdrop-blur-lg">
          <Link href="/" className="block relative group" onClick={toggleMenu}>
            Home
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="https://discord.gg/cs3uAQ2vcK" className="block relative group" onClick={toggleMenu}>
            Discord
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="https://www.reddit.com/r/robloxhackers/" className="block relative group" onClick={toggleMenu}>
            Reddit
            <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          {user ? (
            <>
              {role === 'admin' && (
                <button onClick={() => { openAnnouncementModal(); toggleMenu(); }} className="block relative group">
                  Make Announcement
                  <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              )}
              <button onClick={() => { logout(); toggleMenu(); }} className="block relative group">
                Logout
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <div className="flex items-center space-x-2 mt-2">
                <Image
                  src={user.photoURL || '/default-profile.png'}
                  alt="Profile Picture"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{user.displayName || user.email}</span>
              </div>
            </>
          ) : (
            <button onClick={() => { signInWithGitHub(); toggleMenu(); }} className="block relative group">
              Login
              <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isAnnouncementModalOpen} onClose={closeAnnouncementModal}>
        <AddAnnouncement onClose={closeAnnouncementModal} />
      </Modal>
    </nav>
  );
};

export default Navbar;
