import React from 'react';
import ProjectDemo from './components/ProjectDemo';

const ApplyingTransformer = () => {
    const projectDetails = {
        title: "Applying Transformer to Sign Language Translation",
        description: "This project demonstrates the application of transformer models to improve the accuracy of sign language translation.",
        technologies: ["Transformers", "Machine Learning", "Natural Language Processing"],
        challenges: "Integrating transformer models with existing sign language datasets and ensuring real-time translation.",
        outcomes: "Enhanced translation accuracy and better user experience for sign language users.",
        demoLink: "https://example.com/sign-language-translation-demo",
        image: "/path/to/image.jpg" // Replace with actual image path
    };

    return (
        <div>
            <h1>{projectDetails.title}</h1>
            <ProjectDemo 
                title={projectDetails.title}
                description={projectDetails.description}
                technologies={projectDetails.technologies}
                challenges={projectDetails.challenges}
                outcomes={projectDetails.outcomes}
                link='/projects/applying-transformer'
            />
        </div>
    );
};

export default ApplyingTransformer;