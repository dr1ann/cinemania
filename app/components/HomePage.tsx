'use client'
// External Libraries
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

//Images
import icon from '../Images/icon.png'
import blackscreen from '../Images/black-screen.png'

//Components
import HomeLoading from './Loaders/HomeLoading';

export default function HomePage() {
    const [TrendingMovies, setTrendingMovies] = useState<any>({})
    const [isHomeLoading, setIsHomeLoading] = useState(true);
    const [randomImage, setRandomImage] = useState<string>('');
  
  
  
  
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
      generateRandomImage(response.data && response.data.results)
        
   
     
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };

  //call the function to get the data from the api
    useEffect(() => {

      DataFromAPI();

    }, []);

      //generate random pics every reload for homepage
  const generateRandomImage = (movies: any[]) => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];
      const imageUrl = TrendingMovies ? ` https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`  : "https://via.placeholder.com/220x330/3F3F3F/FFFFFF/" ;

      setRandomImage(imageUrl);
      setIsHomeLoading(false)
    }
  };
  return (
 <>
{isHomeLoading ?

< HomeLoading/>

      :
      <div className=' h-screen homepage home-animate pop relative' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414), url(${randomImage})` }}>
      <div className="fade-effect2"></div>
 <div className="fade-effect"></div>
  
 <div className='flex flex-col justify-center gap-2 items-center h-full w-[85%] sm:w-[70%] lg:w-[60%] 2xl:w-[50%] absolute top-[30px] right-0 left-0 bottom-0 mx-auto'>
   <Image
   src={icon}
   alt='home icon'
   width={600}
   height={100}
   />
   <h2 className='text-center text-[2.7rem] md:text-[3.2rem] newfont'> <span className='text-[#e2b616]'> Explore</span> the World of <span className='text-[#e2b616]'> Movies</span></h2>

<form className="flex items-center w-full z-10">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
   <input type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search Movies, TV shows, People, etc..." required />
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









   }
 </>
  )
}
