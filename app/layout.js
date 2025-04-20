import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import PropTypes from "prop-types"; // ← tambahkan ini
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Portfolio - Professional CV Website",
  description:
    "A showcase of my professional skills, projects, and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="pt-20 bg-[#2b6777] dark:bg-black pb-10 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} My Portfolio. All rights
                reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ Tambahkan validasi prop-nya di bawah
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
