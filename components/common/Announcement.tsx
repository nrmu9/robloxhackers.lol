import React, { useState, useCallback, useEffect } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useAuth } from '@/contexts/authContext';
import Select from 'react-select';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import sanitizeMarkdown from '@/utils/sanitizeMarkdown';
import styles from '@/styles/Markdown.module.css';

type AnnouncementProps = {
  id: string;
  title: string;
  message: string;
  style: string;
  createdAt: Date;
  onDismiss: () => void;
  onEditComplete: () => void;
};

const announcementStyles = [
  { value: 'normal', label: 'Normal' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
];

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#1f2937',
    borderColor: '#4b5563',
    color: 'white',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1f2937',
    borderColor: '#4b5563',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4b5563' : state.isFocused ? '#374151' : undefined,
    color: 'white',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
};

const Announcement: React.FC<AnnouncementProps> = ({
  id,
  title,
  message,
  style,
  createdAt,
  onDismiss,
  onEditComplete,
}) => {
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedMessage, setEditedMessage] = useState(message);
  const [editedStyle, setEditedStyle] = useState(
    announcementStyles.find((s) => s.value === style) || announcementStyles[0]
  );
  const [renderedContent, setRenderedContent] = useState<string>('');

  const renderMarkdown = useCallback(async (text: string): Promise<string> => {
    const html = await sanitizeMarkdown(text);
    return html;
  }, []);

  useEffect(() => {
    const renderContent = async () => {
      const rendered = await renderMarkdown(message);
      setRenderedContent(rendered);
    };
    renderContent();
  }, [message, renderMarkdown]);

  let styleClasses = 'bg-zinc-900 bg-opacity-20 border border-zinc-800';
  if (style === 'danger') styleClasses = 'bg-red-600 bg-opacity-20 border border-red-500';
  if (style === 'warning') styleClasses = 'bg-yellow-500 bg-opacity-20 border border-yellow-400';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await deleteDoc(doc(db, 'announcements', id));
      onDismiss();
    }
  };

  const handleSave = async () => {
    if (window.confirm('Are you sure you want to save changes to this announcement?')) {
      await updateDoc(doc(db, 'announcements', id), {
        title: editedTitle,
        message: editedMessage,
        style: editedStyle.value,
      });
      setIsEditing(false);
      onEditComplete();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedMessage(message);
    setEditedStyle(announcementStyles.find((s) => s.value === style) || announcementStyles[0]);
  };

  return (
    <div
      className={`announcement ${styleClasses} text-white rounded-lg shadow-md p-4 mb-4 relative max-w-2xl mx-auto`}
    >
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none"
              rows={6}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="style">
              Style
            </label>
            <Select
              options={announcementStyles}
              styles={customSelectStyles}
              value={editedStyle}
              onChange={(newValue) => setEditedStyle(newValue as { value: string; label: string })}
              placeholder="Select Style"
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
            <button onClick={handleCancel} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={onDismiss} className="absolute top-2 right-2 text-xl font-bold">
            &times;
          </button>
          <h2 className="text-2xl font-semibold my-2">{title}</h2>
          <div className={`${styles.markdownContent} mb-2 text-xs`} dangerouslySetInnerHTML={{ __html: renderedContent }}></div>
          <span className="text-sm text-gray-300">{createdAt.toLocaleDateString()}</span>
          {role === 'admin' && (
            <div className="flex space-x-2 mt-4">
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Announcement;
