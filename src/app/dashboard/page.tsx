"use client";

import { AddSnippetModal } from "@/components/add-snippet-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AdvancedLoading from "@/components/advanced-loading";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoading from "@/components/infinite-scroll-loading";
import { EditSnippetModel } from "@/components/edit-snippet-model";
import { useRouter } from "next/navigation";

interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  userId: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

const LIMIT = 6;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchSnippets({ reset: true });
  }, [isModalOpen, isEditModalOpen]);

  const fetchSnippets = async ({ reset = false } = {}) => {
    const currentPage = reset ? 0 : page;

    const response = await fetch(
      `/api/snippets/getAllSnippets?limit=${LIMIT}&skip=${currentPage * LIMIT}`,
    );
    const data = await response.json();

    if (data.success) {
      if (reset) {
        setSnippets(data.snippets);
        setPage(1); // set to next page
      } else {
        setSnippets((prev) => [...prev, ...data.snippets]);
        setPage((prev) => prev + 1);
      }
      setHasMore(data.snippets.length === LIMIT);
    }

    setIsLoading(false);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy code");
    }
  };

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getLanguageForHighlighter = (language: string) => {
    if (!language) {
      return "javascript";
    }
    const langMap: { [key: string]: string } = {
      TypeScript: "typescript",
      JavaScript: "javascript",
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
      Go: "go",
      Rust: "rust",
      Swift: "swift",
      Kotlin: "kotlin",
    };
    return langMap[language] || language.toLowerCase();
  };
  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      const response = await fetch("/api/snippets/deleteSnippet", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: snippetId }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Snippet deleted successfully");
        fetchSnippets({ reset: true });
      }
      if (!data.success) {
        toast.error(data.message || "Failed to delete snippet");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error occurred while deleting snippet");
    }
  };
  if (isLoading) return <AdvancedLoading />;

  return (
    <section className='container mx-auto px-4 py-8'>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {snippets.length > 0 ? (
        <>
          {/* Search Bar */}
          <div className='flex justify-center mt-8 mb-8'>
            <input
              type='search'
              className='border w-full max-w-2xl p-3 rounded-lg shadow-md outline-none ring-2 ring-purple-500 focus:ring-purple-600 transition-all'
              placeholder='Search snippets by title, tags, or language...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add New Snippet Button */}
          <div className='flex justify-center mb-8'>
            <Button
              className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25'
              onClick={() => setIsModalOpen(true)}>
              <Plus className='h-4 w-4 mr-2' /> Add New Snippet
            </Button>
          </div>

          {/* Snippets Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={snippets.length}
            next={fetchSnippets}
            hasMore={hasMore}
            loader={<InfiniteScrollLoading />}
            endMessage={""}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {filteredSnippets.map((snippet) => (
                <Card
                  key={snippet._id}
                  className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
                  <CardHeader className='pb-3'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <CardTitle className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                          {snippet.title}
                        </CardTitle>
                        {snippet.language ? (
                          <div className='flex items-center gap-2 mt-2'>
                            <Badge
                              variant='secondary'
                              className='text-xs'>
                              Language : {snippet.language}
                            </Badge>
                          </div>
                        ) : null}
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => copyToClipboard(snippet.code)}
                          className='h-8 w-8 p-0'>
                          <Copy className='h-4 w-4' />
                        </Button>
                        <EditSnippetModel
                          isOpen={isEditModalOpen}
                          onClose={() => setIsEditModalOpen(false)}
                          snippetId={snippet._id}
                        />
                        <Button
                          size='sm'
                          variant='ghost'
                          className='h-8 w-8 p-0'
                          onClick={() => setIsEditModalOpen(true)}>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => handleDeleteSnippet(snippet._id)}
                          className='h-8 w-8 p-0 text-red-500 hover:text-red-700'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Tags */}
                    {snippet.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mb-4'>
                        {snippet.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Code Block */}
                    <div className='relative'>
                      <SyntaxHighlighter
                        language={getLanguageForHighlighter(snippet.language)}
                        style={oneDark}
                        customStyle={{
                          borderRadius: "8px",
                          fontSize: "14px",
                          maxHeight: "300px",
                          overflow: "auto",
                        }}
                        showLineNumbers={true}
                        wrapLines={true}>
                        {snippet.code}
                      </SyntaxHighlighter>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InfiniteScroll>

          {filteredSnippets.length === 0 && searchTerm && (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>
                No snippets found matching your search.
              </p>
            </div>
          )}
        </>
      ) : (
        /* Empty State - Add First Snippet */
        <div className='flex justify-center items-center mt-32'>
          <Button
            className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25 h-32 w-96 text-2xl'
            onClick={() => setIsModalOpen(true)}>
            <Plus className='h-6 w-6 text-white mr-3' /> Add Your First Snippet
          </Button>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
