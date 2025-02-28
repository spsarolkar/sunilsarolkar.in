"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Mymenu from "./mymenu";

const profile = {
  name: "Sunil Sarolkar",
  location: "Pune, Maharashtra, India",
  email: "spsarolkar@gmail.com",
  website: "https://spsarolkar.github.io/",
  objective: "To secure a challenging position in an esteemed organization, leveraging my skills in organizational development, with a strong focus on continuous learning and innovation.",
  experience: [
    {
      role: "Software Engineer", 
      company: "Deutsche Bank", 
      duration: "July 2015 - Present",
      description: "Implemented business logic for new functionalities, fixed security vulnerabilities, migrated platform to cloud hosting, and integrated OAuth authentication. Worked on projects like Feed and Adjustment Workstation and Accounting Subledger."
    },
    { 
      role: "Software Engineer", 
      company: "Cognizant Technology Solutions",
      duration: "Dec 2013 - July 2015",
      description: "Developed TestSuite using JUnit for end-to-end testing of Position Management applications. Contributed to Global Securities Infrastructure (GSI), ensuring code quality and maintaining stock and cash positions."
    },
    { 
      role: "Software Engineer", 
      company: "HSBC GLT", 
      duration: "Sept 2011 - Dec 2013",
      description: "Contributed to the Barracuda trading platform, collaborating with clients in the UK and US, implementing DFA requirements, and integrating with financial systems like DTCC and MarkitWire."
    },
    { 
      role: "Software Engineer", 
      company: "High Mark Credit Information Services", 
      duration: "Mar 2010 - Sept 2011",
      description: "Developed Java and J2EE applications using Struts, Spring, and Hibernate. Worked on Credit Bureau reports like Overlap report and Incidence High Default (IHD) report."
    }
  ],
  projects: [
    {
      name: "Sign Language Recognition using Neural Network",
      company: "IISC Bangalore",
      duration: "2 months",
      role: "Neural Network Designer",
      responsibilities: "Designed a time series neural network using LSTM for Indian Sign Language translation, targeting improved communication for those with speaking and hearing impairments.",
      technologies: ["Tensorflow", "Python", "Spark"]
    },
    {
      name: "Feed and Adjustment Workstation",
      company: "Deutsche Bank India",
      duration: "1 year",
      role: "Software Engineer",
      responsibilities: "Worked on understanding the application from the vendor, fixing defects, and implementing new functionality for legal entity adjustments.",
      technologies: ["Hazelcast", "MongoDB", "REST", "Java", "J2EE", "Spring","JavaScript"]
    },
    {
      name: "Accounting Subledger/SPE Accounting",
      company: "Deutsche Bank India",
      duration: "1.8 years",
      role: "Java Developer",
      responsibilities: "Upgraded an on-premise application to a cloud platform, migrated from JDK4 to JDK7, and resolved security vulnerabilities.",
      technologies: ["WebSSO", "Struts2", "Oracle","JavaScript"]
    },
    {
      name: "Global Securities Infrastructure (GSI)",
      company: "Cognizant",
      duration: "1.5 years",
      role: "Associate Projects",
      responsibilities: "Implemented requirements, maintained code quality using PMD, Checkstyle, and FindBugs.",
      technologies: ["Java", "JPA", "EJB 3.0", "Oracle","JavaScript"]
    },
    {
      name: "Barracuda",
      company: "HSBC GLT",
      duration: "1.6 years",
      role: "Software Engineer",
      responsibilities: "Communicated with clients in the UK and US, implemented DFA requirements, maintained code quality using SONAR, Junits, and JBehave.",
      technologies: ["Java", "Hibernate", "Spring", "Berkeley DB", "Jess","JavaScript"]
    },
    {
      name: "HSBC Smart Client Framework (HSCF)",
      company: "HSBC GLT",
      duration: "4 months",
      role: "Software Engineer",
      responsibilities: "Maintained code in Java and .NET, communicated with clients, and implemented changes under strict deadlines.",
      technologies: ["Java", "Hibernate", "Spring", ".NET"]
    }
  ],
  skills: [
    "Java", "Python", "TensorFlow", "PyTorch", "AWS Lambda", "Firebase Cloud Functions", "Amazon Skill Development", "Google Actions Development", 
    "Node.js", "Angular", "Spring", "Hibernate", "JavaScript", "Unix", "Maven", "Arduino", "Raspberry Pi"
  ],
  certifications: [
    "PG Certification in Computational Data Science (CDS) - IISc, Bangalore (2024)",
    "Diploma in Advanced Computing (DAC) - ACTS, Pune (2007)",
    "BE (Electronics) - Pune University, VIT College (2001-2006)"
  ],
  hobbies: [
    "Reading books", "Swimming", "Exploring astrophysics info", "Posting on Stack Overflow (username: Xinus)", "Writing blog posts on https://spsarolkar.github.io/"
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
    "/background/Torna-wide.jpg"
  ]
};
const allSkills = [...new Set(profile.skills.flatMap(skill => skill.split(', ')))]

