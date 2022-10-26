import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Spinner2 = () => {
  return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
    <MutatingDots 
    
  height="100"
  width="100"
  color="red"
  secondaryColor= 'purple'
  radius='15'
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
 />
 </div>
  )
}

export default Spinner2