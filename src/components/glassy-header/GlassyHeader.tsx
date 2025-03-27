import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "About", "Services", "Contact"];

export default function GlassyHeader() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden")
    document.body.classList.toggle("md:overflow-auto")
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 left-0 w-full border-b border-white/20 shadow-lg z-50 transition-all ${
        isOpen ? "bg-black/90 md:bg-black/50 md:backdrop-blur-lg" : "bg-black/50 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-2xl font-bold">
          MyLogo
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-white hover:text-gray-300 transition">
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center z-50 md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-8 text-3xl">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-white hover:text-gray-300 transition">
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
