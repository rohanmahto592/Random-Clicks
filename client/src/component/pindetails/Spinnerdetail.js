import React from 'react'
import {CirclesWithBar,FallingLines} from 'react-loader-spinner'
const Spinnerdetail = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <FallingLines
  color="purple"
  width="150"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
<p className="text-lg text-center px-2">{message}</p>
    </div>
  )
}

export default Spinnerdetail