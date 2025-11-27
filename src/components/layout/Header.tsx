'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all dark:bg-black/80 ${
        isScrolled ? 'border-b border-gray-200 dark:border-gray-800' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-black dark:fill-white"
            >
              <path d="M12 2L2 19.7778H22L12 2Z" />
            </svg>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Vercel Style
            </span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Log In
          </Link>
          <Button href="#" variant="outline" size="sm">
             Contact
          </Button>
          <Button href="#" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
