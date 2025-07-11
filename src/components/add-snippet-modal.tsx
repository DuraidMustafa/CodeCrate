"use client";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Code, Save, Tag, X, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/code-editor";
import { detectLanguage } from "@/lib/language-detector";

interface AddSnippetModalProps {
  isOpen: boolean;
  availableTags: string[];
  onClose: () => void;
}

const languages = [
  // Web Technologies
  "JavaScript",
  "TypeScript",
  "JSX",
  "TSX",
  "HTML",
  "CSS",
  "SCSS",
  "Sass",
  "Less",
  "Stylus",
  "JSON",
  "XML",
  "YAML",
  "TOML",
  "INI",

  // Frontend Frameworks
  "Vue",
  "Svelte",
  "Angular",

  // Backend Languages
  "Python",
  "Java",
  "C#",
  "C++",
  "C",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Perl",
  "Lua",

  // Mobile Development
  "Swift",
  "Kotlin",
  "Dart",
  "Objective-C",

  // Functional Languages
  "Haskell",
  "Erlang",
  "Elixir",
  "Clojure",
  "F#",
  "Scala",
  "OCaml",

  // Systems Programming
  "Assembly",

  // JVM Languages
  "Groovy",

  // .NET Languages
  "VB.NET",

  // Scripting Languages
  "Bash",
  "Zsh",
  "Fish",
  "PowerShell",
  "Batch",

  // Database
  "SQL",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "PL/SQL",
  "T-SQL",

  // Configuration & DevOps
  "Dockerfile",
  "Makefile",
  "CMake",
  "Nginx",
  "Apache",

  // Documentation
  "Markdown",
  "reStructuredText",
  "LaTeX",

  // Data & Config
  "CSV",
  "TSV",

  // Game Development
  "GDScript",

  // Scientific Computing
  "R",
  "MATLAB",
  "Octave",
  "Julia",

  // Blockchain
  "Solidity",

  // Query Languages
  "GraphQL",

  // Template Languages
  "Handlebars",
  "Mustache",
  "Jinja2",
  "Twig",

  // Other
  "RegEx",
  "Diff",
  "Log",
];

