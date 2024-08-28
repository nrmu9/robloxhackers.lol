import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/authContext';
import Modal from '@/components/common/Modal';
import AddAnnouncement from '@/components/common/AddAnnouncement';

const Navbar: React.FC = () => {
  const { user, role, signInWithGitHub, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [showSecondNavbar, setShowSecondNavbar] = useState(false); // State for second navbar visibility

  const router = useRouter();
  const isMainPage = router.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAnnouncementModal = () => {
    setAnnouncementModalOpen(true);
  };

  const closeAnnouncementModal = () => {
    setAnnouncementModalOpen(false);
  };

  const toggleSecondNavbar = () => {
    setShowSecondNavbar(!showSecondNavbar); // Toggle the state
  };

  // Function to add animation class with exception handling
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, excludeAnimation: boolean = false) => {
    const target = e.currentTarget;
    if (target && !excludeAnimation) {
      (target as HTMLElement).classList.add('animate-click');
      setTimeout(() => {
        (target as HTMLElement).classList.remove('animate-click');
      }, 300); // Duration of the animation
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-red-500 shadow-lg py-4 user-select-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center text-lg font-semibold space-x-2">
            <Link href="/" onClick={(e) => handleClick(e)} className="font-bold text-white uppercase flex items-center relative group">
              <span className="text-lg text-white">www.</span>
              <span className="text-lg text-red-500 mx-1">voxlis</span>
              <span className="text-lg text-white">.NET</span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center text-white">
            <Link href="/" className="relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              Home
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/news" className="relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              News
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/discord" className="relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              Discord
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            {user ? (
              <>
                {role === 'admin' && (
                  <button onClick={(e) => { openAnnouncementModal(); handleClick(e, true); }} className="relative group font-semibold text-base px-3 py-1.5 rounded-md text-white bg-transparent border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 focus:outline-none">
                    Announce
                  </button>
                )}
                <button onClick={(e) => { logout(); handleClick(e, true); }} className="relative group font-semibold text-base bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={(e) => { signInWithGitHub(); handleClick(e, true); }} className="relative group font-semibold text-base bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none">
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-center space-y-2 py-2">
            <Link href="/" className="block relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              Home
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/news" className="block relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              News
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/discord" className="block relative group font-semibold text-lg" onClick={(e) => handleClick(e)}>
              Discord
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            {user ? (
              <>
                {role === 'admin' && (
                  <button onClick={(e) => { openAnnouncementModal(); handleClick(e, true); }} className="block relative group font-semibold text-base px-3 py-1.5 rounded-md text-white bg-transparent border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 focus:outline-none">
                    Announce
                  </button>
                )}
                <button onClick={(e) => { logout(); handleClick(e, true); }} className="block relative group font-semibold text-base bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={(e) => { signInWithGitHub(); handleClick(e, true); }} className="block relative group font-semibold text-base bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Announcement Modal */}
      <Modal isOpen={isAnnouncementModalOpen} onClose={closeAnnouncementModal}>
        <AddAnnouncement onClose={closeAnnouncementModal} />
      </Modal>
    </>
  );
};

export default Navbar;
