"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Code2, Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { AddSnippetModal } from "./add-snippet-modal";

const DashboardNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className='top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl'>
      <div className='container mx-auto flex h-20 items-center justify-between px-6'>
        <Link
          href='/'
          className='flex items-center space-x-3'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-sm' />
            <div className='relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500'>
              <Code2 className='h-6 w-6 text-white' />
            </div>
          </div>
          <span className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
            CodeCrate
          </span>
        </Link>
        <div className='flex space-x-4'>
          <div className='flex items-center space-x-4'>
            <AddSnippetModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <Button
              className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25'
              onClick={() => setIsModalOpen(true)}>
              <Plus className='h-6 w-6 text-white' /> Add New Snippet
            </Button>
          </div>
          <div className='flex items-center'>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
