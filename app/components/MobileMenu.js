"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import PropTypes from "prop-types"; // ✅

const MobileMenu = ({ navItems }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("mobile-menu-button");

      if (
        menu &&
        menuButton &&
        !menu.contains(event.target) &&
        !menuButton.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        id="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "block px-3 py-2 rounded-md font-medium text-blue-600 dark:text-blue-400"
                    : "block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                } transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Tambahkan validasi props
MobileMenu.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MobileMenu;
