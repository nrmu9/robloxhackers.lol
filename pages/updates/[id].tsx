// pages/updates/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/authContext';
import Modal from '@/components/common/Modal';
import { marked } from 'marked';

type Update = {
  id: string;
  title: string;
  date: { seconds: number; nanoseconds: number };
  content: string;
};

const Update = () => {
  const router = useRouter();
  const { id } = router.query;
  const [update, setUpdate] = useState<Update | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { user, role } = useAuth();

  const formatDate = (timestamp: { seconds: number; nanoseconds?: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
    const formattedTime = date.toLocaleTimeString('en-GB'); // hh:mm:ss format
    return `${formattedDate} ${formattedTime}`;
  };

  const renderMarkdown = (text: string) => {
    const html = marked(text, { gfm: true, breaks: true });
    return { __html: html } as { __html: string };
  };

  useEffect(() => {
    if (id) {
      const fetchUpdate = async () => {
        const docRef = doc(db, 'updates', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUpdate({ id: docSnap.id, ...docSnap.data() } as Update);
          setNewTitle(docSnap.data().title);
          setNewContent(docSnap.data().content);
        }
        setLoading(false);
      };

      fetchUpdate();
    }
  }, [id]);

  const handleEditUpdate = async () => {
    if (!newTitle || !newContent) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const docRef = doc(db, 'updates', id as string);
      await updateDoc(docRef, {
        title: newTitle,
        content: newContent,
        date: Timestamp.now()
      });
      setUpdate({ ...update, title: newTitle, content: newContent, date: Timestamp.now() } as Update);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating update: ', error);
      alert('Failed to update update');
    }
  };

  const handleDeleteUpdate = async () => {
    if (!confirm('Are you sure you want to delete this update?')) {
      return;
    }

    try {
      const docRef = doc(db, 'updates', id as string);
      await deleteDoc(docRef);
      router.push('/updates');
    } catch (error) {
      console.error('Error deleting update: ', error);
      alert('Failed to delete update');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!update) {
    return <p>No such update found</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-zinc-900 bg-opacity-20 max-w-6xl p-6 rounded-lg shadow-lg">
        <div className="flex flex-col gap-y-4 mb-4">
          <h2 className="text-2xl font-semibold">{update.title}</h2>
          <p className="text-gray-400">{formatDate(update.date)}</p>
        </div>
        <div className="text-white markdown-content" dangerouslySetInnerHTML={renderMarkdown(update.content)}></div>
        {role === 'admin' && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-700 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteUpdate}
              className="py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-white">Edit Update</h2>
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
          onClick={handleEditUpdate}
          className="w-full py-2 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition duration-300"
        >
          Update
        </button>
      </Modal>
    </div>
  );
};

export default Update;
