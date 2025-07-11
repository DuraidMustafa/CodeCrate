"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Code2, Plus, Menu, X, FileUp } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { AddSnippetModal } from "./add-snippet-modal";

const DashboardNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const downloadSnippets = async () => {
    const response = await fetch("/api/snippets/exportSnippets");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snippets.json";
    a.click();
  };
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags/getTags");
        const data = await response.json();
        if (data.success) {
          const tags = data.tags.map((tag: { name: string }) => tag.name);
          setAvailableTags(tags);
        }
      } catch (error) {
        console.log("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

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

        {/* Hamburger menu for mobile */}
        <div className='lg:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className='w-6 h-6 text-white' />
            ) : (
              <Menu className='w-6 h-6 text-white' />
            )}
          </button>
        </div>

        {/* Full menu for large screens */}
        <div className='hidden lg:flex space-x-4 items-center'>
          <AddSnippetModal
            isOpen={isModalOpen}
            availableTags={availableTags}
            onClose={() => setIsModalOpen(false)}
          />
          <Button
            className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25'
            onClick={() => setIsModalOpen(true)}>
            <Plus className='h-6 w-6 text-white' /> Add New Snippet
          </Button>
          <Button
            className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25'
            onClick={downloadSnippets}>
            <FileUp /> Export Snippets
          </Button>
          <UserButton />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className='lg:hidden px-6 pb-4 flex flex-col space-y-4'>
          <AddSnippetModal
            isOpen={isModalOpen}
            availableTags={availableTags}
            onClose={() => setIsModalOpen(false)}
          />
          <Button
            className='w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-md'
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false);
            }}>
            <Plus className='h-5 w-5 mr-2' /> Add New Snippet
          </Button>
          <Button
            className='w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-md'
            onClick={() => {
              setIsMenuOpen(false);
            }}>
            <FileUp className='h-5 w-5 mr-2' /> Export Snippets
          </Button>
          <div className='self-start'>
            <UserButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;
