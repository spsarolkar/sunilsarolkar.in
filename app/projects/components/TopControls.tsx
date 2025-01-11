import React from 'react'
import style from './TopControls.module.css'
import Link from 'next/link'

function TopControls({onKeypointModelChange}: {onKeypointModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
  return (
    <div className='m-4 grid grid-cols-1 gap-4'>
      {/* <!-- Top Controls --> */}
  <div className="flex justify-center"><select className="select w-full max-w-xs mx-5" onChange={onKeypointModelChange}>
  <option disabled>Select Base Model</option>
  <option value='Openpose'>Openpose</option>
  <option value='Blazepose'>Blazepose</option>
</select>
<select className="select w-full max-w-xs mx-5">
  <option disabled>Select Dataset</option>
  <option>INCLUDE</option>
  <option>Blazepose</option>
  
</select></div>
      {/* <div className={style.topControls}>
            <Link className={style.topControls} data-tip="Home" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
            </Link>
      </div> */}
    </div>
  )
}

export default TopControls
