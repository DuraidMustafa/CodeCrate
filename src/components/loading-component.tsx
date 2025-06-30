"use client";

import { useEffect, useState } from "react";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className='relative'>
        {/* Outer rotating ring */}
        <div className='w-32 h-32 rounded-full border-4 border-purple-900/30 border-t-purple-500 animate-spin'></div>

        {/* Middle rotating ring */}
        <div className='absolute top-2 left-2 w-28 h-28 rounded-full border-4 border-purple-800/20 border-r-purple-400 animate-spin-reverse'></div>

        {/* Inner pulsing circle */}
        <div className='absolute top-4 left-4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 animate-pulse flex items-center justify-center'>
          <div className='w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-ping'></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className='absolute -top-8 -left-8 w-2 h-2 bg-purple-400 rounded-full animate-float-1'></div>
        <div className='absolute -top-4 -right-6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float-2'></div>
        <div className='absolute -bottom-6 -left-4 w-1 h-1 bg-purple-500 rounded-full animate-float-3'></div>
        <div className='absolute -bottom-8 -right-8 w-2 h-2 bg-purple-400 rounded-full animate-float-1'></div>

        {/* Glowing effect */}
        <div className='absolute inset-0 w-32 h-32 rounded-full bg-purple-500/20 blur-xl animate-pulse'></div>
      </div>

      {/* Loading text */}
      <div className='absolute mt-48'>
        <div className='flex space-x-1'>
          <div
            className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
            style={{ animationDelay: "0ms" }}></div>
          <div
            className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'
            style={{ animationDelay: "150ms" }}></div>
          <div
            className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'
            style={{ animationDelay: "300ms" }}></div>
        </div>
        <p className='text-purple-300 text-lg font-medium mt-4 text-center tracking-wider'>
          Loading
        </p>
      </div>

      {/* Background gradient overlay */}
      <div className='fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/10 pointer-events-none'></div>
    </div>
  );
}
