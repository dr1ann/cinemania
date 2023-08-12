'use client'

// External Libraries
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import  {Drawer} from 'vaul'

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

//Images
import star from '../Images/star.png'

//Components
import Header from '../components/Header';
import MoviePosterLoading from '../components/Loaders/MoviePosterLoading';

//type
interface PopularMoviesProps {
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
}
export default function PopularMovies() {
    const [isLoading, setIsLoading] = useState(true);
    const [Movies, setMovies] = useState<any>({})



    const searchParams = useSearchParams();

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

    //the current person id
    const currID = searchParams.get('id');

    const response =  await axiosInstance.get(`/person/${currID}/movie_credits`) //MovieCredits
   

  
    setMovies(response.data); 
    setIsLoading(false) // Skeleton loader is disabled

 
   
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};
  useEffect(() => {
 
    //call the function to get the data from the api
    DataFromAPI();

  }, []);

 const sortedMovies = Movies?.cast?.sort((a:any, b:any) => b.popularity - a.popularity);
// Get the top 15 most popular movies
const PopularMovies = sortedMovies?.slice(0, 15);

  return (
    <>
  

    {isLoading ? 

        <>
        <h1 className='px-6 sm:px-10 pt-4 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Popular Movies</h1>
   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center  p-6 sm:py-6 sm:px-10 gap-6 '>

   {Array.from({ length: 15 }).map((_, index) => (
     <MoviePosterLoading key={index} />
   ))}
       
       </div> 
       </>
    :
    
<div className='relative'>
      {PopularMovies.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-4 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Popular Movies</h1>
   
    <ul className='flex flex-row overflow-x-scroll   bigscreens:justify-center p-6 sm:py-6 sm:px-10 gap-6 '>
{PopularMovies?.map((movie:PopularMoviesProps) => (
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
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-md
 hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']} 1x,
 https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie['poster_path']} 2x`}
loading='eager'
alt={movie['title']} />
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
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-md
 hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'

loading='eager'
alt={movie['title']} />
</Link>
}
     {movie['title'] ?
      <Link
      className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
       pathname: `/movie`,
       query:  { id: movie.id }, // the data
     
     }}
    
      >
       {movie['title']}
          </Link>
          :
          <Link
          className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
          href={{
           pathname: `/movie`,
           query:  { id: movie.id }, // the data
         
         }}
        
          >
           N/A
              </Link>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <Image
         className='h-[0.8rem] w-[0.8rem] sm:h-[0.9rem] sm:w-[0.9rem] object-contain mb-[2px] sm:mb-[1px]'
         src={star}
         alt='home icon'
         width={1}
         height={1}
        
          />
          {movie['vote_average']
          ?
           <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>{movie['vote_average'].toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300  truncate'>{movie['release_date'] ? new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</p>
        
            </div>
             
            </div>
</li>
))
}
</ul>
</>
:
''


    }
  
    </div>
    
}

 
   </>
  )
}