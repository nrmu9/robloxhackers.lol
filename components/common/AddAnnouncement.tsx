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
    backgroundColor: '#3f3f46',
    borderColor: state.isFocused ? '#6366f1' : '#4b5563',
    color: 'white',
    '&:hover': {
      borderColor: '#6366f1',
    },
    boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
    transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#3f3f46',
    borderColor: '#4b5563',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#4b5563' : undefined,
    color: 'white',
    '&:hover': {
      backgroundColor: '#4b5563',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
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
    <form onSubmit={handleSubmit} className="text-white space-y-4">
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
          className="w-full p-2 rounded bg-zinc-700 bg-opacity-50 border border-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors duration-300 ease-in-out"
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
          className="w-full p-2 rounded bg-zinc-700 bg-opacity-50 border border-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors duration-300 ease-in-out"
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
      <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105 w-full">
        Add Announcement
      </button>
    </form>
  );
};

export default AddAnnouncement;
