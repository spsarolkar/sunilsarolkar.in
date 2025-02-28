import React from 'react'
import style from './TopControls.module.css'
import Link from 'next/link'

function TopControls({onKeypointModelChange}: {onKeypointModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
  return (
  <div className='px-4 py-2 border rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'><select className="select" onChange={onKeypointModelChange} >
  <option disabled>Select Base Model</option>
  <option value='Openpose'>Openpose</option>
  <option value='Blazepose'>Blazepose</option>
</select>
</div>

  )
}

export default TopControls
