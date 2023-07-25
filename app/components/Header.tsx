'use client'
import React from 'react'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';
import Image from 'next/image'
import { useState, useEffect } from 'react';

// Images
import icon from '../Images/icon.png';

export default function Header() {
    const [navbar, setNavbar] = useState(false);
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if(window.scrollY >= 63.25) {
          setColor(true)
        } else {
          setColor(false)
        }
      }
      useEffect(() => {
        // Add event listener on the client side
        window.addEventListener('scroll', changeColor);
    
        // Clean up the event listener on unmounting
        return () => {
          window.removeEventListener('scroll', changeColor);
        };
      }, []);
  return (
    <div>
    <Headroom>
    <nav id='changeHeight' className={color ? 'new-bg' : 'myHeader'} >
    <div className="justify-between py-4 z-30 px-4 md:items-center md:flex md:px-8  ">
      <div>
        <div className="flex items-center justify-between   md:block" >
          <div className='flex flex-row'>
      
          <Image
          className='w-[6.25rem] h-full md:w-[11.25rem] object-contain'
  src={icon}
  width={1}
  height={1}
  alt="Picture of the author"
 
/>
</div>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`flex-1 justify-self-center header-hover  pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 lg:mr-12 ">
            <li className="text-white text-center font-bold">
            <ScrollLink
to="homepage"
smooth={true}
duration={500}
offset={-100}
className="cursor-pointer"
>
<a>Home</a>
</ScrollLink>
            </li>
            <li className="text-white text-center font-bold">
            <ScrollLink
to="aboutPage"
smooth={true}
duration={500}
offset={-100}
className="cursor-pointer"
>

<a>Movies</a>
</ScrollLink>

            </li>
            <li className="text-white text-center font-bold">
            <ScrollLink
to="projectsPage"
smooth={true}
duration={500}
offset={-100}
className="cursor-pointer"
>

<a>TV Shows</a>
</ScrollLink>

            </li>
            <li className="text-white text-center font-bold">
            <ScrollLink
to="contactPage"
smooth={true}
duration={500}
offset={-100}
className="cursor-pointer animate-wiggle"
>

<a>People</a>
</ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  </Headroom>
  </div>
  )
}
