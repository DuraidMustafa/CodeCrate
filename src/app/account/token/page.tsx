"use client";
import { useEffect, useState } from "react";

export default function TokenPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    try {
      const res = await fetch("/api/auth/generateToken");
      const data = await res.json();
      setToken(data.token.jwt || "No token returned.");
    } catch {
      setToken("Failed to fetch token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 flex justify-center items-center'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8'>
            <h1 className='text-2xl font-bold text-white mb-2'>
              VS Code Access Token
            </h1>
            <p className='text-blue-100 text-sm'>
              Copy this token to authenticate with VS Code
            </p>
          </div>

          {/* Content */}
          <div className='p-6'>
            {loading ? (
              <div className='flex items-center justify-center py-12'>
                <div className='flex items-center space-x-3'>
                  <div className='animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent'></div>
                  <p className='text-slate-600 font-medium'>
                    Loading your token...
                  </p>
                </div>
              </div>
            ) : token.startsWith("ey") ? (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-slate-700'>
                    Your Access Token
                  </label>
                  <textarea
                    readOnly
                    className='w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    value={token}
                    rows={6}
                    placeholder='Token will appear here...'
                  />
                </div>

                <div className='flex flex-col sm:flex-row gap-3'>
                  <button
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm'
                    onClick={() => {
                      navigator.clipboard.writeText(token);
                      alert("Token copied! Paste it in VS Code.");
                    }}>
                    📋 Copy to Clipboard
                  </button>
                </div>

                {/* Instructions */}
                <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                  <h3 className='text-sm font-semibold text-blue-800 mb-2'>
                    How to use:
                  </h3>
                  <ol className='text-sm text-blue-700 space-y-1 list-decimal list-inside'>
                    <li>Copy the token above</li>
                    <li>Open VS Code</li>
                    <li>Paste the token when prompted for authentication</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className='text-center py-8'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
                  <svg
                    className='w-8 h-8 text-red-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                  Token Error
                </h3>
                <p className='text-red-600 font-medium mb-4'>{token}</p>
                <button
                  className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  onClick={fetchToken}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-sm text-slate-500'>
            Keep your token secure and don't share it with others
          </p>
        </div>
      </div>
    </div>
  );
}
