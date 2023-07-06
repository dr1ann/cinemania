'use client'
import Image from 'next/image'
import icon from './Images/icon.png'
import star from './Images/star.png'
import search from './Images/search.png'
import { useEffect, useState } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';

import { start } from 'repl';
// Initialization for ES Users

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState<string>('');
  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
      }
    
    };

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        generateRandomImage(data.results);
      })
      .catch(err => console.error(err));
  }, []);
  const generateRandomImage = (movies: any[]) => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

      setRandomImage(imageUrl);
    }
  };


  return (
   
      <div >
         
        
       
       
      
         <div className=' h-screen homepage' style={{ backgroundImage: `linear-gradient(rgba(16, 16, 16, 0.4), rgba(16, 16, 16, 0.9)), url(${randomImage})` }}>
        <Headroom>
        <nav className="w-full bg-transparent py-4" >
        <div className="justify-between  z-30 px-4 md:items-center md:flex md:px-8  ">
          <div>
            <div className="flex items-center justify-between   md:block" >
              <div className='flex flex-row'>
            <Image
      src={icon}
      width={180}
      height={100}
      alt="Picture of the author"
     
    />
    
    </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center header-hover  pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 lg:mr-12 ">
                <li className="text-white text-center font-bold">
                <ScrollLink
  to="homepage"
  smooth={true}
  duration={500}
  offset={-100}
  className="cursor-pointer"
>
  <a>Home</a>
</ScrollLink>
                </li>
                <li className="text-white text-center font-bold">
                <ScrollLink
  to="aboutPage"
  smooth={true}
  duration={500}
  offset={-100}
  className="cursor-pointer"
>
  
  <a>Movies</a>
</ScrollLink>

                </li>
                <li className="text-white text-center font-bold">
                <ScrollLink
  to="projectsPage"
  smooth={true}
  duration={500}
  offset={-100}
  className="cursor-pointer"
>
  
  <a>TV Shows</a>
</ScrollLink>

                </li>
                <li className="text-white text-center font-bold">
                <ScrollLink
  to="contactPage"
  smooth={true}
  duration={500}
  offset={-100}
  className="cursor-pointer animate-wiggle"
>
  
  <a>People</a>
</ScrollLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </Headroom>
      <div className='flex flex-col justify-center gap-2 items-center h-[100%] w-[60%] m-auto'>
        <Image
        src={icon}
        alt='home icon'
        width={600}
        height={100}
        />
        <h2 className='text-[3rem] font-bold'> <span className='text-[#e2b616]'> Explore</span> the World of <span className='text-[#e2b616]'> Movies</span></h2>
     
<form className="flex items-center w-full">   
    <label className="sr-only">Search</label>
    <div className="relative w-full active">
       
        <input type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" placeholder="Search Movies, TV shows, People, etc..." required />
    </div>
    <button type="submit" className="p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-lg border border-[#e2b616]">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
    </button>
</form>

        </div>
        </div>
        <div className='fade-effect'></div>
      <h1 className='px-10 pt-10 text-3xl font-bold'>What's Trending?</h1>
      
      <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>
    
       {movies.map(movie => (
      <div key={movie['id']}> 
     
     <div className='grid grid-cols-fit'>

    <div className='flex flex-col justify-center '>
         <img
         className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-3deg] transform transition duration-500 hover:scale-110 hover:z-10'
         src={`https://image.tmdb.org/t/p/original${movie['poster_path']}`}
         alt={movie['original_title']}
      

         />
        
           <p className='font-bold  mt-4 truncate '>{movie['original_title']}</p>
           <div className='flex  justify-between items-center py-[5px] '>
            <div className=' flex flex-row items-center gap-2'>
            <Image
        className='h-[1rem] w-[1rem] object-contain'
        src={star}
        alt='home icon'
        width={1}
        height={100}

         />
          <p>{movie['vote_average'].toFixed(1)}</p>

           </div>
           <p>{new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>

           </div>
           </div>     
   </div>
      </div>

       ))
       
       }
       </div>
    </div>
   
    
  );
}
