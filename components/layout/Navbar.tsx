// components/common/Navbar.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import Modal from '@/components/common/Modal';
import AddAnnouncement from '@/components/common/AddAnnouncement';
import DonateModal from '@/components/common/DonateModal';

const Navbar: React.FC = () => {
  const { user, role, signInWithGitHub, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAnnouncementModal = () => {
    setAnnouncementModalOpen(true);
  };

  const closeAnnouncementModal = () => {
    setAnnouncementModalOpen(false);
  };

  const openDonateModal = () => {
    setDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setDonateModalOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(9, 9, 11, 0.8)] border-b border-zinc-800 shadow-lg backdrop-filter backdrop-blur-lg py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center text-lg font-semibold space-x-2">
          <Image src="/CE64px.png" alt="RobloxHackers Icon" width={24} height={24} />
          <Link href="/" className="font-bold relative group">
            robloxhackers.lol
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
        <Link href="/" className="relative group">
            Games
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="/news" className="relative group">
            News
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <button onClick={openDonateModal} className="relative group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Donate
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          {user ? (
            <>
              {role === 'admin' && (
                <button onClick={openAnnouncementModal} className="relative group">
                  Announce
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              )}
              <button onClick={logout} className="relative group">
                Logout
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col items-center space-y-2 py-2">
          <Link href="/" className="block relative group" onClick={toggleMenu}>
           Games
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="/news" className="block relative group" onClick={toggleMenu}>
            News
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <button onClick={() => { openDonateModal(); toggleMenu(); }} className="block relative group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Donate
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          {user ? (
            <>
              {role === 'admin' && (
                <button onClick={() => { openAnnouncementModal(); toggleMenu(); }} className="block relative group">
                  Announce
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              )}
              <button onClick={() => { logout(); toggleMenu(); }} className="block relative group">
                Logout
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isAnnouncementModalOpen} onClose={closeAnnouncementModal}>
        <AddAnnouncement onClose={closeAnnouncementModal} />
      </Modal>
      <DonateModal isOpen={isDonateModalOpen} onClose={closeDonateModal} />
    </nav>
  );
};

export default Navbar;
