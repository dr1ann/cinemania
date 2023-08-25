'use client'

//External Libraries
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';


// Images
import icon from '../Images/icon.png';

const Header = () => {
    const router = useRouter()
    const [inputWord, setInputWord] = useState('');
    const [isSearchBarOpen, SetisSearchBarOpen] = useState(false);
  //Handler of the searchbar button
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?keyword=${inputWord}`)
    }


  return (
   
   <>
    <nav id='changeHeight' className='myHeader' >
    <div className="justify-between py-4 z-30 px-4 items-center flex md:px-8  ">
      <div>
        <div className="flex items-center justify-between   " >
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
     <button onClick={() => SetisSearchBarOpen(!isSearchBarOpen)} >
      {!isSearchBarOpen?
      <div className='flex flex-row bg-[#1a1a1a] px-2 md:px-4 py-1 rounded-full items-center gap-2 md:gap-4 search-animate pop'>
       <p className='hidden md:block text-[.85rem] md:text-[1rem] '>Search</p>
       <svg className="w-[14px] h-[14px]  md:w-4 md:h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
     </svg>
     </div>
     :
     <p className='text-[.90rem] md:text-xl bg-[#1a1a1a] px-2 pb-[2px] rounded-full search-animate pop'>✕</p>
      }
     
     </button>

  
    </div>
    {isSearchBarOpen ?
    <form onSubmit={handleFormSubmit} className="bg-[#1a1a1a] p-4 rounded-xl drop-shadow-2xl customized-shadow shadow-sm  search-animate pop flex items-center w-[90%] mx-auto  z-30">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
<input value={inputWord}  onChange={(e) => setInputWord(e.target.value)} autoComplete='off' type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem] rounded-full  text-white text-sm block w-full  p-[12px] sm:p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
" placeholder="Search for a movie, person..."  />
</div>
<button type="submit" className="p-[12px] sm:p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-full border border-[#e2b616]">
   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
   </svg>
   <span className="sr-only">Search</span>
</button>
</form>
    :
  ''
    }
  </nav>
  
 </>
  )
}
export default Header