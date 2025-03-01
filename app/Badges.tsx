"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';

const Badges = () => {
  useEffect(() => {
        //   const script = document.createElement("script");
        //   script.src = "https://platform.linkedin.com/badges/js/profile.js";
        //   script.async = true;
        //   script.defer = true;
        //   document.body.appendChild(script);
  
          const googleCloudCertificate = document.createElement("script");
          googleCloudCertificate.src = "//cdn.credly.com/assets/utilities/embed.js";
          googleCloudCertificate.async = true;
          googleCloudCertificate.defer = true;
          document.body.appendChild(googleCloudCertificate);
  
          return () => {
            //   document.body.removeChild(script);
              document.body.removeChild(googleCloudCertificate);
          };
      }, []);
    return (
      <div>
        {/* LinkedIn & Certificates Section */}
       <section id="linkedin-certifications" className="bg-white p-10 shadow-lg rounded-lg mb-16">
              <h2 className="text-3xl font-semibold text-center mb-6">LinkedIn & Certifications</h2>
              
              {/* ✅ Flex container to align badges horizontally */}
              <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                
                {/* ✅ LinkedIn Badge (Fixed Height & Width) */}
                <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="sunil-sarolkar-451b2023" data-version="v1">
                    <a href="https://www.linkedin.com/in/sunil-sarolkar-451b2023/"><Image width={265} height={265} src="/profile/LinkedIn.png" alt="LinkedIn Badge" /></a></div>
  
                {/* ✅ Google Cloud Badge (Fixed Size) */}
                <div className="w-[265px] h-[265px]  flex items-center justify-center">
                  <div 
                    data-iframe-width="265" 
                    data-iframe-height="265" 
                    data-share-badge-id="97997fd6-bd29-4f49-8e39-4741f3ca0719" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                </div>
                
              </div>
              </section>
      </div>
    )
}

export default Badges
