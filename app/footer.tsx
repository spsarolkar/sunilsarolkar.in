"use client";

import React from 'react'

const Footer = () => {
  return (
    <div>
        {/* Footer */}
        <footer className="bg-white text-gray-600 text-center py-6  shadow-inner relative z-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Sunil Sarolkar. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer
