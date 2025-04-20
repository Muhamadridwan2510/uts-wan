"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    description:
      "A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
    image: "/placeholder-image.jpg",
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Web Application",
    tags: ["React", "Firebase", "Tailwind CSS"],
    description:
      "A collaborative task management application with real-time updates, task assignments, and progress tracking.",
    image: "/placeholder-image.jpg",
  },
  {
    id: 3,
    title: "Recipe Sharing Platform",
    category: "Web Development",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    description:
      "A social platform for food enthusiasts to share, discover, and save recipes with ratings and comments.",
    image: "/placeholder-image.jpg",
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    category: "Mobile App",
    tags: ["React Native", "Redux", "Express"],
    description:
      "A mobile application for tracking workouts, setting fitness goals, and monitoring progress over time.",
    image: "/placeholder-image.jpg",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    category: "Web Application",
    tags: ["JavaScript", "APIs", "Chart.js"],
    description:
      "A weather dashboard that displays current conditions and forecasts for multiple locations using weather APIs.",
    image: "/placeholder-image.jpg",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Web Development",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A personal portfolio website showcasing projects, skills, and experience with a modern, responsive design.",
    image: "/placeholder-image.jpg",
  },
];

// All unique categories
const allCategories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        My Portfolio
      </h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <Link
                href={`/portfolio/${project.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
