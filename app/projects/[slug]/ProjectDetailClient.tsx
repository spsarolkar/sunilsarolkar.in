"use client";
import React from 'react';
import Header from "../../header";
import Image from 'next/image';
import Link from 'next/link';

interface Project {
    slug: string;
    title: string;
    category?: string;
    img?: string;
    content?: string;
    description: string;
    tech_stack?: string[];
    externalLink?: string;
}

export default function ProjectDetailClient({ project }: { project: Project }) {
    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <Header title={project.title} subtitle={project.category || "Project"} />

            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                {project.img && (
                    <Image
                        src={project.img}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="w-full object-cover"
                        style={{ maxHeight: '400px' }}
                    />
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <div className="prose max-w-none text-gray-800">
                        {project.content ? (
                            <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }} />
                        ) : (
                            <p>{project.description}</p>
                        )}
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 pb-2 border-b">Project Details</h3>

                        {project.tech_stack && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-2">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map((tech, idx) => (
                                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.externalLink && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Links</h4>
                                <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
                                    <i className="fas fa-external-link-alt"></i> View Project / Demo
                                </a>
                            </div>
                        )}

                        <div className="mt-6 pt-4 border-t">
                            <Link href="/projects" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                <i className="fas fa-arrow-left"></i> Back to Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
