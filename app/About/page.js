import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        About Me
      </h1>
      {/* Personal Information */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Who I Am
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 duration-200 ease-in-out">
              <Image
                src={`/img/wann.jpg`}
                alt={`Profile}`}
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">
                Muhamad ridwan
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Full Stack Developer
              </p>
              <p className="text-gray-700 dark:text-gray-300">Indonesia</p>
            </div>
          </div>
          <div className="md:w-2/3 space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              I a passionate full stack developer with over 5 years of
              experience building web applications. I specialize in JavaScript
              technologies across the entire stack (React, Next.js, Node.js) and
              have a strong foundation in UI/UX principles.
            </p>
            <p>
              My journey in web development began during my computer science
              studies when I built my first e-commerce platform. Since then, Ive
              worked with startups and established companies to deliver robust,
              scalable, and user-friendly applications.
            </p>
            <p>
              When Im not coding, you can find me hiking, reading sci-fi novels,
              or experimenting with new cooking recipes. I believe in continuous
              learning and regularly attend tech conferences and contribute to
              open-source projects.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Professional Experience
        </h2>

        <div className="space-y-8">
          {[
            {
              role: "Senior Frontend Developer",
              company: "Tech Innovations Inc.",
              period: "2022 - Present",
              description:
                "Lead the frontend development team in building a SaaS platform using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved site performance by 40%.",
            },
            {
              role: "Full Stack Developer",
              company: "Web Solutions Co.",
              period: "2019 - 2022",
              description:
                "Developed and maintained multiple client projects using the MERN stack. Created RESTful APIs and implemented authentication systems using JWT.",
            },
            {
              role: "Junior Developer",
              company: "Digital Crafts LLC",
              period: "2017 - 2019",
              description:
                "Assisted in developing responsive websites for clients. Worked with HTML, CSS, JavaScript, and WordPress.",
            },
          ].map((job, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-600 dark:border-blue-400 pl-4"
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {job.role}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-1">
                {job.company}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {job.period}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Education
        </h2>

        <div className="space-y-6">
          {[
            {
              degree: "Master of Science in Computer Science",
              institution: "Tech University",
              period: "2015 - 2017",
              description:
                "Specialized in Web Technologies and Distributed Systems.",
            },
            {
              degree: "Bachelor of Science in Computer Science",
              institution: "State University",
              period: "2011 - 2015",
              description:
                "Graduated with honors. Completed a thesis on Responsive Web Design Techniques.",
            },
          ].map((edu, index) => (
            <div
              key={index}
              className="border-l-4 border-green-600 dark:border-green-400 pl-4"
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {edu.degree}
              </h3>
              <p className="text-green-600 dark:text-green-400 mb-1">
                {edu.institution}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {edu.period}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Skills & Technologies
        </h2>

        <div className="space-y-6">
          {[
            {
              category: "Frontend",
              skills: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Redux",
                "GraphQL",
              ],
            },
            {
              category: "Backend",
              skills: [
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "REST API Design",
                "Firebase",
                "AWS Lambda",
              ],
            },
            {
              category: "DevOps & Tools",
              skills: [
                "Git",
                "Docker",
                "CI/CD",
                "Jest",
                "Webpack",
                "VS Code",
                "Figma",
                "Jira",
              ],
            },
          ].map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
