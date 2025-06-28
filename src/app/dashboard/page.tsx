"use client";
import { AddSnippetModal } from "@/components/add-snippet-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      {/* <div className='flex justify-center mt-16'>
        <input
          type='search'
          className='border w-128 p-2 rounded-lg shadow-md outline-none ring-2 ring-purple-500'
          placeholder='Search snippets...'
        />
      </div> */}
      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className='flex justify-center items-center mt-82'>
        <Button
          className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25 h-32 w-96 text-2xl'
          onClick={() => setIsModalOpen(true)}>
          <Plus className='h-6 w-6 text-white' /> Add Your First Snippet
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
