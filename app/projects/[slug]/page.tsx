import React from 'react';
import projectsData from '../../_data/projects.json';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import type { Metadata } from 'next';
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.find((item) => item.slug === slug);
    return { title: project?.title ?? 'Project not found', description: project?.description };
}
export async function generateStaticParams() {
    // Literal project pages own these paths. Generating them here can overwrite
    // their prerendered HTML with the generic summary during a production build.
    const dedicatedSlugs = new Set(['ISL-IndianSignLanguageTranslation', 'vehicle-telemetry']);
    return projectsData
        .filter((project) => !dedicatedSlugs.has(project.slug))
        .map((project) => ({ slug: project.slug }));
}
export default async function ProjectDetail({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug);
    if (!project) {
        return notFound();
    }
    return <ProjectDetailClient project={project}/>;
}
