import Image from "next/image";
import Link from "next/link";
import RootLayout from './layout';
import Header from "./header";
import Mymenu from "./mymenu";

export default function Home() {
  return (
<div>


<Mymenu />
<Header title="Profile" subtitle="" ></Header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        {/* Replace with actual image path */}
        <Image 
          src="/images/profile-picture.jpg" 
          alt="Sunil Sarolkar" 
          width={300} 
          height={300} 
          className="rounded-full" 
        />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Sunil Sarolkar</h1>
        <p className="text-gray-600">
          Software Engineer with 13+ years of experience in Java and related technologies. 
          Passionate about building scalable and maintainable applications. 
          Currently exploring the exciting world of Data Science and AI. [cite: 2, 3, 4]
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              **Software Engineer** at Deutsche Bank, Pune, India (July 2015 - Present) [cite: 4, 5, 6]
            </li>
            <li>
              **Software Engineer** at Cognizant Technology Solutions Pvt. Ltd., Pune, India (Dec 2013 - July 2015) [cite: 6, 7]
            </li>
            <li>
              **Software Engineer** at HSBC GLT, Pune, India (Sept 2011 - Dec 2013) [cite: 8, 9]
            </li>
            <li>
              **Software Engineer** at High Mark Credit Information Services Pvt. Ltd., Pune, India (Mar 2010 - Sept 2011) [cite: 9, 10]
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Education</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              **PG Certification in Computational Data Science (CDS)**, IISc, Bangalore (2024) [cite: 10, 11]
            </li>
            <li>
              **Diploma in Advanced Computing (DAC)**, ACTS, Pune (2007) [cite: 11]
            </li>
            <li>
              **BE (Electronics)**, Pune University, VIT College, Pune (2001-2006) [cite: 11]
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['Tensorflow', 'Pytorch', 'Python', 'AWS Lambda', 'Firebase Cloud functions', 
              'Amazon Skill development', 'Google Actions Development', 'Node JS', 'Angular', 
              'Java', 'Spring', 'Hibernate', 'Javascript', 'Unix', 'Maven', 'Arduino', 
              'Raspberry PI'].map((skill) => (
              <span key={skill} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Hobbies</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Reading books</li>
            <li>Swimming</li>
            <li>Exploring astrophysics information</li> [cite: 11]
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Links</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <a href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">
                Personal Website
              </a>
            </li>
            <li>
              <a href="https://stackoverflow.com/users/your_stackoverflow_id" target="_blank" rel="noopener noreferrer">
                Stack Overflow Profile (Replace with your Stack Overflow ID)
              </a> [cite: 12]
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Data Science Projects</h2>
          <ul className="list-disc list-inside text-gray-700">

            <li>
              <a href="https://stackoverflow.com/users/your_stackoverflow_id" target="_blank" rel="noopener noreferrer">
              Project 1: Predictive Analytics for Sales Forecasting
              </a> 
            </li>
            <li>
              <a href="https://stackoverflow.com/users/your_stackoverflow_id" target="_blank" rel="noopener noreferrer">
              Project 2: Customer Segmentation using Machine Learning
              </a> 
            </li>
            <li>
              <a href="https://stackoverflow.com/users/your_stackoverflow_id" target="_blank" rel="noopener noreferrer">
              Project 3: Sentiment Analysis of Social Media Data
              </a> 
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>
  );
}
