"use client";

import { Input } from "@/components/ui/input";
import { FileDown } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
export default function CustomFileInput({
  fetchSnippets,
}: {
  fetchSnippets: ({ reset }: { reset: boolean }) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("Upload");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      toast.error("Please upload a valid JSON file");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonString = event.target?.result as string;
        const parsedData = JSON.parse(jsonString);
     

        await sendToBackend(parsedData);
      } catch (error) {
        toast.error("Invalid JSON format");
        console.log(error);
      }
    };
    reader.readAsText(file);
  };

  const sendToBackend = async (data: any[]) => {
    try {
      const response = await fetch("/api/snippets/uploadSnippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippets: data }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchSnippets({ reset: true });
        toast.success("Snippets uploaded successfully");
      } else {
        toast.error("Some Error Occurred");
      }
    } catch (err) {
      console.error("Failed to upload:", err);
    } finally {
      setFileName("Upload");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='relative inline-block ml-4'>
      <button
        type='button'
        onClick={triggerFileInput}
        className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-purple-500/25'>
        <FileDown className='w-4 h-4' />
        <span className='truncate max-w-[150px]'>{fileName}</span>
      </button>

      <Input
        type='file'
        ref={fileInputRef}
        accept='.json'
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}
