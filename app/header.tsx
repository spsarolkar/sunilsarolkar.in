import React from 'react'

interface HeaderProps {
    title: string;
    subtitle?: string;
}
  
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
return (
        <header className='bg-gray-800 p-8 text-center'>
        <h1 className="text-white text-3xl font-bold">{title}</h1>
        {subtitle && <h2 className="optional">{subtitle}</h2>}
        </header>
)
}

export default Header
