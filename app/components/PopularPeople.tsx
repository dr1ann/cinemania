
'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

//Components
import MoviePosterLoading from './Loaders/MoviePosterLoading';

//type
interface PopularPeopleProps {
    id: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export default function PopularPeople() {

    const [PopularPeople, setPopularPeople] = useState<any>({})
    const [isLoading, setIsLoading] = useState(true);
  
  
  
  
  
    //Authorization to fetch data from the API with its base url
    const axiosInstance = axios.create({
      baseURL: 'https://api.themoviedb.org/3', 
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
      },
    });
  
   //fetch all data from the api
   const DataFromAPI = async () => {
        
  
    try {

      const response =  await axiosInstance.get(`person/popular?language=en-US&page=1`) //Popular People
     
      setPopularPeople(response.data);
      setIsLoading(false) // Skeleton loader is disabled
  
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };

  //call the function to get the data from the api
    useEffect(() => {
      
      DataFromAPI();

    }, []);

  return (
    <>
  

    {isLoading ? 

        <>
        <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top People</h1>
   <div className='flex flex-row justify-start overflow-x-scroll  bigscreens:justify-center items-center   p-6 sm:p-10 gap-10'>

   {Array.from({ length: 10 }).map((_, index) => (
     <MoviePosterLoading key={index} />
   ))}
       
       </div> 
       </>
    :
    
<ul className='relative'>
      {PopularPeople && PopularPeople.results && PopularPeople.results.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top People</h1>
   
    <div className='flex flex-row overflow-x-scroll  bigscreens:justify-center  p-6 sm:p-10 gap-6 '>
{PopularPeople && PopularPeople.results && PopularPeople.results.slice(0, 15).map((person: PopularPeopleProps) => (
<li key={person.id}>
    <div className='flex flex-col justify-center animate pop max-w-[9.375rem] min-w-[9.375rem]'>
{person.profile_path
         ?
         <Link
   
         href={{
          pathname: `/person`,
          query:  { id: person.id }, // the data
        
        }}
       
         >
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person.profile_path}`}
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-md hover:rotate-[-2deg] 
transform transition duration-250 hover:scale-110 hover:z-10'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person.profile_path} 1x, 
https://image.tmdb.org/t/p/w300_and_h450_bestv2${person.profile_path} 2x`}
loading='lazy'
alt={person.name} />
</Link>
:
<Link
   
href={{
 pathname: `/person`,
 query:  { id: person.id }, // the data

}}

>
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=PROFILE N/A'
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'

loading='lazy'
alt={person.name} />
</Link>
}
     {person.name ?
      <Link
      className='truncate   text-[0.85rem] md:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
       pathname: `/person`,
       query:  { id: person.id }, // the data
     
     }}
    
      >
       {person.name}
          </Link>
          :
          <p className='truncate   text-[0.85rem] md:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616] '>
           N/A
          </p>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          {person.popularity
          ?
           <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300'>{person.popularity.toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300  truncate'>{person.known_for_department ? person.known_for_department : 'N/A'}</p>
        
            </div>
             
            </div>
</li>
))
}
</div>
</>
:
''


    }
  
    </ul>
    
}

 
   </>
  )
}
