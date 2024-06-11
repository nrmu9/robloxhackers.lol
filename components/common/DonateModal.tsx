// components/common/DonateModal.tsx
import React from 'react';
import Modal from '@/components/common/Modal';
import Image from 'next/image';

type DonateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Support Us</h2>
        <p className="mb-4">Your donations help us keep the site running and provide more content. Thank you for your support!</p>
        <form action="https://www.paypal.com/donate" method="post" target="_blank">
          <input type="hidden" name="hosted_button_id" value="8DTCZPN6PAZMU" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/PL/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <Image
            alt=""
            src="https://www.paypal.com/en_PL/i/scr/pixel.gif"
            width={1}
            height={1}
          />
        </form>
        <div className="mt-4">
          <a
            href="https://www.roblox.com/games/5047755537/nullified#!/store"
            target="_blank"
            className="inline-block bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            rel="noopener noreferrer"
          >
            Donate via Roblox
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default DonateModal;