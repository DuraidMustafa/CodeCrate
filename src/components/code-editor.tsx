"use client"

import type React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  className?: string
}

export function CodeEditor({ value, onChange, language, placeholder, className }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={cn("relative", className)}>
      {/* Language indicator */}
      {language && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded">
            {language}
          </span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-lg border border-white/20 bg-black/30">
        {/* Simple textarea without syntax highlighting */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          className="w-full min-h-[300px] p-4 font-mono text-sm bg-transparent text-white placeholder:text-gray-500 border-none outline-none resize-none overflow-auto"
          style={{
            lineHeight: "1.5",
            tabSize: 2,
          }}
          spellCheck={false}
        />
      </div>

      {/* Stats */}
      <div className="mt-2 text-xs text-gray-500">
        {value.split("\n").length} lines • {value.length} characters
      </div>
    </div>
  )
}
