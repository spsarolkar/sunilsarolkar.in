import React from 'react';
import projectsData from '../../_data/projects.json';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetailClient project={project} />;
}
