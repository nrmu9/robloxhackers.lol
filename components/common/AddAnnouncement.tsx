import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Select from 'react-select';

const announcementStyles = [
  { value: 'normal', label: 'Normal' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
];

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#1f1f1f',  // Dark background
    borderColor: state.isFocused ? '#ef4444' : '#3f3f3f',  // Red focus, dark grey default
    color: 'white',
    '&:hover': {
      borderColor: '#ef4444',  // Red on hover
    },
    boxShadow: state.isFocused ? '0 0 0 1px #ef4444' : 'none',  // Red shadow when focused
    transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1f1f1f',  // Dark background for the menu
    borderColor: '#3f3f3f',  // Dark grey border
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ef4444' : state.isFocused ? '#3f3f3f' : undefined,  // Red when selected, dark grey when focused
    color: 'white',
    '&:hover': {
      backgroundColor: '#3f3f3f',  // Dark grey on hover
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',  // White text
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',  // Light grey placeholder text
  }),
};

const AddAnnouncement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState(announcementStyles[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const announcementsCollection = collection(db, 'announcements');
    await addDoc(announcementsCollection, {
      title,
      message,
      style: style.value,
      createdAt: new Date().toISOString(),
    });
    setTitle('');
    setMessage('');
    setStyle(announcementStyles[0]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="text-white space-y-4 w-full">
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded bg-black bg-opacity-75 border border-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-300 ease-in-out"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full p-2 rounded bg-black bg-opacity-75 border border-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-300 ease-in-out resize" // Added resize
          rows={4} // Set a default row height
          style={{ resize: 'both' }} // Allow resizing in both dimensions
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="style">
          Style
        </label>
        <Select
          options={announcementStyles}
          styles={customSelectStyles}
          value={style}
          onChange={(newValue) => setStyle(newValue as { value: string; label: string; })}
          placeholder="Select Style"
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="inline-block bg-transparent border-2 border-red-500 text-red-500 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-transform transform hover:scale-105 w-full"
      >
        Add Announcement
      </button>
    </form>
  );
};

export default AddAnnouncement;
