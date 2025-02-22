'use client';

import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SessionWrapper from './SessionWrapper';
const Navbar: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nav = document.getElementById('home');
      if (nav) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
          if (lastScrollY <= window.scrollY) {
            controls.start('up');
          } else {
            controls.start('down');
          }
          lastScrollY = window.scrollY;
        });
      }
    }
  }, [controls]);

  return (
    <div id="home" className="fixed top-0 z-[1000] left-0 right-0 max-w-screen">

      <motion.nav
       className="w-full flex items-center justify-between p-4 glass-nav z-50 max-w-screen"

        ref={ref}
      >
        <div className="flex items-center justify-between w-full z-50 max-w-screen">
          <a href="https://robovitics.in/" target="_blank" rel="noopener noreferrer">
          </a>
          <button className="md:hidden text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <div className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white bg-opacity-10 backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:flex md:space-x-6 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} items-center`}>
            <Link href="/#home" className="block px-4 py-2 md:py-0 text-xl text-white hover:text-gray-300 link">Home</Link>
            <Link href="/#tracks" className="block px-4 py-2 md:py-0 text-xl text-white hover:text-gray-300 link">Tracks</Link>
            <Link href="/#schedule" className="block px-4 py-2 md:py-0 text-xl text-white hover:text-gray-300 link">Timeline</Link>
            <Link href="/#FAQ" className="block px-4 py-2 md:py-0 text-xl text-white hover:text-gray-300 link">FAQs</Link>
            <Link href="/#footer" className="block px-4 py-2 md:py-0 text-xl text-white hover:text-gray-300 link">Contact Us</Link>
            <SessionWrapper></SessionWrapper>

          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;