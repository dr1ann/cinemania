
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
interface TrendingMoviesProps {
    id: number;
    original_title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
}

export default function TrendingMovies() {
    
    const [TrendingMovies, setTrendingMovies] = useState<any>({})
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

      const response =  await axiosInstance.get(`trending/movie/day?language=en-US`) //Trending Movies
   
      setTrendingMovies(response.data);
      setIsLoading(false) // Skeleton loader is disabled
  
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };

  //call the function to get the data from the api
    useEffect(() => {

      DataFromAPI();

    }, []);
  console.log(TrendingMovies)
  return (
    <>
  

    {isLoading ? 

        <>
        <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold '>What's Trending Today?</h1>
   <div className='flex flex-row justify-start overflow-x-scroll items-center   p-6 sm:p-10 gap-10'>

   {Array.from({ length: 10 }).map((_, index) => (
     <MoviePosterLoading key={index} />
   ))}
       
       </div> 
       </>
    :
    
<ul className='relative'>
      {TrendingMovies && TrendingMovies.results && TrendingMovies.results.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold '>What's Trending Today?</h1>
   
    <div className='flex flex-row overflow-x-scroll   p-6 sm:p-10 gap-6 '>
{TrendingMovies && TrendingMovies.results && TrendingMovies.results.map((movie: TrendingMoviesProps) => (
<li key={movie.id}>
    <div className='flex flex-col justify-center animate pop max-w-[9.375rem] min-w-[9.375rem]'>
{movie['poster_path']
         ?

<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']}`}
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-xl'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']} 1x, https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie['poster_path']} 2x`}
loading='eager'
alt={movie['original_title']} />
:
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-xl'

loading='eager'
alt={movie['original_title']} />
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
