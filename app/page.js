"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const slideFromBottom = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggeredItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  const textReveal = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%", 
      transition: { 
        duration: 1, 
        ease: "easeInOut",
        delay: 0.4
      }
    }
  };

  const skillBarVariant = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: level,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
    })
  };

  const floatAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Updated photo animation - floating up and down instead of rotating
  const floatingPhotoAnimation = {
    y: [-15, 0, -15],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Animation for moving name text
  const movingNameAnimation = {
    x: [-5, 5, -5],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Hero Section with photo on left, name on right */}
      <motion.section 
        className="py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left side - Profile photo - UPDATED with float animation */}
            <motion.div 
              className="w-full md:w-1/3 flex justify-center md:justify-start"
              variants={slideFromLeft}
            >
              <motion.div 
                className="relative w-48 h-48"
                animate={floatingPhotoAnimation} // Changed from rotateY to floating up-down
              >
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-dashed animate-spin-slow"></div>
                <motion.div 
                  className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg z-10 relative hover-scale"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <Image
                    src={"/img/wann.jpg"}
                    alt="John Doe"
                    width={200}
                    height={200}
                    className="rounded-full w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right side - Name and content - UPDATED with moving name */}
            <motion.div 
              className="w-full md:w-2/3 flex flex-col md:items-start items-center text-center md:text-left"
              variants={slideFromRight}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                <motion.span
                  className="block md:inline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi, Im 
                </motion.span>
                <motion.span 
                  className="text-blue-50 dark:text-[#A693FF] relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    ...movingNameAnimation // Added moving animation to name
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Muhamad Ridwan
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 bg-blue-600 dark:bg-[#A693FF]"
                    variants={textReveal}
                  ></motion.span>
                </motion.span>
              </h1>

              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                A passionate full-stack developer specializing in creating
                elegant, user-friendly applications with modern technologies.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={slideFromBottom}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/portfolio"
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 hover-scale"
                  >
                    View My Work
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/Contact"
                    className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover-scale"
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="inline-block"
              whileInView={{
                rotateX: [0, 90, 0],
                transition: { duration: 1.5 }
              }}
              viewport={{ once: true }}
            >
              My
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              whileInView={{
                rotateX: [0, 90, 0],
                transition: { duration: 1.5, delay: 0.3 }
              }}
              viewport={{ once: true }}
            >
              Skills
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggeredContainer}
          >
            {[
              { name: "React", level: "95%", icon: "⚛️" },
              { name: "Next.js", level: "90%", icon: "🔼" },
              { name: "Node.js", level: "85%", icon: "🟢" },
              { name: "TypeScript", level: "90%", icon: "📘" },
              { name: "Tailwind CSS", level: "95%", icon: "🌬️" },
              { name: "MongoDB", level: "80%", icon: "🍃" },
              { name: "AWS", level: "75%", icon: "☁️" },
              { name: "Docker", level: "70%", icon: "🐳" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                variants={staggeredItem}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.span 
                    className="text-2xl"
                    variants={floatAnimation}
                  >
                    {skill.icon}
                  </motion.span>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-600 dark:bg-[#A693FF] h-2.5 rounded-full"
                    custom={skill.level}
                    variants={skillBarVariant}
                  ></motion.div>
                </div>
                
                {/* Add a 3D flipping card effect on hover */}
                <motion.div 
                  className="mt-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  Proficiency: {skill.level}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Projects Section */}
      <motion.section 
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Recent Projects
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggeredContainer}
          >
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
                variants={staggeredItem}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <motion.div 
                  className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={"/img/e-commerce.jpg"}
                    alt={`Project ${project}`}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Project {project}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    A brief description of the project, technologies used, and
                    the problem it solves.
                  </motion.p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={`/portfolio/project-${project}`}
                      className="text-blue-600 dark:text-[#A693FF] hover:underline group flex items-center"
                    >
                      View Details
                      <motion.span 
                        className="ml-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="text-center mt-8"
            variants={slideFromBottom}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/portfolio"
                className="px-6 py-3 rounded-lg bg-[#A693FF] text-white font-medium hover:bg-blue-700 transition-all duration-300 hover-scale"
              >
                View All Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}