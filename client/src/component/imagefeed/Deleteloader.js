import React from 'react'
import {ProgressBar} from 'react-loader-spinner'
const Deleteloader = () => {
  return (
    <div className='absolute w-full h-full opacity-80'>
        <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#51E5FF'
/>
    </div>
  )
}

export default Deleteloader