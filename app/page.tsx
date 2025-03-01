"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Badges from "./Badges";
import { Head } from "next/document";

const profile = {
  name: "Sunil Sarolkar",
  location: "Pune, Maharashtra, India",
  email: "spsarolkar@gmail.com",
  website: "https://spsarolkar.github.io/",
  objective:
    "To secure a challenging position in an esteemed organization, leveraging my skills in organizational development, with a strong focus on continuous learning and innovation.",
  experience: [
    {
      role: "Software Engineer",
      company: "Deutsche Bank",
      duration: "July 2015 - Present",
      description:
        "Implemented business logic for new functionalities, fixed security vulnerabilities, migrated platform to cloud hosting, and integrated OAuth authentication. Worked on projects like Feed and Adjustment Workstation and Accounting Subledger.",
    },
    {
      role: "Software Engineer",
      company: "Cognizant Technology Solutions",
      duration: "Dec 2013 - July 2015",
      description:
        "Developed TestSuite using JUnit for end-to-end testing of Position Management applications. Contributed to Global Securities Infrastructure (GSI), ensuring code quality and maintaining stock and cash positions.",
    },
    {
      role: "Software Engineer",
      company: "HSBC GLT",
      duration: "Sept 2011 - Dec 2013",
      description:
        "Contributed to the Barracuda trading platform, collaborating with clients in the UK and US, implementing DFA requirements, and integrating with financial systems like DTCC and MarkitWire.",
    },
    {
      role: "Software Engineer",
      company: "High Mark Credit Information Services",
      duration: "Mar 2010 - Sept 2011",
      description:
        "Developed Java and J2EE applications using Struts, Spring, and Hibernate. Worked on Credit Bureau reports like Overlap report and Incidence High Default (IHD) report.",
    },
  ],
  projects: [
    {
      name: "Sign Language Recognition using Neural Network",
      company: "IISC Bangalore",
      duration: "2 months",
      role: "Neural Network Designer",
      responsibilities:
        "Designed a time series neural network using LSTM for Indian Sign Language translation, targeting improved communication for those with speaking and hearing impairments.",
      technologies: ["Tensorflow", "Python", "Spark"],
    },
    {
      name: "Feed and Adjustment Workstation",
      company: "Deutsche Bank India",
      duration: "1 year",
      role: "Software Engineer",
      responsibilities:
        "Worked on understanding the application from the vendor, fixing defects, and implementing new functionality for legal entity adjustments.",
      technologies: ["Hazelcast", "MongoDB", "REST", "Java", "J2EE", "Spring", "JavaScript"],
    },
    {
      name: "Accounting Subledger/SPE Accounting",
      company: "Deutsche Bank India",
      duration: "1.8 years",
      role: "Java Developer",
      responsibilities:
        "Upgraded an on-premise application to a cloud platform, migrated from JDK4 to JDK7, and resolved security vulnerabilities.",
      technologies: ["WebSSO", "Struts2", "Oracle", "JavaScript"],
    },
    {
      name: "Global Securities Infrastructure (GSI)",
      company: "Cognizant",
      duration: "1.5 years",
      role: "Associate Projects",
      responsibilities:
        "Implemented requirements, maintained code quality using PMD, Checkstyle, and FindBugs.",
      technologies: ["Java", "JPA", "EJB 3.0", "Oracle", "JavaScript"],
    },
    {
      name: "Barracuda",
      company: "HSBC GLT",
      duration: "1.6 years",
      role: "Software Engineer",
      responsibilities:
        "Communicated with clients in the UK and US, implemented DFA requirements, maintained code quality using SONAR, Junits, and JBehave.",
      technologies: ["Java", "Hibernate", "Spring", "Berkeley DB", "Jess", "JavaScript"],
    },
    {
      name: "HSBC Smart Client Framework (HSCF)",
      company: "HSBC GLT",
      duration: "4 months",
      role: "Software Engineer",
      responsibilities:
        "Maintained code in Java and .NET, communicated with clients, and implemented changes under strict deadlines.",
      technologies: ["Java", "Hibernate", "Spring", ".NET"],
    },
  ],
  skills: [
    "Java",
    "Python",
    "TensorFlow",
    "PyTorch",
    "AWS Lambda",
    "Firebase Cloud Functions",
    "Amazon Skill Development",
    "Google Actions Development",
    "Node.js",
    "Angular",
    "Spring",
    "Hibernate",
    "JavaScript",
    "Unix",
    "Maven",
    "Arduino",
    "Raspberry Pi",
  ],
  certifications: [
    "PG Certification in Computational Data Science (CDS) - IISc, Bangalore (2024)",
    "Diploma in Advanced Computing (DAC) - ACTS, Pune (2007)",
    "BE (Electronics) - Pune University, VIT College (2001-2006)",
  ],
  hobbies: [
    "Reading books",
    "Swimming",
    "Exploring astrophysics info",
    "Posting on Stack Overflow (username: Xinus)",
    "Writing blog posts on https://spsarolkar.github.io/",
  ],
  trekkingImages: [
    "/background/Kuari_pass_mountains_background.jpg",
    "/background/AMK_selfie.jpg",
    "/background/Torna_damview.jpg",
    "/background/AMK_Valley.jpg",
    "/background/AMK.jpg",
    "/background/Kokan_Kada_Harishchandra.jpg",
    "/background/AMK_Pose.jpg",
    "/background/AMK_looking_mountains.jpg",
    "/background/KuariPass.jpg",
    "/background/Torna_wall.jpg",
    "/background/Torna-Dam-View.jpg",
    "/background/Torna-wide.jpg",
  ],
};
const allSkills = [...new Set(profile.skills.flatMap((skill) => skill.split(", ")))];

