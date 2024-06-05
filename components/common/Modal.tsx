import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-zinc-900 bg-opacity-80 border border-zinc-800 text-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold text-white">&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