export default function Profile() {

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    const googleCloudCertificate = document.createElement('script');

    googleCloudCertificate.src = '//cdn.credly.com/assets/utilities/embed.js';
    googleCloudCertificate.async = true;
    googleCloudCertificate.defer = true;

    document.body.appendChild(googleCloudCertificate);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(googleCloudCertificate);
    };
  }, []);

  return (
    <ParallaxProvider>
      
      <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen text-gray-800 font-sans relative">
      <nav className="fixed top-0 left-0 right-0 bg-transparent shadow-md z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <ul className="flex space-x-6">
                <li><a href="#objective" className="hover:text-blue-500 transition">Objective</a></li>
                <li><a href="#opensourcecontributions" className="hover:text-blue-500 transition">Opensource contributions</a></li>
                <li><a href="#experience" className="hover:text-blue-500 transition">Experience</a></li>
                <li><a href="#skills" className="hover:text-blue-500 transition">Skills</a></li>
                <li><a href="#projects" className="hover:text-blue-500 transition">Projects</a></li>
                <li><a href="#contact" className="hover:text-blue-500 transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
        


        {/* Hero Section */}
        <section id="contact" className="text-center p-20 relative z-10">
          <motion.h1 
            className="text-5xl font-extrabold mb-3 text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {profile.name}
          </motion.h1>
          <p className="text-lg mb-5">{profile.location}</p>
          <a 
            href={`mailto:${profile.email}`}
            className="text-blue-500 hover:text-blue-700 underline transition duration-300 mr-4"
          >
            {profile.email}
          </a>
          <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline transition duration-300"
            >
              Visit Website
            </a>
        </section>



        {/* Parallax Images on Left and Right */}
        
        <div className="absolute top-0 left-0 h-full w-1/5 flex flex-col justify-evenly gap-5">
          {profile.trekkingImages.slice(0, profile.trekkingImages.length / 2).map((img, index) => (            
            <Parallax key={index} speed={30} className="my-10">              
              <img src={img} alt={`Trekking Adventure ${index + 1}`} className="rounded-lg shadow-lg w-full h-60 object-cover" />
            </Parallax>
          ))}
        </div>

        <div className="absolute top-0 right-0 h-full w-1/5 flex flex-col justify-evenly gap-5">
          {profile.trekkingImages.slice(profile.trekkingImages.length / 2).map((img, index) => (
            <Parallax key={index} speed={30} className="my-10">
              <img src={img} alt={`Trekking Adventure ${index + 4}`}  className="rounded-lg shadow-lg w-full h-60 object-cover" />
            </Parallax>
          ))}
        </div>

        <section id="linkedin" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-center">
              <div id="linkedin-badge" className="w-[255px] h-[256px]">
                <div className="badge-base LI-profile-badge w-255px h-256px" 
                    data-locale="en_US" 
                    data-size="medium" 
                    data-theme="light" 
                    data-type="VERTICAL" 
                    data-vanity="sunil-sarolkar-451b2023" 
                    data-version="v1">
                  <a className="badge-base__link LI-simple-link w-255px h-256px"
                    href="https://in.linkedin.com/in/sunil-sarolkar-451b2023?trk=profile-badge">
                  </a>
                </div>
              </div>
              <div id="googlecloud-badge" className="w-[255px] h-[256px]"><div data-iframe-width="265" data-iframe-height="265" data-share-badge-id="97997fd6-bd29-4f49-8e39-4741f3ca0719" data-share-badge-host="https://www.credly.com"></div></div>
          </div>
        </section>


        
        

                {/* Objective Section */}
        <section id="objective" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-6">Objective</h2>
          <p className="text-gray-700">
            {profile.objective}
          </p>
        </section>

        {/* Resume Section */}
        <section id="experience" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10 mt-10">
          <h2 className="text-3xl font-bold mb-6">Experience</h2>
          <div className="space-y-4">
            {profile.experience.map((job, index) => (
              <motion.div key={index} className="p-5 bg-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold">{job.role} - {job.company}</h3>
                <p className="text-gray-600">{job.duration}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="opensourcecontributions" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10 mt-10">
          {/* <motion.h1 
            className="text-5xl font-extrabold mb-3 text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          > */}
          <h2 className="text-3xl font-bold mb-6">Opensource Contributions</h2>
          <motion.div className="flex" initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
              <div className="max-w-sm m-5 rounded overflow-hidden shadow-lg">
              <img className="w-full h-[200px]" src="/projects/ISL-Thumbnail.png" alt="Sign language translation project" />
              <div className="px-6 py-4">
              <Link href="/projects/ISL-IndianSignLanguageTranslation"><div className="font-bold text-xl mb-2">Indian Sign Language Translation</div></Link>
                <p className="text-gray-700 text-base">Implementing the sign language translation feature for Indian Sign Language(ISL), using LSTM and Position models</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#signlanguage</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#translation</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#isl</span>
              </div>
            </div>
            <div className="max-w-sm m-5 rounded overflow-hidden shadow-lg">
              <img className="w-full h-[200px]" src="/projects/syntax_heighlighting/syntax_heighlighte.png" alt="Sign language translation project" />
              <div className="px-6 py-4">
              <Link href="https://spsarolkar.github.io/rouge-theme-preview/"><div className="font-bold text-xl mb-2">Rouge Theme Preview Page</div></Link>
                <p className="text-gray-700 text-base">This is a simple application created using Github pages for preview of Syntax heighlighting using Rouge syntax heighlighter</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#syntaxheighlighter</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#rouge</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#github</span>
              </div>
            </div>
            
          </motion.div>
            
          {/* </motion.h1> */}
          
        </section>

<SkillsAndProjects profile={profile} />
      </div>
    </ParallaxProvider>
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

const SkillsAndProjects = ({ profile }: { profile: { projects: Project[]; skills: string[]; } }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filteredProjects = selectedSkills.length > 0
    ? profile.projects.filter((project: Project) => {
        return selectedSkills.some(skill =>
          project.technologies.some((tech) =>
            selectedSkills.some((skill) =>
              skill.toLowerCase() === tech.toLowerCase()
            )
         ));
        
}
)
    : profile.projects;

  return (
    <>
      <section id="skills" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10 rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {allSkills.map((skill, index) => (
            <motion.span
              key={index} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-blue-700 transition cursor-pointer ${
                selectedSkills.includes(skill)
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              }`} whileHover={{ scale: 1.1 }} onClick={() => toggleSkill(skill)}>


              {skill}
            </motion.span>
          ))}
        </div>
      </section>

        <section id="projects" className="bg-white text-gray-800 p-10 shadow-lg max-w-4xl mx-auto relative z-10 mt-10">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <motion.div
            layout
            className="space-y-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={index} className="p-5 bg-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold">{project.name}</h3>
                <p className="text-lg text-gray-600">{project.company} | {project.duration}</p>
                <p className="text-md text-gray-700 mt-2"><strong>Role:</strong> {project.role}</p>
                <p className="text-md text-gray-700 mt-1"><strong>Responsibilities:</strong> {project.responsibilities}</p>
                <p className="text-md text-gray-700 mt-1"><strong>Technologies Used:</strong> {project.technologies.join(', ')}</p>
              </motion.div>
            ))}</motion.div>
        </section>
    </>
  );
};