export function AddSnippetModal({
  isOpen,
  onClose,
  availableTags,
}: AddSnippetModalProps) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [visibility, setVisibility] = useState("private");

  function getNewTags(availableTags: string[], selectedTags: string[]) {
    const newTags = [];
    const defaultTags = [];

    for (const item of selectedTags) {
      if (availableTags.includes(item)) {
        defaultTags.push(item);
      } else {
        newTags.push(item);
      }
    }

    return {
      newTags,
      defaultTags,
    };
  }
  // Auto-detect language when code changes
  useEffect(() => {
    if (code.trim() && !language) {
      const detected = detectLanguage(code);
      if (detected) {
        setDetectedLanguage(detected);
      } else {
        setDetectedLanguage("");
      }
    } else if (!code.trim()) {
      setDetectedLanguage("");
    }
  }, [code, language]);

  const addTag = async (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      try {
        setSelectedTags([...selectedTags, tag]);
        setNewTag("");
        const tags = getNewTags(availableTags, [...selectedTags, tag]);
        const isNewTag = tags.newTags.includes(tag);

        if (!isNewTag) {
          return;
        }
        const response = await fetch("/api/tags/saveTags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag,
          }),
        });
        const data = await response.json();
        if (data.success) {
          toast.success(data.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        if (!data.success) {
          toast.error(data.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
      } catch (error) {
        console.log(error);

        toast.error("An Error Occurred", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleAutoDetect = () => {
    if (detectedLanguage) {
      setLanguage(detectedLanguage);
      setDetectedLanguage("");
    }
  };

  const handleSave = async () => {
    const finalLanguage = language || "";

    try {
      const response = await fetch(`/api/snippets/saveSnippet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          code,
          language: finalLanguage,
          defaultTags: selectedTags,
          visibility,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      toast.success(data.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);

      toast.error("Server Error Occurred", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setTitle("");
    setCode("");
    setLanguage("");
    setSelectedTags([]);
    setNewTag("");
    setDetectedLanguage("");

    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setCode("");
    setLanguage("");
    setSelectedTags([]);
    setNewTag("");
    setDetectedLanguage("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}>
      <DialogContent className='max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/20 text-white'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-xl'>
            <Code className='h-5 w-5 text-purple-400' />
            Add New Snippet
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 mt-6'>
          {/* Title */}
          <div className='space-y-2'>
            <Label
              htmlFor='modal-title'
              className='text-gray-300'>
              Title <span className='text-gray-500'>(optional)</span>
            </Label>
            <Input
              id='modal-title'
              placeholder='Enter snippet title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500/50'
            />
          </div>

          {/* Language */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='modal-language'
                className='text-gray-300'>
                Language <span className='text-gray-500'>(optional)</span>
              </Label>
              {detectedLanguage && !language && (
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='secondary'
                    className='bg-green-500/20 text-green-300 border-green-500/30'>
                    Detected: {detectedLanguage}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleAutoDetect}
                    className='text-green-400 hover:text-green-300 hover:bg-green-500/10'>
                    <Wand2 className='h-4 w-4 mr-1' />
                    Use
                  </Button>
                </div>
              )}
            </div>
            <Select
              value={language}
              onValueChange={setLanguage}>
              <SelectTrigger className='bg-black/30 border-white/20 text-white'>
                <SelectValue placeholder='Select language...' />
              </SelectTrigger>
              <SelectContent className='bg-gray-900 border-white/20 max-h-60'>
                {languages.map((lang) => (
                  <SelectItem
                    key={lang}
                    value={lang}
                    className='text-white hover:bg-white/10'>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label
              htmlFor='modal-language'
              className='text-gray-300 mt-4'>
              Visibility
            </Label>
            <Select
              value={visibility}
              onValueChange={setVisibility}>
              <SelectTrigger className='bg-black/30 border-white/20 text-white'>
                <SelectValue placeholder='Select Visibility...' />
              </SelectTrigger>
              <SelectContent className='bg-gray-900 border-white/20 max-h-60'>
                <SelectItem
                  value='private'
                  className='text-white hover:bg-white/10'>
                  Private
                </SelectItem>
                <SelectItem
                  value='public'
                  className='text-white hover:bg-white/10'>
                  Public
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Code Editor */}
          <div className='space-y-2'>
            <Label
              htmlFor='modal-code'
              className='text-gray-300'>
              Code *
            </Label>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language || detectedLanguage}
              placeholder='Paste your code here...'
            />
          </div>

          {/* Tags */}
          <div className='space-y-2'>
            <Label className='text-gray-300'>
              Tags <span className='text-gray-500'>(optional)</span>
            </Label>

            {selectedTags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-3'>
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='secondary'
                    className='bg-purple-500/20 text-purple-300 border-purple-500/30 pr-1'>
                    <Tag className='mr-1 h-3 w-3' />
                    {tag}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-auto p-0 ml-2 hover:bg-transparent'
                      onClick={() => removeTag(tag)}>
                      <X className='h-3 w-3' />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            <div className='flex gap-2'>
              <Input
                placeholder='Add a tag...'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                className='bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500/50'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() => addTag(newTag)}
                className='border-white/20 text-gray-300 hover:bg-white/10'>
                Add
              </Button>
            </div>

            <div className='flex flex-wrap gap-2 mt-3'>
              <span className='text-sm text-gray-400 mr-2'>Suggested:</span>
              {availableTags &&
                availableTags
                  .filter((tag) => !selectedTags.includes(tag))
                  .slice(0, 6)
                  .map((tag) => (
                    <Button
                      key={tag}
                      variant='ghost'
                      size='sm'
                      onClick={() => addTag(tag)}
                      className='h-6 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10'>
                      {tag}
                    </Button>
                  ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={handleClose}
              className='border-white/20 text-gray-300 hover:bg-white/10 bg-transparent'>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!code.trim()}
              className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0'>
              <Save className='mr-2 h-4 w-4' />
              Save Snippet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
