"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className='py-32 relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20' />

      <div className='container mx-auto px-6 relative'>
        <Card className='mx-auto max-w-5xl relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30' />
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10' />

          <CardContent className='relative p-12 sm:p-16 text-center'>
            <div className='absolute top-8 left-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse' />
            <div className='absolute bottom-8 right-8 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000' />

            <Sparkles className='h-12 w-12 text-purple-400 mx-auto mb-6' />

            <h2 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent'>
              Ready for Your
              <br />
              Personal Snippet Vault?
            </h2>

            <p className='text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
              Stop digging through Notion, Gists, and text files. Start
              organizing your code snippets the clean, simple way.
            </p>

            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-12'>
              <Link href={"/dashboard"}>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-4 text-lg shadow-2xl shadow-purple-500/25 border-0 group'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                  Get Started
                  <ArrowRight
                    className={`ml-3 h-5 w-5 transition-transform ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </Button>
              </Link>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
              {[
                {
                  label: "Clean & Simple",
                  sublabel: "Elegant, purposeful design",
                },
                {
                  label: "Solo Developer",
                  sublabel: "Built for your workflow",
                },
                {
                  label: "Fast Search",
                  sublabel: "Instant recall when you need it",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='group'>
                  <div className='text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors'>
                    {stat.label}
                  </div>
                  <div className='text-gray-400 text-sm'>{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
