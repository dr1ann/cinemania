'use client'
import React from 'react'

//External Libraries
import Image from 'next/image'
import Link from 'next/link';
// Images
import icon from '../Images/icon.png';

const Header = () => {
 
  return (
   
   
    <nav id='changeHeight' className='myHeader' >
    <div className="justify-between py-4 z-30 px-4 md:items-center md:flex md:px-8  ">
      <div>
        <div className="flex items-center justify-between   md:block" >
          <Link className='flex flex-row'
          href={'/'}
          >
      
          <Image
          className='w-[6.25rem] h-full md:w-[11.25rem] object-contain'
  src={icon}
  width={1}
  height={1}
  alt="Picture of the author"
 
/>
</Link>
          
        </div>
      </div>
      <div>
       
      </div>
    </div>
  </nav>

 
  )
}
export default Header