import React from 'react'
import style from './TopControls.module.css'
import Link from 'next/link'

function TopControls({onKeypointModelChange}: {onKeypointModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
  return (
  <div className='m-4 grid grid-cols-1 gap-4'><select className="select" onChange={onKeypointModelChange}>
  <option disabled>Select Base Model</option>
  <option value='Openpose'>Openpose</option>
  <option value='Blazepose'>Blazepose</option>
</select>
</div>

  )
}

export default TopControls
