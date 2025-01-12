import React from 'react';
import ProjectDemo from './ISL-IndianSignLanguageTranslation/components/ProjectDemo';

const GeneratingJunits = () => {
    const projectDetails = {
        title: "Generating JUnits for Code using Langchain",
        description: "This project demonstrates how to generate JUnit tests for code using Langchain. It showcases the integration of AI in automating test case generation.",
        technologies: ["Langchain", "Java", "JUnit"],
        imageUrl: "/path/to/image.jpg", // Replace with actual image path
        githubLink: "https://github.com/your-repo/generating-junits", // Replace with actual GitHub link
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

export default GeneratingJunits;