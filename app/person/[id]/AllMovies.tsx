'use client'
import React from 'react'
import Image from 'next/image';
import { useState, Fragment, useEffect } from 'react';
import PersonMoviesAPI from '@/app/components/API/PersonDetails/PersonMoviesAPI';
import CollectionLoading from '@/app/components/Loaders/CollectionLoading';
import Link from 'next/link';
import star from '../../Images/star.png'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
//type
interface MoviesProps {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  character?: string;
  job?:string;
  randomId?: number;
}

const AllMovies = ({ id }: { id: number }) => {
    //get the values of the fetched data from the API
  const {Movies, isLoading } = PersonMoviesAPI (`/person/${id}/movie_credits`);


  //use states
  const [selected, setSelected] = useState('')
  const [sortMethod, setsortMethod] = useState(true);
  let ActingDept:any = null;
  let ProductionDept:any = null;


  //Getting the values/length for every movie department
  Object.keys(Movies).forEach((key) => {
    if (key === 'cast') {
      ActingDept = `Acting (${Movies[key]?.length > 0 ? Movies[key]?.length : '0' }) `;
    }
     else if (key === 'crew'){
      ProductionDept = `Production (${Movies[key]?.length > 0 ? Movies[key]?.length : '0' }) `;
    }
  });


  //Setting the default value of the Selection 
  useEffect(() => {
    if(ActingDept !== null) {
      setSelected(ActingDept);
    } else {
      setSelected(ProductionDept);
    } 
 
  }, [ActingDept, ProductionDept ]);


  //Put the two Values of 2 departments in an array
  const DepartmentArray = [];
  DepartmentArray.push(ActingDept, ProductionDept);
  
// Helper function to generate random IDs
const generateRandomId = () => Math.random().toString(36).substring(7);

   // Generate random IDs and sort movies based on release dates for both cast and crew
   const sortedProductionMovies = Movies?.crew?.map((crewMember:any) => ({
     ...crewMember,
     randomId: generateRandomId(),
   }))?.sort((a:any, b:any) => {
    const releaseDateA = a.release_date ? new Date(a.release_date).getTime() : 0; // Use 0 for null/undefined dates
  const releaseDateB = b.release_date ? new Date(b.release_date).getTime() : 0; // Use 0 for null/undefined dates
     if (sortMethod) {
       return releaseDateB - releaseDateA;
     } else {
       return releaseDateA - releaseDateB;
     }
   });

 const sortedActingMovies = Movies?.cast?.map((castMember:any) => ({
     ...castMember,
     randomId: generateRandomId(),
   }))?.sort((a:any, b:any) => {
    const releaseDateA = a.release_date ? new Date(a.release_date).getTime() : 0; // Use 0 for null/undefined dates
  const releaseDateB = b.release_date ? new Date(b.release_date).getTime() : 0; // Use 0 for null/undefined dates
     if (sortMethod) {
       return releaseDateB - releaseDateA;
     } else {
       return releaseDateA - releaseDateB;
     }
   });

  //Toggle the buttons Sortation method
const Sort = () => {
  return (
    
  <button
  onClick={() => setsortMethod(!sortMethod)}
  className='bg-[#1a1a1a] rounded-md mt-4 pb-[2px] ml-6 px-2 text-[0.85rem] md:text-[1rem]'
>
  {sortMethod ? 'Newest' : 'Oldest'}
</button>
)
}

console.log(Movies)
  return (
  <>
  <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Movies</h1>
  {isLoading
  ?
 <CollectionLoading />
 :

  <div className='relative'>
     {Movies?.cast?.length > 0 || Movies?.crew?.length > 0
      ?
    <>
    <div className='flex flex-row justify-between'>
   {Sort()}
     <div className="w-[170px] md:w-72   px-6">
    <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1  z-[999] ">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-[#1a1a1a] customized-shadow shadow-sm pb-1 pt-[3px] md:py-2 pl-2  pr-10 text-left focus:outline-none  sm:text-sm">
            <span className="block truncate text-[.85rem] md:text-[1rem] font-bold">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="mt-1 absolute left-[-10px] md:left-0  max-h-60 w-fit md:w-full overflow-auto rounded-md bg-[#1a1a1a]  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {DepartmentArray.map((dept, index) => (
                <Listbox.Option
                  key={index}
                 className='relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-[#141414]'
                  value={dept}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-[.85rem] lg:text-[1rem] ${
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {dept}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#e2b616]">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      </div>
      </div>
    <ul className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 bigscreens:grid-cols-4  gap-4 p-6 animate pop'>

      {selected === ActingDept &&
      <>

      {sortedActingMovies.map((movie:MoviesProps) => (
        
      <li key={movie.randomId} className='animate pop flex flex-row justify-between px-2 py-2 gap-6 bg-[#1a1a1a]  drop-shadow-2xl customized-shadow shadow-sm rounded-md'>
      
     
       <div className='flex flex-row gap-2'>
       {movie.poster_path ? 
       <img
       className='min-w-[45px] max-w-[45px] object-contain rounded-md'
       src={`https://image.tmdb.org/t/p/w45${movie.poster_path}` }
       srcSet={`https://image.tmdb.org/t/p/w45${movie.poster_path} 1x,
       https://image.tmdb.org/t/p/w92${movie.poster_path} 2x`}
       alt={movie.title}
      
       />
:
<img
className='min-w-[45px] max-w-[45px] object-contain rounded-md'
src='https://via.placeholder.com/45x72/3F3F3F/FFFFFF/?text=N/A'
alt={movie.title}

/>

}
        <div className='flex flex-col justify-center max-w-[131px] collectionscreen:max-w-full'>
        {movie.title ?
    <Link
    className=' text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold hover:text-[#e2b616]'
    href={`/movie/${movie.id}`}
  >
    {movie.title}{' '}
    {movie.release_date ? `(${new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })})` : '(N/A)'}
  </Link>
  
          :
          <Link
          className='text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold  hover:text-[#e2b616]'
          href={`/movie/${movie.id}`}
        
          >
           N/A
              </Link>
}
      
        <span className=' text-[0.78rem]   sm:text-[0.813rem]   text-gray-300'>{movie.character ? `as ${movie.character}` : 'N/A' }</span>
        </div>
          
        </div>
        <div className=' flex flex-row  items-center gap-1 pr-2'>
             <Image
         className='h-[0.8rem] w-[0.8rem] sm:h-[0.9rem] sm:w-[0.9rem] object-contain mb-[2px] sm:mb-[1px]'
         src={star}
         alt='home icon'
         width={1}
         height={1}
        
          />
          {movie.vote_average
          ?
           <p className=' text-[0.78rem]  sm:text-[0.9rem] text-gray-300'>{movie.vote_average.toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem]  sm:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
      </li>
      
      ))
  }
  </>
 
}
{selected === ProductionDept &&
 <>
 {sortedProductionMovies.map((movie:MoviesProps) => (
 <li key={movie.randomId} className='animate pop flex flex-row justify-between px-2 py-2 gap-6  bg-[#1a1a1a]  drop-shadow-2xl customized-shadow shadow-sm rounded-md'>
 

  <div className='flex flex-row gap-2'>
  {movie.poster_path ? 
       <img
       className='min-w-[45px] max-w-[45px] object-contain rounded-md'
       src={`https://image.tmdb.org/t/p/w45${movie.poster_path}` }
       srcSet={`https://image.tmdb.org/t/p/w45${movie.poster_path} 1x,
       https://image.tmdb.org/t/p/w92${movie.poster_path} 2x`}
       alt={movie.title}
      
       />
:
<img
className='min-w-[45px] max-w-[45px] object-contain rounded-md'
src='https://via.placeholder.com/45x72/3F3F3F/FFFFFF/?text=N/A'
alt={movie.title}

/>

}
  
   <div className='flex flex-col justify-center max-w-[131px] collectionscreen:max-w-full'>
   {movie.title ?
<Link
className=' text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold hover:text-[#e2b616]'
href={`/movie/${movie.id}`}
>
{movie.title}{' '}
{movie.release_date ? `(${new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })})` : '(N/A)'}
</Link>

     :
     <Link
     className='text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold  hover:text-[#e2b616]'
     href={`/movie/${movie.id}`}
   
     >
      N/A
         </Link>
}
 
   <span className=' text-[0.78rem]   sm:text-[0.813rem]   text-gray-300'>{movie.job ? movie.job : 'N/A' }</span>
   </div>
     
   </div>
   <div className='flex flex-row items-center gap-1 pr-2'>
        <Image
    className='h-[0.8rem] w-[0.8rem] sm:h-[0.9rem] sm:w-[0.9rem] object-contain mb-[2px] sm:mb-[1px]'
    src={star}
    alt='home icon'
    width={1}
    height={1}
   
     />
     {movie.vote_average
     ?
      <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>{movie.vote_average.toFixed(1).replace(/\.0$/, '') }</p>
     :
     <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>N/A</p>
}
       </div>
 </li>
 ))
}
</>
  }

    </ul>
    </>
    :
    <p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
     }
  </div>
}
  </>
  )
}
export default AllMovies