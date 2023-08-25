'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

//Images
import icon from '../Images/icon.png'

//Components
import HomeLoading from './Loaders/HomeLoading';
import Header from './Header';

//API Component
import { TrendingMoviesAPI } from './API/HomePageAPI';

const MainPage = () => {
  const router = useRouter()
    
    const [isHomeLoading, setIsHomeLoading] = useState(true);
    const [randomImage, setRandomImage] = useState<string>('');
    const [inputWord, setInputWord] = useState('');
    
  
  
    //get the values of the fetched data from the API
    const { TrendingMovies } = TrendingMoviesAPI(`trending/movie/day?language=en-US`)
   

    useEffect(() => {

      generateRandomImage(TrendingMovies?.results)
   
       }, [TrendingMovies]);

      //generate random backdrops every reload for homepage
  const generateRandomImage = (movies: any[]) => {
    if (movies?.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];
      const imageUrl = TrendingMovies ? ` https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`  : "https://via.placeholder.com/220x330/3F3F3F/FFFFFF/" ;

      setRandomImage(imageUrl);
      setIsHomeLoading(false) //remove the skeleton loader
    }
  };

  //Handler of the searchbar button
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?keyword=${inputWord}`)
    }

  return (
 <>
{isHomeLoading ?

< HomeLoading/>

      :

      <div className=' h-screen homepage home-animate pop relative' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414), url(${randomImage})` }}>
        <Header />
      <div className="fade-effect2"></div>
 <div className="fade-effect"></div>
  
 <div className='flex flex-col justify-center gap-2 items-center h-full w-[85%] sm:w-[70%] lg:w-[60%] 2xl:w-[50%] absolute top-[30px] right-0 left-0 bottom-0 mx-auto'>
   <Image
   src={icon}
   alt='home icon'
   width={600}
   height={100}
   />
   <h2 className='text-center text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] newfont sm:whitespace-nowrap'> <span className='text-[#e2b616]'> EXPLORE</span> THE WORLD OF <span className='text-[#e2b616]'> MOVIES</span></h2>

<form onSubmit={handleFormSubmit} className="flex items-center w-full z-10">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
<input value={inputWord}  onChange={(e) => setInputWord(e.target.value)} autoComplete='off' type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-full block w-full  p-[12px] sm:p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search for a movie, person..."  />
</div>
<button type="submit" className="p-[12px] sm:p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-full border border-[#e2b616]">
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
export default MainPage