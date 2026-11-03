import React from 'react';
import Header from "../header";
import Image from 'next/image';
import cvData from '../_data/cv.json';

const CvPage = () => {
    const { generalInformation, professionalExperience, education, openSourceProjects, honorsAndAwards, interests } = cvData;

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <Header title="Curriculum Vitae" subtitle="Resume" />

            {/* General Information */}
            <section className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">General Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600 font-semibold">Full Name</p>
                        <p className="text-gray-800">{generalInformation.fullName}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Role</p>
                        <p className="text-gray-800">{generalInformation.role}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Location</p>
                        <p className="text-gray-800">{generalInformation.location}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Languages</p>
                        <p className="text-gray-800">{generalInformation.languages}</p>
                    </div>
                </div>
            </section>

            {/* Professional Experience */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Professional Experience</h2>
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                    {professionalExperience.map((exp, idx) => (
                        <div key={idx} className="mb-8 ml-6">
                            <span className="absolute -left-2.5 mt-1.5 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></span>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                                        {exp.year}
                                    </span>
                                </div>
                                <h4 className="text-lg text-gray-600 mb-4">{exp.institution}</h4>
                                <div className="text-gray-700 text-justify space-y-2">
                                    {exp.description.map((desc, dIdx) => (
                                        <div key={dIdx} dangerouslySetInnerHTML={{ __html: desc }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Education</h2>
                <div className="space-y-6">
                    {education.map((edu, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-start">
                            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                                {edu.logo && (
                                    <Image
                                        src={edu.logo}
                                        alt={edu.institution}
                                        width={60}
                                        height={60}
                                        style={{ maxHeight: '60px', width: 'auto' }}
                                    />
                                )}
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <h3 className="text-lg font-bold text-gray-800">{edu.title}</h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">{edu.year}</span>
                                </div>
                                <p className="text-gray-600 font-medium">{edu.institution}</p>
                                {edu.description && (
                                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                                        {edu.description.map((desc, dIdx) => (
                                            <p key={dIdx} dangerouslySetInnerHTML={{ __html: desc }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Source Projects */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Open Source Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {openSourceProjects.map((proj, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-gray-800" dangerouslySetInnerHTML={{ __html: proj.title }}></h3>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{proj.year}</span>
                            </div>
                            <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: proj.description }}></p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Honors and Awards */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Honors and Awards</h2>
                <div className="space-y-4">
                    {honorsAndAwards.map((awardGroup, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-20 font-bold text-gray-500 pt-1">{awardGroup.year}</div>
                            <div className="flex-grow space-y-2">
                                {awardGroup.items.map((item, iIdx) => (
                                    <div key={iIdx} className="bg-white p-3 rounded shadow-sm border border-gray-100 text-gray-700" dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interests */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Interests</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {interests.map((interest, idx) => (
                            <li key={idx} dangerouslySetInnerHTML={{ __html: interest }} />
                        ))}
                    </ul>
                </div>
            </section>

        </div>
    );
};

export default CvPage;
