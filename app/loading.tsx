import React from 'react'
import Image from 'next/image'
import loadingbar from './Images/loading-11.gif';
export default function loading() {
  return (
<div className='h-screen movdbg flex flex-col justify-center items-center'  >
      
      <Image className=' w-[35%] object-contain'
 src={loadingbar}
 alt='laoding bar'
 width={1}
 height={1}
 
 />


  </div>
  )
}