export default function Profile() {
  const svgFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%230072ff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial, sans-serif">SS</text></svg>`;

  return (
    <>
    {/* <Head>
        <link rel="icon" href={svgFavicon} />
        <title>Sunil Sarolkar | Profile</title>
      </Head> */}
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 font-sans relative">
        {/* Fixed Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Sunil Sarolkar</div>
            <ul className="flex space-x-6">
              <li><a href="#objective" className="hover:text-blue-500">Objective</a></li>
              <li><a href="#opensourcecontributions" className="hover:text-blue-500">Contributions</a></li>
              <li><a href="#experience" className="hover:text-blue-500">Experience</a></li>
              <li><a href="#certifications" className="hover:text-blue-500">Certifications</a></li>
              <li><a href="#skills" className="hover:text-blue-500">Skills</a></li>
              <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
              <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
        </nav>

        {/* Parallax Images */}
        <div className="absolute top-0 left-0 h-full w-1/5 flex flex-col justify-evenly gap-5 z-0">
          {profile.trekkingImages
            .slice(0, Math.ceil(profile.trekkingImages.length / 2))
            .map((img, index) => (
              <Parallax key={index} speed={30}>
                <img src={img} alt={`Trekking Adventure ${index + 1}`} className="w-full h-60 object-cover rounded-lg shadow-md" />
              </Parallax>
            ))}
        </div>
        <div className="absolute top-0 right-0 h-full w-1/5 flex flex-col justify-evenly gap-5 z-0">
          {profile.trekkingImages
            .slice(Math.ceil(profile.trekkingImages.length / 2))
            .map((img, index) => (
              <Parallax key={index} speed={30}>
                <img src={img} alt={`Trekking Adventure ${index + 1 + Math.ceil(profile.trekkingImages.length / 2)}`} className="w-full h-60 object-cover rounded-lg shadow-md" />
              </Parallax>
            ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
          {/* Hero Section */}
          <section id="contact" className="text-center mb-16">
            <motion.h1 className="text-5xl font-extrabold mb-3" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {profile.name}
            </motion.h1>
            <p className="text-lg mb-6">{profile.location}</p>
            <div className="flex justify-center space-x-6">
              <a href={`mailto:${profile.email}`} className="text-blue-500 hover:text-blue-700 underline">
                {profile.email}
              </a>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                Visit Website
              </a>
            </div>
          </section>

          

          {/* Objective Section */}
          <section id="objective" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-4">Objective</h2>
            <p className="text-gray-700 text-lg">{profile.objective}</p>
          </section>
          
            <Badges />
     
          {/* Experience Section */}
          <section id="experience" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              {profile.experience.map((job, index) => (
                <motion.div key={index} className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold">
                    {job.role} - {job.company}
                  </h3>
                  <p className="text-gray-600">{job.duration}</p>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                  <p className="text-center text-gray-800">{cert}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Opensource Contributions Section */}
          <section id="opensourcecontributions" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Opensource Contributions</h2>
            <motion.div className="flex flex-wrap justify-center gap-6" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 hover:shadow-xl transition">
                <img className="w-full h-48 object-cover" src="/projects/ISL-Thumbnail.png" alt="Sign language translation project" />
                <div className="px-6 py-4">
                  <Link href="/projects/ISL-IndianSignLanguageTranslation">
                    <div className="font-bold text-xl mb-2 hover:text-blue-500 transition">Indian Sign Language Translation</div>
                  </Link>
                  <p className="text-gray-700 text-base">
                    Implementing the sign language translation feature for Indian Sign Language (ISL) using LSTM and Position models.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#signlanguage</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#translation</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#isl</span>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 hover:shadow-xl transition">
                <img className="w-full h-48 object-cover" src="/projects/syntax_heighlighting/syntax_heighlighte.png" alt="Rouge Theme Preview" />
                <div className="px-6 py-4">
                  <Link href="https://spsarolkar.github.io/rouge-theme-preview/">
                    <div className="font-bold text-xl mb-2 hover:text-blue-500 transition">Rouge Theme Preview Page</div>
                  </Link>
                  <p className="text-gray-700 text-base">A simple application for previewing syntax highlighting using Rouge.</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#syntaxheighlighter</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#rouge</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#github</span>
                </div>
              </div>
            </motion.div>
          </section>

          <SkillsAndProjects profile={profile} />
        </div>


      </div>
    </ParallaxProvider>
    </>
  );
}

interface Project {
  name: string;
  company: string;
  duration: string;
  role: string;
  responsibilities: string;
  technologies: string[];
}

const SkillsAndProjects = ({ profile }: { profile: { projects: Project[]; skills: string[] } }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredProjects =
    selectedSkills.length > 0
      ? profile.projects.filter((project: Project) =>
          selectedSkills.some((skill) =>
            project.technologies.some((tech) => skill.toLowerCase() === tech.toLowerCase())
          )
        )
      : profile.projects;

  return (
    <>
      <section id="skills" className="bg-white text-gray-800 p-10 shadow-lg max-w-6xl mx-auto relative z-10 rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {allSkills.map((skill, index) => (
            <motion.span
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm cursor-pointer transition ${
                selectedSkills.includes(skill) ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-white text-gray-800 p-10 shadow-lg max-w-6xl mx-auto relative z-10 rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <motion.div layout className="space-y-6">
          {filteredProjects.map((project, index) => (
            <motion.div key={index} layout className="p-5 bg-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">{project.name}</h3>
              <p className="text-lg text-gray-600">
                {project.company} | {project.duration}
              </p>
              <p className="text-md text-gray-700 mt-2">
                <strong>Role:</strong> {project.role}
              </p>
              <p className="text-md text-gray-700 mt-1">
                <strong>Responsibilities:</strong> {project.responsibilities}
              </p>
              <p className="text-md text-gray-700 mt-1">
                <strong>Technologies Used:</strong> {project.technologies.join(", ")}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};
