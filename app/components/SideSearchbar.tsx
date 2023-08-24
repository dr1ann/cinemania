'use client'

//External Libraries
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

// Images
import icon from '../Images/icon.png';

const Header = () => {
    const router = useRouter()
    const [inputWord, setInputWord] = useState('');
  //Handler of the searchbar button
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?keyword=${inputWord}`)
    }
  return (
   
   
    <nav id='changeHeight' className='myHeader' >
    <div className="justify-between py-4 z-30 px-4 items-center flex md:px-8  ">
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
    
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
   </svg>
              
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
               <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative  gap-8 bg-transparent p-7 ">
                  <form onSubmit={handleFormSubmit} className="flex items-center w-full z-10">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
<input value={inputWord}  onChange={(e) => setInputWord(e.target.value)} autoComplete='off' type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search for a movie, person..."  />
</div>
<button type="submit" className="p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-lg border border-[#e2b616]">
   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
   </svg>
   <span className="sr-only">Search</span>
</button>
</form>

                  </div>
                  
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
   
      </div>
    </div>
  </nav>

 
  )
}
export default Header