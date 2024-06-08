import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DownloadForm = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/download', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setDownloadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const url = window.URL.createObjectURL(xhr.response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'MacSploit-source.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Download failed:', xhr.statusText);
      }
      setDownloadProgress(0);
    };

    xhr.onerror = () => {
      console.error('Download failed');
      setDownloadProgress(0);
    };

    xhr.send();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="p-6 rounded-lg shadow-md bg-zinc-900 justify-center text-center border border-zinc-800">
        <h1 className="text-2xl font-bold mb-4 text-white">Download MacSploit&apos;s Source</h1>
        <p className="mb-6 text-white">Click the button below to download MacSploit&apos;s source code.</p>
        <button
          onClick={handleDownload}
          className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Download
        </button>
        {downloadProgress > 0 && (
          <div className="w-full mt-4">
            <div className="h-4 bg-gray-200 rounded">
              <div
                className="h-4 bg-indigo-600 rounded"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-white">{Math.round(downloadProgress)}%</p>
          </div>
        )}
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
