import React from 'react';
import ProjectDemo from './ISL-IndianSignLanguageTranslation/components/ProjectDemo';

const SignLanguageTranslation = () => {
    const projectDetails = {
        title: "Sign Language Translation for Indian Sign Language",
        description: "This project focuses on translating spoken language into Indian Sign Language using advanced machine learning techniques.",
        technologies: ["Machine Learning", "Natural Language Processing", "Sign Language Recognition"],
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
                link={projectDetails.demoLink}
            />
        </div>
    );
};

export default SignLanguageTranslation;