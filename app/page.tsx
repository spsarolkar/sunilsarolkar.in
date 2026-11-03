"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Badges from "./Badges";
import { Head } from "next/document";

import cvData from "@/app/_data/cv.json";
import skillsData from "@/app/_data/skills.json";
import projectsData from "@/app/_data/projects.json";

const profile = {
  name: "Sunil Sarolkar",
  location: "Pune, Maharashtra, India",
  email: "sunil.sarolkar@gmail.com",
  website: "https://spsarolkar.github.io/",
  objective:
    "To secure a challenging position in an esteemed organization, leveraging my skills in organizational development, with a strong focus on continuous learning and innovation.",
  experience: cvData.professionalExperience,
  projects: projectsData,
  skills: skillsData,
  certifications: cvData.education, // Using education data which includes certifications
  internalRecognition: cvData.internalRecognition, // Added Internal Recognition
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

const allSkills = [...new Set(skillsData.flatMap((cat) => cat.items.map((item) => item.name)))];

export default function Profile() {
  return (
    <>
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
              <li><a href="#internal-recognition" className="hover:text-blue-500">Recognition</a></li>
              <li><a href="#skills" className="hover:text-blue-500">Skills</a></li>
              <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
              <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
        </nav>

        {/* Fixed Film Reel Style Images */}
        <div className="fixed top-0 left-0 w-1/5 h-screen z-0 hidden md:block overflow-hidden">
          <FilmStrip
            images={profile.trekkingImages.slice(0, Math.ceil(profile.trekkingImages.length / 2))}
            className="w-full"
          />
        </div>
        <div className="fixed top-0 right-0 w-1/5 h-screen z-0 hidden md:block overflow-hidden">
          <FilmStrip
            images={profile.trekkingImages.slice(Math.ceil(profile.trekkingImages.length / 2))}
            className="w-full"
          />
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
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{job.year}</span>
                  </div>
                  <div className="text-xl text-blue-600 mb-2">{job.institution}</div>
                  <div className="text-gray-700 mt-2 space-y-2">
                    {Array.isArray(job.description) ? (
                      job.description.map((desc, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                      ))
                    ) : (
                      <p>{job.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Certifications & Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                  {cert.logo && (
                    <div className="flex-shrink-0 mr-4">
                      <img src={cert.logo} alt={cert.institution} className="w-16 h-16 object-contain" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{cert.title}</h3>
                    <p className="text-gray-600">{cert.institution}</p>
                    <p className="text-sm text-gray-500">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Recognition Section */}
          <section id="internal-recognition" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Internal Recognition</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {profile.internalRecognition?.map((badge, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 hover:shadow-lg rounded-xl transition duration-300">
                  <img src={badge.image} alt={badge.name} className="h-24 object-contain mb-3" />
                  <h3 className="text-sm font-semibold text-gray-700">{badge.name}</h3>
                  <p className="text-xs text-gray-500">{badge.issuer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Opensource Contributions Section */}
          <section id="opensourcecontributions" className="bg-white p-10 shadow-lg rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Opensource Contributions</h2>
            <motion.div className="flex flex-wrap justify-center gap-6" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Project 1: ISL */}
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
              {/* Project 2: StructFormer */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 hover:shadow-xl transition">
                <img className="w-full h-48 object-cover" src="/assets/projects/StructFormer/Structformer_Thumbnail.png" alt="StructFormer" />
                <div className="px-6 py-4">
                  <Link href="/projects/structformer">
                    <div className="font-bold text-xl mb-2 hover:text-blue-500 transition">StructFormer</div>
                  </Link>
                  <p className="text-gray-700 text-base">
                    Transformer-based model built to automate structured data transformation.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Python</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#TensorFlow</span>
                </div>
              </div>
            </motion.div>
          </section>

          <SkillsAndProjects profile={profile} />
        </div>
      </div>
    </>
  );
}

interface Project {
  title: string;
  description: string;
  img: string;
  importance: number;
  category: string;
  tech_stack?: string[];
  slug: string;
  content?: string;
  externalLink?: string;
}

interface InternalBadge {
  name: string;
  issuer: string;
  image: string;
}

interface SkillItem {
  name: string;
  icon: string;
  level: number;
}
interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  items: SkillItem[];
}

const SkillsAndProjects = ({ profile }: { profile: any }) => {
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
          project.tech_stack?.some((tech) => skill.toLowerCase() === tech.toLowerCase())
        )
      )
      : profile.projects;

  return (
    <>
      <section id="skills" className="bg-white text-gray-800 p-10 shadow-lg max-w-6xl mx-auto relative z-10 rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.skills.map((category: SkillCategory, idx: number) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4 border-b pb-2">
                <i className={`${category.icon} text-2xl mr-3`} style={{ color: category.color }}></i>
                <h3 className="text-xl font-semibold text-gray-700">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col items-center group cursor-pointer" onClick={() => toggleSkill(skill.name)}>
                    <div className={`w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100 ${selectedSkills.includes(skill.name) ? 'ring-2 ring-blue-500' : ''}`}>
                      <i className={`${skill.icon} text-2xl`}></i>
                    </div>
                    <span className="text-xs mt-1 text-gray-600 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-white text-gray-800 p-10 shadow-lg max-w-6xl mx-auto relative z-10 rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <motion.div layout className="space-y-6">
          {filteredProjects.map((project: Project, index: number) => (
            <motion.div key={index} layout className="p-5 bg-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-lg text-gray-600">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project
              </p>
              <p className="text-md text-gray-700 mt-2">
                {project.content}
              </p>
              <p className="text-md text-gray-700 mt-1">
                <strong>Technologies Used:</strong> {project.tech_stack?.join(", ")}
              </p>
              {project.externalLink ? (
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline mt-2 block">
                  View Project
                </a>
              ) : (
                <Link href={`/projects/${project.slug}`} className="text-blue-500 hover:text-blue-700 underline mt-2 block">
                  View Details
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

interface FilmStripProps {
  images: string[];
  speed?: number;
  className?: string;
}

const FilmStrip: React.FC<FilmStripProps> = ({ images, className }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Duplicate images to create a seamless loop effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className={`h-full ${className}`}>
      <motion.div style={{ y }} className="flex flex-col bg-black py-4 border-x-[6px] border-black relative">
        {/* Sprocket Holes Left */}
        <div className="absolute left-0 top-0 bottom-0 w-[12px] border-r-2 border-dashed border-gray-600 opacity-50 z-10"></div>
        {/* Sprocket Holes Right */}
        <div className="absolute right-0 top-0 bottom-0 w-[12px] border-l-2 border-dashed border-gray-600 opacity-50 z-10"></div>

        {duplicatedImages.map((img, index) => (
          <div key={index} className="px-4 py-4">
            <div className="bg-black p-1 border border-gray-800 shadow-xl">
              <img src={img} alt={`Film Frame ${index}`} className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition duration-500 ease-in-out" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
