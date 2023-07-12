'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub  } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import icon from './Images/icon.png'
import star from './Images/star.png'
import search from './Images/search.png'
import nextjs from './Images/nextjs.png'
import tailwind from './Images/tailwind.png'
import dotbar from './Images/dotbar.png'
import popular from './Images/popular.png'
import { Suspense } from 'react'
import Trending from './components/Trending';
import Popular from './components/Popular';
import HomeLaoding from './components/HomeLoading';
import TopRated from './components/TopRated';
import { useEffect, useState } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';

import { start } from 'repl';
import CardLoading from './components/CardLoading';

// Initialization for ES Users


export default function Home() {
  const [trendingmovies, setTrendingMovies] = useState<any[]>([]);
  const [intheaters, setInTheatersMovies] = useState<any[]>([]);
  const [popularpeople, setPopularPeople] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState<string>('');
  const [navbar, setNavbar] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [color, setColor] = useState(false)


  //change color of header when scrolled
  const changeColor = () => {
    if(window.scrollY) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  


  useEffect(() => {

    //trigger scroll effect when window is scrolled
    window.addEventListener('scroll', changeColor)

//trending movies
    const trendingmovies = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
      }
    
    };
  
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', trendingmovies)
      .then(response => response.json())
      .then(data => {
        setTrendingMovies(data.results);
        generateRandomImage(data.results)
      })
      .catch(err => console.error(err));

      //popular/top people
      const popularpeople = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
        }
      
      };
    
      fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', popularpeople)
        .then(response => response.json())
        .then(data => {
          setPopularPeople(data.results);
         setIsPeopleLoading(false)
        })
        .catch(err => console.error(err));

//trending movies
const intheaters = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
  }

};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', intheaters)
  .then(response => response.json())
  .then(data => {
    setInTheatersMovies(data.results);
    setIsLoading(false)
  })
  .catch(err => console.error(err));

  }, []);


  //generate random pics every reload for homepage
  const generateRandomImage = (movies: any[]) => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

      setRandomImage(imageUrl);
      setIsHomeLoading(false)
    }
  };




  return (
   <body>
    
  
      <div >
         
      {isHomeLoading ?

<  HomeLaoding/>

      :
      <div className=' h-screen homepage home-animate pop' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414), url(${randomImage})` }}>
         <div className="fade-effect2"></div>
    <div className="fade-effect1"></div>
      <Headroom>
      <nav className={color ? 'new-bg' : 'myHeader'} >
      <div className="justify-between py-4 z-30 px-4 md:items-center md:flex md:px-8  ">
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
    <div className='flex flex-col justify-center gap-2 items-center h-[100%] w-[85%] sm:w-[70%] lg:w-[60%] 2xl:w-[50%] m-auto'>
      <Image
      src={icon}
      alt='home icon'
      width={600}
      height={100}
      />
      <h2 className='text-center text-[3rem] font-bold'> <span className='text-[#e2b616]'> Explore</span> the World of <span className='text-[#e2b616]'> Movies</span></h2>
   
<form className="flex items-center w-full">   
  <label className="sr-only">Search</label>
  <div className="relative w-full active">
     
      <input type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search Movies, TV shows, People, etc..." required />
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









      }
       
        
      
       
        <div className='fade-effect'></div>

        {/* <h1 className='px-10 pt-10 text-[2.75rem] text-center font-bold'> Movies & TV Shows</h1> */}




 <h1 className='px-10 pt-10 text-2xl font-bold mb-6'>What's Trending Today?</h1>

 <Trending />  

 <h1 className='px-10 pt-10 text-2xl font-bold mb-6'>Popular</h1>

 <Popular />    


 <h1 className='px-10 pt-10 text-2xl font-bold mb-6'>Top Rated</h1>
 <TopRated />    
       {/* <h1 className='px-10 pt-10 text-[2.75rem] text-center font-bold'>People</h1> */}
        <h1 className='px-10 pt-10 text-2xl font-bold'>Top People</h1>
      
      {isPeopleLoading ? 
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-10'>

   {Array.from({ length: 21 }).map((_, index) => (
     <CardLoading key={index} />
   ))}
       
       </div> 
       
    :
    <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>

{popularpeople.map(movie => (
<div key={movie['id']}> 

<div className='grid grid-cols-fit'>

<div className='flex flex-col justify-center animate pop'>
  <img
  className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-3deg] transform transition duration-500 hover:scale-110 hover:z-10'
  src={`https://image.tmdb.org/t/p/original${movie['profile_path']}`}
  alt={movie['name']}


  />
 
    <p className='font-bold  mt-4 truncate '>{movie['name']}</p>
    <div className='flex  justify-between items-center py-[5px] '>
     <div className=' flex flex-row items-center gap-2'>
     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
   <p>{movie['popularity'].toFixed(1)}</p>

    </div>
    <p>{movie['known_for_department']}</p>

    </div>
    </div>     
</div>
</div>

))

}
</div>
    }
        

<h1 className='px-10 pt-10 text-2xl font-bold'>In Theaters</h1>

{isLoading ? 
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-10'>

   {Array.from({ length: 21 }).map((_, index) => (
     <CardLoading key={index} />
   ))}
       
       </div> 
       
    :
    <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>

{intheaters.map(movie => (
<div key={movie['id']}> 

<div className='grid grid-cols-fit'>

<div className='flex flex-col justify-center animate pop'>
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
  }
       <footer className='pt-[3.5rem] flex flex-col justify-center items-center gap-2'>

        <span className='text-[0.9rem]'>Copyright © 2023 Cinemania</span>
        <div className=' flex flex-row flex-wrap justify-center items-center'>
  <p className='text-white text-center text-[0.9rem]'>Created with 


</p>
<Image className='w-[30px] object-contain'
 src={nextjs}
      
 alt="NEXT JS Icon"
/>
<Image className='w-[34px] object-contain'
 src={tailwind}
      
 alt="NEXT JS Icon"
/>
<p className='text-white  text-[0.9rem] text-center'>
by  <span className='font-bold text-gray-200'>James Adrian Denoy </span>
</p>
    </div>
    <div className='flex flex-row justify-center items-center '>
<a href="https://web.facebook.com/jamesdenoy12/" target="_blank" rel="noopener noreferrer" className="icon-link" >
  <FontAwesomeIcon icon={faFacebook} className="text-black m-2 text-xl animate-custom-bounce bg-gray-500 rounded-full p-2 "  />
</a>

    <a href="https://www.instagram.com/dr1annnnnnn/" target="_blank" rel="noopener noreferrer" className="icon-link" >
    <FontAwesomeIcon icon={faInstagram} className="text-black m-2  text-[1.25rem] animate-custom-bounce  bg-gray-500  rounded-full p-2" />
    </a>
    <a href="https://github.com/dr1ann" target="_blank" rel="noopener noreferrer" className="icon-link"  >
    <FontAwesomeIcon icon={faGithub} className="text-black m-2 text-xl animate-custom-bounce bg-gray-500  rounded-full p-2" />
    </a>
    <a href="mailto:jamesdenoy56@gmail.com" target="_blank" rel="noopener noreferrer" className="icon-link"  >
    <FontAwesomeIcon icon={faEnvelope} className="text-black  text-[1.15rem] animate-custom-bounce  m-2 bg-gray-500 rounded-full p-2" />

    </a>

    </div>
       </footer>

    </div>
    </body>
    
  );
}


