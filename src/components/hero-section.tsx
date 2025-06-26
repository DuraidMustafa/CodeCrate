"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Search, Tag, Folder } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className='relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden'>
      {/* Floating elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse' />
      <div className='absolute top-40 right-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000' />
      <div className='absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500' />

      <div className='container relative mx-auto px-6'>
        <div className='mx-auto max-w-5xl text-center'>
          <Badge
            variant='secondary'
            className='mb-8 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 px-6 py-2 text-sm backdrop-blur-sm'>
            <Sparkles className='mr-2 h-4 w-4' />
            Personal Code Snippet Manager
          </Badge>

          <h1 className='mb-8 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl'>
            Save, Search &
            <br />
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent'>
              Organize
            </span>
            <br />
            Code Snippets
          </h1>

          <p className='mx-auto mb-12 max-w-3xl text-xl text-gray-300 sm:text-2xl leading-relaxed'>
            Your clean, personal snippet vault with tags, folders, and instant
            recall. Built for solo developers who want their code organized
            beautifully.
          </p>

          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-16'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-4 text-lg shadow-2xl shadow-purple-500/25 border-0 group'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              Start Your Journey
              <ArrowRight
                className={`ml-3 h-5 w-5 transition-transform ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </Button>
          </div>

          {/* Feature preview cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            {[
              {
                icon: Search,
                title: "Fast Search",
                desc: "Find any snippet with instant recall",
              },
              {
                icon: Tag,
                title: "Smart Tagging",
                desc: "Organize across projects with tags",
              },
              {
                icon: Folder,
                title: "Clean Folders",
                desc: "Personal vault structure that works",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className='group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-300 hover:scale-105'>
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='relative'>
                  <feature.icon className='h-8 w-8 text-purple-400 mb-4 group-hover:text-cyan-400 transition-colors' />
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-400 text-sm'>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
