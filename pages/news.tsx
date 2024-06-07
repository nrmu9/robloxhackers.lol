import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, addDoc, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useAuth } from '@/contexts/authContext';
import Modal from '@/components/common/Modal';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type NewsItem = {
  id: string;
  title: string;
  date: { seconds: number; nanoseconds: number };
  content: string;
  pinned: boolean;
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, role } = useAuth();
  const [renderedContents, setRenderedContents] = useState<{ [key: string]: string }>({});

  const renderMarkdown = useCallback(async (text: string): Promise<string> => {
    const limitText = (text: string, limit: number) => {
      if (text.length <= limit) return text;
      return text.substring(0, text.lastIndexOf(' ', limit)) + '...';
    };

    const limitedText = limitText(text, 200);
    let html = marked.parse(limitedText, { gfm: true, breaks: true });
    html = await Promise.resolve(html);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return sanitizedHtml;
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const newsCollection = collection(db, 'news');
      const newsQuery = query(newsCollection, orderBy('date', 'desc'));
      const snapshot = await getDocs(newsQuery);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));
      const pinnedNews = newsList.filter(newsItem => newsItem.pinned);
      const regularNews = newsList.filter(newsItem => !newsItem.pinned);
      setNews([...pinnedNews, ...regularNews]);

      // Render content for each news item
      const renderedContents: { [key: string]: string } = {};
      for (const item of newsList) {
        renderedContents[item.id] = await renderMarkdown(item.content);
      }
      setRenderedContents(renderedContents);

    } catch (err) {
      const error = err as Error;
      console.error("Error fetching news: ", error.message);
      setError(`Failed to fetch news: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [renderMarkdown]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB');
    return `${formattedDate} ${formattedTime}`;
  };

  const handleAddNews = async () => {
    if (!newTitle || !newContent) {
      alert('Please fill out all fields');
      return;
    }

    try {
      if (editId) {
        const docRef = doc(db, 'news', editId);
        await updateDoc(docRef, {
          title: newTitle,
          content: newContent,
          date: Timestamp.now()
        });
      } else {
        await addDoc(collection(db, 'news'), {
          title: newTitle,
          content: newContent,
          date: Timestamp.now(),
          pinned: false
        });
      }
      setNewTitle('');
      setNewContent('');
      setEditId(null);
      fetchNews();
      setIsModalOpen(false);
    } catch (err) {
      const error = err as Error;
      console.error('Error adding or updating news: ', error.message);
      alert(`Failed to add or update news: ${error.message}`);
    }
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setNewTitle(newsItem.title);
    setNewContent(newsItem.content);
    setEditId(newsItem.id);
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'news', id));
      fetchNews();
    } catch (err) {
      const error = err as Error;
      console.error('Error deleting news: ', error.message);
      alert(`Failed to delete news: ${error.message}`);
    }
  };

  const handleTogglePin = async (newsItem: NewsItem) => {
    try {
      const docRef = doc(db, 'news', newsItem.id);
      await updateDoc(docRef, {
        pinned: !newsItem.pinned
      });
      fetchNews();
    } catch (err) {
      const error = err as Error;
      console.error('Error pinning/unpinning news: ', error.message);
      alert(`Failed to pin/unpin news: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">News</h1>
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
            Add News
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : news.length === 0 ? (
        <p className="text-white text-center">No news found.</p>
      ) : (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {news.map(newsItem => (
            <div key={newsItem.id} className="bg-zinc-900 bg-opacity-20 border border-zinc-800 text-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 relative">
              {newsItem.pinned && (
                <span className="absolute top-2 right-2 text-green-500 font-bold">Pinned</span>
              )}
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/news/${newsItem.id}`} className="hover:underline">
                    {newsItem.title}
                  </Link>
                </h2>
                <p className="text-gray-400 mb-2">{formatDate(newsItem.date)}</p>
                <div className="text-white mb-4 markdown-content" dangerouslySetInnerHTML={{ __html: renderedContents[newsItem.id] || '' }}></div>
                <Link href={`/news/${newsItem.id}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>
                {role === 'admin' && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEditNews(newsItem)}
                      className="py-1 px-3 rounded-lg bg-green-500 text-white hover:bg-green-700 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNews(newsItem.id)}
                      className="py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleTogglePin(newsItem)}
                      className="py-1 px-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700 transition duration-300"
                    >
                      {newsItem.pinned ? 'Unpin' : 'Pin'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-white">{editId ? 'Edit News' : 'Add New News'}</h2>
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
          onClick={handleAddNews}
          className="w-full py-2 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition duration-300"
        >
          {editId ? 'Update' : 'Add News'}
        </button>
      </Modal>
    </div>
  );
};

export default News;
