
'use client'
// External Libraries
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

//Images
import star from '../Images/star.png'

//Components
import MoviePosterLoading from './Loaders/MoviePosterLoading';

//type
interface PopularMoviesProps {
    id: number;
    original_title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
}

export default function PopularMovies() {

    const [PopularMovies, setPopularMovies] = useState<any>({})
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

      const response =  await axiosInstance.get(`movie/popular?language=en-US&page=1`) //Popular Movies
     
      setPopularMovies(response.data);
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
        <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Popular</h1>
   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center   p-6 sm:p-10 gap-10'>

   {Array.from({ length: 10 }).map((_, index) => (
     <MoviePosterLoading key={index} />
   ))}
       
       </div> 
       </>
    :
    
<ul className='relative'>
      {PopularMovies && PopularMovies.results && PopularMovies.results.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Popular</h1>
   
    <div className='flex flex-row overflow-x-scroll   bigscreens:justify-center p-6 sm:p-10 gap-6 '>
{PopularMovies && PopularMovies.results && PopularMovies.results.slice(0, 15).map((movie: PopularMoviesProps) => (
<li key={movie.id}>
    <div className='flex flex-col justify-center animate pop max-w-[9.375rem] min-w-[9.375rem]'>
{movie['poster_path']
         ?
         <Link
   
         href={{
          pathname: `/movie`,
          query:  { id: movie.id }, // the data
        
        }}
       
         > 
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']}`}
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-xl hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']} 1x, https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie['poster_path']} 2x`}
loading='eager'
alt={movie['original_title']} />
</Link>
:
<Link
   
href={{
 pathname: `/movie`,
 query:  { id: movie.id }, // the data

}}

> 

<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-xl hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'

loading='eager'
alt={movie['original_title']} />
</Link>
}
     {movie['original_title'] ?
      <Link
      className='truncate   text-[0.85rem] md:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
       pathname: `/movie`,
       query:  { id: movie.id }, // the data
     
     }}
    
      >
       {movie['original_title']}
          </Link>
          :
          <p className='truncate   text-[0.85rem] md:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616] '>
           N/A
          </p>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <Image
         className='h-[0.9rem] w-[0.9rem] sm:h-[1rem] sm:w-[1rem] object-contain'
         src={star}
         alt='home icon'
         width={1}
         height={100}
        
          />
          {movie['vote_average']
          ?
           <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300'>{movie['vote_average'].toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] md:text-[0.9rem] text-gray-300  truncate'>{movie['release_date'] ? new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</p>
        
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
