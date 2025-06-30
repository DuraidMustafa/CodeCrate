"use client";

import { useEffect, useState } from "react";

export default function AdvancedLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4'>
      <div className='relative flex flex-col items-center'>
        {/* Main loading animation */}
        <div className='relative w-40 h-40'>
          {/* Outer ring with gradient */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-1 animate-spin'>
            <div className='w-full h-full rounded-full bg-gray-900'></div>
          </div>

          {/* Middle ring */}
          <div className='absolute inset-3 rounded-full border-2 border-purple-400/30 border-t-purple-300 animate-spin-reverse'></div>

          {/* Inner content */}
          <div className='absolute inset-6 rounded-full bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm flex items-center justify-center'>
            <div className='text-center'>
              <div className='w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center animate-pulse'>
                <div className='w-6 h-6 rounded-full bg-white/90 animate-ping'></div>
              </div>
              {/* <div className="text-purple-300 text-xs font-medium">{progress}%</div> */}
            </div>
          </div>

          {/* Orbiting dots */}
          <div
            className='absolute inset-0 animate-spin'
            style={{ animationDuration: "3s" }}>
            <div className='absolute -top-1 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2'></div>
          </div>
          <div
            className='absolute inset-0 animate-spin-reverse'
            style={{ animationDuration: "4s" }}>
            <div className='absolute top-1/2 -right-1 w-1.5 h-1.5 bg-purple-300 rounded-full transform -translate-y-1/2'></div>
          </div>
          <div
            className='absolute inset-0 animate-spin'
            style={{ animationDuration: "5s" }}>
            <div className='absolute -bottom-1 left-1/2 w-1 h-1 bg-purple-500 rounded-full transform -translate-x-1/2'></div>
          </div>
        </div>

        {/* Progress bar */}
        {/* <div className='w-64 h-1 bg-purple-900/30 rounded-full mt-8 overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-100 ease-out'
            style={{ width: `${progress}%` }}></div>
        </div> */}

        {/* Loading text with typewriter effect */}
        <div className='mt-6 text-center'>
          <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2'>
            Loading Dashboard
          </h2>
          <div className='flex items-center justify-center space-x-1'>
            <span className='text-purple-300 text-sm'>Please wait</span>
            <div className='flex space-x-1'>
              <div
                className='w-1 h-1 bg-purple-400 rounded-full animate-bounce'
                style={{ animationDelay: "0ms" }}></div>
              <div
                className='w-1 h-1 bg-purple-400 rounded-full animate-bounce'
                style={{ animationDelay: "150ms" }}></div>
              <div
                className='w-1 h-1 bg-purple-400 rounded-full animate-bounce'
                style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>

        {/* Ambient particles */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-10 left-10 w-1 h-1 bg-purple-400/60 rounded-full animate-float-1'></div>
          <div className='absolute top-20 right-16 w-0.5 h-0.5 bg-purple-300/40 rounded-full animate-float-2'></div>
          <div className='absolute bottom-16 left-20 w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-float-3'></div>
          <div className='absolute bottom-10 right-10 w-1 h-1 bg-purple-400/60 rounded-full animate-float-1'></div>
          <div className='absolute top-1/2 left-4 w-0.5 h-0.5 bg-purple-300/30 rounded-full animate-float-2'></div>
          <div className='absolute top-1/3 right-8 w-1 h-1 bg-purple-500/40 rounded-full animate-float-3'></div>
        </div>
      </div>
    </div>
  );
}
