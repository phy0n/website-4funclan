"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-black">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
        <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 w-full max-w-7xl mx-auto">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity flex items-center">
            <Image src="/img/4F.webp" alt="4Fun Logo" width={52} height={52} className="rounded-md object-cover" />
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-400 tracking-wide uppercase">
            <Link href="/" className="hover:text-white transition-colors relative group py-1">
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/members" className="hover:text-white transition-colors relative group py-1">
              MEMBERS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className="hover:text-white transition-colors relative group py-1">
              GALLERY
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link href="https://discord.gg/SrcssWm3xA" target="_blank" className="ml-4 bg-primary text-white px-6 py-2.5 rounded-none font-black hover:bg-white hover:text-black transition-all">
              JOIN DISCORD
            </Link>
          </div>
          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-black border-l border-white/10 z-[70] shadow-2xl flex flex-col md:hidden">
              <div className="flex justify-end p-5 border-b border-white/10">
                <button onClick={() => setIsOpen(false)} className="text-white p-2 focus:outline-none">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 p-8 text-sm font-bold text-gray-400 tracking-wide uppercase">
                <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  HOME
                </Link>
                <Link href="/members" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  MEMBERS
                </Link>
                <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  GALLERY
                </Link>
                <Link href="https://discord.gg/SrcssWm3xA" target="_blank" onClick={() => setIsOpen(false)} className="mt-8 bg-primary text-white text-center px-6 py-3 rounded-none font-black hover:bg-white hover:text-black transition-all">
                  JOIN DISCORD
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
