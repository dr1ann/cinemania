
//External Libraries
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

//Loader(s)
import CollectionLoading from '../components/Loaders/CollectionLoading';

//Images
import SearchErrorImage from '@/app/Images/searcherrorimg.webp'
import ErrorImage from '@/app/Images/errorimg.webp'


//type
interface PeopleProps {
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

 //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
  },
});

 const People = () => {

  
  const [PersonResults, setPersonResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);
  const [PageNum, SetPageNum] = useState(1);
  const [error, setError] = useState(false);

 // Instantiate a new search parameters object to access and manipulate the query parameters of the current URL.
 const searchParams = useSearchParams()

 // Retrieve the keyword entered by the user from the search parameters.
 const SearchedKeyword = searchParams.get('keyword')

  //fetching the data from the api
 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(`https://api.themoviedb.org/3/search/person?query=${SearchedKeyword}&page=${PageNum}`)
   
    setPersonResults(response.data);
    setIsLoading(false) // Skeleton loader is disabled
    setError(false); // set error to false whenever the fetching is success
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
    setError(true); // set error to true whenever the fetching is failed
  }
  



};

//call the function to get the data from the api
useEffect(() => {

  DataFromAPI();
  return () => {
    setIsLoading(true) //Clean up: Set isLoading to true before next fetch
   };
}, [PageNum, SearchedKeyword]); //re render the component whenever there are changes to the dependencies

//return an error statement whenever the fetching of data is failed
if(error) {
  return (
  <div className='flex flex-col px-8  mt-14 justify-center items-center'>
          <Image 
        
          src={ErrorImage}
          width={400}
          height={400}
          alt='error image'
          />
     
        <p className='text-[1rem] md:text-[1.2rem] 2xl:text-[1.4rem] text-center '>Please refresh the page or try again later.</p>
        </div>
        )
}


  return (

   <>
   
{isLoading ?
   < CollectionLoading />

   :
<>
{PersonResults?.results?.length > 0

?
<>
<div className='flex justify-between mt-8'>
<p className='text-[0.95rem] md:text-[1.1rem] 2xl:text-[1.3rem]   px-2'>Total Results: <span className='font-bold'> {PersonResults?.total_results?.toLocaleString()}</span></p>
<p className='text-[0.95rem] md:text-[1.1rem] 2xl:text-[1.3rem] mt-4 bg-[#1a1a1a] rounded-md px-[.8em]  pt-[0.3em] pb-[0.4em] '> Page: {PageNum +  '/' +  PersonResults?.total_pages?.toLocaleString()}</p> 
</div>
 
     

<ul className={`mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-${
PersonResults?.results.length >= 3 ? '[repeat(3,1fr)]' : '[repeat(2,1fr)]'} 
sm:grid-cols-searchresults sm:w-[95%] mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
  scroll-smooth`}>
  {PersonResults?.results?.map((person:PeopleProps) => (
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
      
      
 
{ PersonResults?.total_pages > 0 
      ?
  
      <div className='items-center justify-center px-2 flex gap-6 mt-6'>
         {PageNum !== 1 
        ?
        <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]'
          onClick={() =>SetPageNum(prev => prev - 1) }>{'< Previous Page'}</button>
        :
        ''
        }
      {PageNum !== PersonResults?.total_pages 
        ?
      <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]'
        onClick={() =>SetPageNum(prev => prev + 1) }>{'Next Page >'}</button>
      :
      ''
      }
      </div>
    
       
       :
       ''
      }
     


        </>
        
        :
        <div className='flex flex-col px-8 gap-10 mt-14 justify-center items-center'>
        <Image 
      
        src={SearchErrorImage}
        width={300}
        height={300}
        alt='error image'
        />
   
      <p className='  text-[1rem] md:text-[1.2rem] 2xl:text-[1.4rem] text-center '>{`No results found for "${SearchedKeyword}" as a person.`}</p>
      </div>
    }
    </>
      
        
}

   </>
   
  )
}
export default People