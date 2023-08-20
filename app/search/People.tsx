import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import star from '@/app/Images/star.png'

//type
interface PeopleProps {
    id: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

const Person = ({ KeywordResults }: { KeywordResults: any }) => {
  return (
   <>
 <ul className={`mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-${
KeywordResults?.length >= 3 ? '[repeat(3,1fr)]' : '[repeat(2,1fr)]'} 
sm:grid-cols-searchresults sm:w-[95%] mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
  scroll-smooth`}>
  {KeywordResults?.map((person:PeopleProps) => (
<li key={person['id']} className='z-[9999] flex flex-col mx-auto  justify-center relative min-w-full max-w-full 
   animate pop  sm:min-w-[9.375rem] sm:max-w-[9.375rem]'>
{person['profile_path']
         ?
         <Link
   
         href={{
          pathname: `/person/${person.id}`,
        }}
       
         > 
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person['profile_path']}`}
className='w-full  sm:min-h-[225px] sm:max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10 cursor-pointer'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person['profile_path']} 1x, 
https://image.tmdb.org/t/p/w300_and_h450_bestv2${person['profile_path']} 2x`}
loading='lazy'
alt={person['name']} />
</Link>
:
<Link
   
href={{
 pathname: `/person/${person.id}`,
}}

> 
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=PROFILE N/A'
className='w-full  sm:min-h-[225px] sm:max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10 '

loading='lazy'
alt={person['name']} />
 </Link>
}
     {person.name ?
      <Link
      className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
        pathname: `/person/${person.id}`,
      }}
    
      >
       {person.name}
          </Link>
          :
          <Link
          className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
          href={{
            pathname: `/person/${person.id}`,
          }}
        
          >
           N/A
              </Link>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          {person.popularity
          ?
           <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>{person.popularity.toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300  truncate'>{person.known_for_department ? person.known_for_department : 'N/A'}</p>
        
            </div>
             
          
</li>
))
}
</ul>
   </>
  )
}
export default Person