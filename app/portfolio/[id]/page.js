"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Globe, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa";
// Sample project data
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    description:
      "A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
    longDescription:
      "This e-commerce platform provides a complete solution for online retailers. It includes features such as user authentication, product management, category filtering, shopping cart functionality, and secure payment processing. The application was built with a React frontend, Redux for state management, Node.js backend, and MongoDB for data storage.",
    challenges:
      "One of the main challenges was implementing a real-time inventory system that would update across all connected clients. This was solved by using WebSockets to push updates to clients whenever inventory levels changed.",
    features: [
      "User authentication and profile management",
      "Product catalog with search and filtering",
      "Shopping cart and checkout process",
      "Payment processing with Stripe",
      "Order history and tracking",
      "Admin dashboard for inventory management",
    ],
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Stripe API",
      "WebSockets",
      "Docker",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    completionDate: "December 2023",
    image: "/placeholder-image.jpg",
  },
  {
    id: "2",
    title: "Task Management App",
    category: "Web Application",
    tags: ["React", "Firebase", "Tailwind CSS"],
    description:
      "A collaborative task management application with real-time updates, task assignments, and progress tracking.",
    longDescription:
      "This task management application allows teams to collaborate effectively on projects. Users can create tasks, assign them to team members, set deadlines, and track progress in real-time. The application features a drag-and-drop interface for easy task management and real-time updates across all connected clients.",
    challenges:
      "The main challenge was implementing a responsive, real-time UI that would work seamlessly across different devices and screen sizes. This was addressed by using Firebase for real-time data synchronization and Tailwind CSS for responsive design.",
    features: [
      "Task creation and assignment",
      "Deadline setting and reminders",
      "Real-time progress tracking",
      "Team collaboration features",
      "File attachments",
      "Activity logs and notifications",
    ],
    technologies: [
      "React",
      "Firebase Firestore",
      "Firebase Authentication",
      "Tailwind CSS",
      "React DnD",
      "React Query",
      "Vercel",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    completionDate: "October 2023",
    image: "/placeholder-image.jpg",
  },
  // Add more projects as needed
];

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/portfolio"
        className="inline-flex items-center mb-6 text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Projects
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
        <div className="h-64 md:h-96 bg-gray-300 dark:bg-gray-700"></div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Completed: {project.completionDate}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe className="w-5 h-5 mr-2" /> Live Demo
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <FaGithub className="w-5 h-5 mr-2" /> View Code
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Project Overview
              </h2>
              <p>{project.longDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Challenges & Solutions
              </h2>
              <p>{project.challenges}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Key Features
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
