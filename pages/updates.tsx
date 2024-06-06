// pages/updates.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, addDoc, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useAuth } from '@/contexts/authContext'; // Ensure you have a context to provide auth info
import Modal from '@/components/common/Modal'; // Import the modal component
import { marked } from 'marked';

type Update = {
  id: string;
  title: string;
  date: { seconds: number; nanoseconds: number };
  content: string;
};

const Updates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, role } = useAuth(); // Using auth context to get user and role

  const fetchUpdates = async () => {
    try {
      const updatesCollection = collection(db, 'updates');
      const updatesQuery = query(updatesCollection, orderBy('date', 'desc'));
      const snapshot = await getDocs(updatesQuery);
      const updatesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Update));
      setUpdates(updatesList);
    } catch (err) {
      console.error("Error fetching updates: ", err);
      setError('Failed to fetch updates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
    const formattedTime = date.toLocaleTimeString('en-GB'); // hh:mm:ss format
    return `${formattedDate} ${formattedTime}`;
  };

  const renderMarkdown = (text: string) => {
    const html = marked(text, { gfm: true, breaks: true });
    return { __html: html } as { __html: string };
  };

  const handleAddUpdate = async () => {
    if (!newTitle || !newContent) {
      alert('Please fill out all fields');
      return;
    }

    try {
      if (editId) {
        const docRef = doc(db, 'updates', editId);
        await updateDoc(docRef, {
          title: newTitle,
          content: newContent,
          date: Timestamp.now()
        });
      } else {
        await addDoc(collection(db, 'updates'), {
          title: newTitle,
          content: newContent,
          date: Timestamp.now()
        });
      }
      setNewTitle('');
      setNewContent('');
      setEditId(null);
      fetchUpdates(); // Refresh the updates list
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding or updating update: ', error);
      alert('Failed to add or update update');
    }
  };

  const handleEditUpdate = (update: Update) => {
    setNewTitle(update.title);
    setNewContent(update.content);
    setEditId(update.id);
    setIsModalOpen(true);
  };

  const handleDeleteUpdate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'updates', id));
      fetchUpdates(); // Refresh the updates list
    } catch (error) {
      console.error('Error deleting update: ', error);
      alert('Failed to delete update');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Updates</h1>
      {role === 'admin' && (
        <div className="mb-8 text-center">
          <button
            onClick={() => {
              setEditId(null);
              setNewTitle('');
              setNewContent('');
              setIsModalOpen(true);
            }}
            className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
          >
            Add Update
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : updates.length === 0 ? (
        <p className="text-white text-center">No updates found.</p>
      ) : (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {updates.map(update => (
            <div key={update.id} className="bg-zinc-900 bg-opacity-20 border border-zinc-800 text-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/updates/${update.id}`} className="hover:underline">
                    {update.title}
                  </Link>
                </h2>
                <p className="text-gray-400 mb-2">{formatDate(update.date)}</p>
                <div className="text-white mb-4 markdown-content line-clamp-3" dangerouslySetInnerHTML={renderMarkdown(update.content)}></div>
                <Link href={`/updates/${update.id}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>
                {role === 'admin' && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEditUpdate(update)}
                      className="py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-700 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUpdate(update.id)}
                      className="py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-white">{editId ? 'Edit Update' : 'Add New Update'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-2 p-2 rounded-lg bg-zinc-900 bg-opacity-20 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200 ease-in-out transform focus:scale-105"
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full mb-2 p-2 rounded-lg bg-zinc-900 bg-opacity-20 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200 ease-in-out transform focus:scale-105"
        />
        <button
          onClick={handleAddUpdate}
          className="w-full py-2 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition duration-300"
        >
          {editId ? 'Update' : 'Add Update'}
        </button>
      </Modal>
    </div>
  );
};

export default Updates;
