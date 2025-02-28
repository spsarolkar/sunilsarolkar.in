import React from 'react'

const Background = () => {
  return (
    <div className='absolute inset-0 grid-cols-3'>
      <div className='relative bg-[url(/background/Torna-wide.jpg)] h-full w-full col-span-3'></div>
      <div className='relative bg-[url(/background/AMK.jpg)] h-full w-full col-span-3'></div>
      <div className='bg-[url(/background/Torna-Dam-View.jpg)] h-full w-full col-span-3'></div>
      
    </div>
  )
}

export default Background
