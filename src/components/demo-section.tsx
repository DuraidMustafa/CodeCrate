"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Tag, Copy, Play, Code, Folder } from "lucide-react"
import { useState } from "react"

const snippets = [
  {
    title: "React useLocalStorage Hook",
    language: "TypeScript",
    tags: ["react", "hooks", "localStorage"],
    code: `const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue] as const;
};`,
    folder: "React Utils",
  },
  {
    title: "Debounce Function",
    language: "JavaScript",
    tags: ["utils", "performance"],
    code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
const debouncedSearch = debounce(searchFunction, 300);`,
    folder: "Utilities",
  },
  {
    title: "CSS Flexbox Center",
    language: "CSS",
    tags: ["css", "layout", "flexbox"],
    code: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
    folder: "CSS Layouts",
  },
]

export function DemoSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSnippet, setSelectedSnippet] = useState(0)

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />

      <div className="container mx-auto px-6 relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 px-4 py-2 backdrop-blur-sm"
          >
            <Play className="mr-2 h-4 w-4" />
            See It In Action
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Your Personal Snippet Vault
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Experience how CodeCrate organizes your code snippets with tags, folders, and fast search.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Search Interface */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search your snippets... (try 'react' or 'css')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 pr-6 py-6 text-lg bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-2xl backdrop-blur-sm focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20"
                />
              </div>
            </div>
          </div>

          {/* Demo Interface */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Snippet List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Folder className="mr-2 h-5 w-5 text-purple-400" />
                Your Snippets
              </h3>
              {snippets.map((snippet, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 border ${
                    selectedSnippet === index
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedSnippet(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{snippet.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                        {snippet.language}
                      </Badge>
                      <span className="text-xs text-gray-500">{snippet.folder}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {snippet.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="border-gray-600 text-gray-400 text-xs px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {snippet.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{snippet.tags.length - 2}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Code Preview */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-purple-400" />
                      <h3 className="font-semibold text-white">{snippets[selectedSnippet].title}</h3>
                    </div>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                      {snippets[selectedSnippet].language}
                    </Badge>
                    <span className="text-sm text-gray-400">in {snippets[selectedSnippet].folder}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-gray-300 bg-black/30 p-6 rounded-xl overflow-x-auto border border-white/5">
                    <code>{snippets[selectedSnippet].code}</code>
                  </pre>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {snippets[selectedSnippet].tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
