import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DownloadForm = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download-source');
      if (response.status === 403) {
        alert('You are not authorized to download this file.');
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'MacSploit-source.zip'; // Change the file name and extension as needed
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-white">Download MacSploit&apos;s Source</h1>
        <p className="mb-6 text-white">Click the button below to download MacSploit&apos;s source code.</p>
        <button 
          onClick={handleDownload} 
          className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Download
        </button>
      </div>
    </div>
  );
};

const DownloadSourcePage = () => {
  const router = useRouter();

  useEffect(() => {
    const referer = document.referrer;
    const validReferer = 'https://loot-link.com'; // Change to the actual URL of the ad redirect link

    if (!referer.startsWith(validReferer)) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <DownloadForm />
    </div>
  );
};

export default DownloadSourcePage;
