'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-xl mb-4 text-gray-400">{error.message}</p>
        <div className="bg-gray-900 p-4 rounded mb-4 text-left text-sm overflow-auto max-h-64">
          <pre className="text-red-400">{error.stack}</pre>
        </div>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
