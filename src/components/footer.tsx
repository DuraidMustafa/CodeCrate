import { Code2, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className='relative border-t border-white/10 bg-gradient-to-b from-transparent to-black/50'>
      <div className='container mx-auto px-6 py-16'>
        <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Link
              href='/'
              className='flex items-center space-x-3 mb-6'>
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
            <p className='text-gray-400 max-w-md mb-6 leading-relaxed'>
              Personal code snippet manager for solo developers. Save, search,
              and organize your code snippets with tags, and instant recall.
            </p>
          </div>
        </div>
        <div className='text-gray-400 max-w-md mb-6 leading-relaxed'>
          UI generated using Tailwind UI / AI tools to save time and focus on
          backend systems.
        </div>
        <div className='mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm flex items-center'>
            © {new Date().getFullYear()} CodeCrate. Built with{" "}
            <Heart className='inline h-4 w-4 text-red-500 fill-current mx-1' />
            for solo developers.
          </p>
          <div className='flex space-x-6 mt-4 sm:mt-0'>
            <Link
              href='#'
              className='text-gray-400 hover:text-white text-sm transition-colors'>
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-white text-sm transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
