"use client";

interface InfiniteScrollLoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "minimal";
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function InfiniteScrollLoading({
  variant = "dots",
  text = "",
  size = "lg",
}: InfiniteScrollLoadingProps) {
  const sizeClasses = {
    sm: "py-4",
    md: "py-6",
    lg: "py-8",
  };

  const renderSpinner = () => (
    <div className='flex items-center justify-center space-x-3'>
      <div className='relative'>
        <div className='w-6 h-6 border-2 border-purple-800/30 border-t-purple-400 rounded-full animate-spin'></div>
        <div className='absolute inset-1 w-4 h-4 border border-purple-600/20 border-r-purple-300 rounded-full animate-spin-reverse'></div>
      </div>
      <span className='text-purple-300 text-sm font-medium'>{text}</span>
    </div>
  );

  const renderDots = () => (
    <div className='flex flex-col items-center space-y-3'>
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
        <div
          className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'
          style={{ animationDelay: "450ms" }}></div>
        <div
          className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
          style={{ animationDelay: "600ms" }}></div>
      </div>
      <span className='text-purple-300 text-xs'>{text}</span>
    </div>
  );

  const renderPulse = () => (
    <div className='flex items-center justify-center space-x-3'>
      <div className='flex space-x-1'>
        <div
          className='w-1 h-8 bg-purple-400 rounded-full animate-pulse'
          style={{ animationDelay: "0ms" }}></div>
        <div
          className='w-1 h-6 bg-purple-500 rounded-full animate-pulse'
          style={{ animationDelay: "100ms" }}></div>
        <div
          className='w-1 h-10 bg-purple-600 rounded-full animate-pulse'
          style={{ animationDelay: "200ms" }}></div>
        <div
          className='w-1 h-4 bg-purple-500 rounded-full animate-pulse'
          style={{ animationDelay: "300ms" }}></div>
        <div
          className='w-1 h-7 bg-purple-400 rounded-full animate-pulse'
          style={{ animationDelay: "400ms" }}></div>
      </div>
      <span className='text-purple-300 text-sm'>{text}</span>
    </div>
  );

  const renderMinimal = () => (
    <div className='flex flex-col items-center space-y-2'>
      <div className='w-16 h-0.5 bg-purple-800/30 rounded-full overflow-hidden'>
        <div className='h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent w-8 animate-slide'></div>
      </div>
      <span className='text-purple-400 text-xs font-light'>{text}</span>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "minimal":
        return renderMinimal();
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center ${sizeClasses[size]}`}>
      {renderVariant()}
    </div>
  );
}
