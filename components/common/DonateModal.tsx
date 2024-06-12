// components/common/DonateModal.tsx
import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import Image from 'next/image';

type DonateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const cryptoDonations = [
    { name: 'BTC', address: 'bc1q25l9ewkkewag0wz0srnjk9whr8u4hgyk2l8mk8' },
    { name: 'ETH (ETH Network)', address: '0xa3095ecC94C75364cb9A0E1EE967Fbcb1C9B24B5' },
    { name: 'LTC (LTC Network)', address: 'LN619o1C1q5aArLRMnsX7myTMaHjAT3sQ8' },
    { name: 'XMR', address: '49n8RRi9zuGPvXjw6V5fHcPXqU528gKzrCgSPmbbKYDe7sKM7ekSghrhypamV5cRyLhMsUtHKybsr2CfSEPnLzBrMdQ3zAt' },
    { name: 'USDT (ETH Network)', address: '0xa3095ecC94C75364cb9A0E1EE967Fbcb1C9B24B5' },
  ];

  const [copiedAddress, setCopiedAddress] = useState<boolean[]>(new Array(cryptoDonations.length).fill(false));

  const copyToClipboard = (index: number, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      setCopiedAddress(prevState => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }, 2000); // Change back after 2 seconds
  };

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
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Crypto Donations</h3>
          {cryptoDonations.map(({ name, address }, index) => (
            <div key={name} className="flex items-center justify-between mb-2">
              <span className="text-sm break-all flex-grow text-left">{name}: {address}</span>
              <button
                onClick={() => copyToClipboard(index, address)}
                className="ml-2 text-blue-500 underline text-sm"
                style={{ minWidth: '100px' }}
              >
                {copiedAddress[index] ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default DonateModal;
