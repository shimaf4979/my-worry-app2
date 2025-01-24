// components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const menuItems = [
  { href: "/", label: "トップページ" },
  { href: "/statistics", label: "みんなの分布" },
  { href: "/about", label: "開発者" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 bg-white shadow-sm z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent'
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            CRTI
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 rounded-md hover:bg-gray-100'
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className='absolute top-16 left-0 right-0 bg-white shadow-lg'
            >
              <nav className='flex flex-col p-4'>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='py-2 px-4 hover:bg-gray-100 rounded-md'
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
