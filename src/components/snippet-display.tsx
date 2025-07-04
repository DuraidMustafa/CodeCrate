"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Code2 } from "lucide-react";
import copyToClipboard from "@/functions/copyToClipboard";
interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  visibility: "public" | "private";
  tags: string[];
}

interface SnippetDisplayProps {
  snippet: Snippet;
}

export default function SnippetDisplay({ snippet }: SnippetDisplayProps) {
  const getLanguageForHighlighter = (language: string) => {
    const langMap: { [key: string]: string } = {
      JavaScript: "javascript",
      TypeScript: "typescript",
      Python: "python",
      Java: "java",
      "C++": "cpp",
      "C#": "csharp",
      HTML: "html",
      CSS: "css",
      JSON: "json",
      SQL: "sql",
      Bash: "bash",
      PHP: "php",
      Ruby: "ruby",
      Go: "go",
      Rust: "rust",
    };
    return langMap[language] || snippet.language.toLowerCase();
  };

  return (
    <div className='max-w-6xl mx-auto space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold text-white'>{snippet.title}</h1>
          <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400'>
            <div className='flex items-center gap-2'>
              <Code2 className='h-4 w-4' />
              <span>{snippet.language}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  snippet.visibility === "public"
                    ? "bg-green-900/30 text-green-300 border border-green-800"
                    : "bg-gray-700/50 text-gray-300 border border-gray-600"
                }`}>
                {snippet.visibility === "public" ? "🌐 Public" : "🔒 Private"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => copyToClipboard(snippet.code)}
            className='bg-gray-800 border-gray-700 hover:bg-gray-700'>
            <Copy className='h-4 w-4 mr-2' />
            Copy
          </Button>
        </div>
      </div>

      {/* Tags Section */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {snippet.tags.map((tag, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='bg-blue-900/30 text-blue-300 border-blue-800 hover:bg-blue-900/40'>
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Code Display */}
      <Card className='bg-gray-900 border-gray-800'>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              <span className='text-sm text-gray-400 ml-4'>
                {snippet.language}
              </span>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => copyToClipboard(snippet.code)}
              className='text-gray-400 hover:text-white hover:bg-gray-800'>
              <Copy className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='relative'>
            <SyntaxHighlighter
              language={getLanguageForHighlighter(snippet.language)}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 0.5rem 0.5rem",
                background: "transparent",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
              showLineNumbers={true}
              lineNumberStyle={{
                color: "#6b7280",
                paddingRight: "1em",
                minWidth: "3em",
              }}
              wrapLines={true}
              wrapLongLines={true}>
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
