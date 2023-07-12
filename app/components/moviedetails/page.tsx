'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub  } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import loadingbar from './Images/loading-11.gif'
import icon from './Images/icon.png'
import star from './Images/star.png';
import tmdbicon from './Images/tmdb.png';
import nextjs from './Images/nextjs.png'
import tailwind from './Images/tailwind.png'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';
export default function Page() {

  const searchParams = useSearchParams();
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [movieVid, setMovieVid] = useState<any>({});
  const [movielogo, setmovieLogo] = useState<any>({});
  const [movieSoc, setMovieSoc] = useState<any>({});
  const [navbar, setNavbar] = useState(false);
  const [color, setColor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //change color of header when scrolled
  const changeColor = () => {
    if(window.scrollY) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeColor)

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${searchParams.get('id')}?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
            },
          }
        );
        const data = await response.json();
        setMovieDetails(data);
          
      } catch (error) {
        console.error(error);
      }
    };
    const fetchMovieVid = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${searchParams.get('id')}/videos?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
            },
          }
        );
        const data = await response.json();
        setMovieVid(data);
       setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    const movieLogo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${searchParams.get('id')}/images`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
            },
          }
        );
        const data = await response.json();
        setmovieLogo(data);
       
      } catch (error) {
        console.error(error);
      }
    };

    const movieSocMed = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${searchParams.get('id')}/external_ids`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
            },
          }
        );
        const data = await response.json();
        setMovieSoc(data);
       
      } catch (error) {
        console.error(error);
      }
    };


    fetchMovieDetails();
    fetchMovieVid();
    movieLogo();
    movieSocMed();
  }, [searchParams]);
  console.log(movieDetails)

  function time_convert(num: number)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + "h" + " " + minutes + "m";         
}
  const genreNames = movieDetails && movieDetails.genres && movieDetails.genres.map((genres: { id: number, name: string }) => genres.name);
const separtedNames = genreNames && genreNames.join( ' ' + '•' + ' ')
  const lastVideo = movieVid && movieVid.results && movieVid.results[movieVid.results.length - 1];
  const firstLogo = movielogo && movielogo.logos && movielogo.logos[0];
console.log(movieSoc)
  const bgImage = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
  const logoImage = firstLogo && firstLogo.file_path && `https://image.tmdb.org/t/p/original${firstLogo.file_path}`
  return (
    
      <body>
   
      
      {isLoading ?
           <div className='h-screen movdbg flex flex-col justify-center items-center'  >
      
             <Image className=' w-[35%] object-contain'
        src={loadingbar}
        alt='laoding bar'
        width={1}
        height={1}
        
        />
    
       
         </div>
         :
<div>
 
  <div className='movdetpic relative home-animate pop' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414),url(${bgImage})` }}>
 <div className="fade-effectcp md:hidden"></div>
  <div className="fade-effect2 hidden md:block"></div>
    <div className="fade-effect1"></div>
    <div className="fade-effect3 hidden md:block"></div>
<Headroom>
      <nav className={color ? 'new-bg' : 'myHeader'} >
      <div className="justify-between py-4 z-30 px-4 md:items-center md:flex md:px-8  ">
        <div>
          <div className="flex items-center justify-between   md:block" >
            <div className='flex flex-row'>
        
            <Image
            className='w-[6.25rem] h-full md:w-[11.25rem] object-contain'
    src={icon}
    width={1}
    height={1}
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
   



  

    </div>
   
    <div className='flex flex-col flex-wrap justify-center items-start  sm:items-center md:items-start py-10  md:px-6 pt-[40vh] md:h-screen  md:max-w-[50%] md:pt-0 md:mt-10 z-10'>

    <img className=' object-contain w-[70%] flex self-center md:self-start px-2 z-10' 
      src={logoImage}
      alt='image'
   
    />

  
    
<h1 className='text-[1.5rem] font-bold  mt-[10px] md:mt-[30px] 2xl:text-[2.5rem] px-4 md:px-0 z-10'>{movieDetails.original_title}</h1>
<div className='flex flex-row items-center justify-start px-4 md:px-0'>
  <div className='flex flex-row flex-wrap gap-2 text-[0.85rem] 2xl:text-[1.2rem] z-10'>
<p className=''>{new Date(movieDetails['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
<span className=''>│ {separtedNames} </span>
<span>│ {time_convert(movieDetails.runtime)}</span>
</div>
</div>


<div className='flex flex-row flex-wrap items-center mt-2 px-4 md:px-0 z-10'>
<Image
         className=' w-[6rem] object-contain 2xl:w-[8rem]'
         src={tmdbicon}
         alt='home icon'
         width={1}
         height={100}
        
          />
<Image
         className='h-[1rem] w-[1rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem] object-contain'
         src={star}
         alt='home icon'
         width={1}
         height={100}
        
          />
<p className='mr-4 2xl:text-[1.2rem]'>{movieDetails.vote_average && movieDetails.vote_average.toFixed(1)}</p>
<button className='border-2 border-[#e2b616] px-2 rounded-xl text-[0.85rem] 2xl:text-[1.2rem] py-[2px]'> ▷ Random Trailer</button>
</div>

<p className='text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem] mt-2 px-4 md:px-0 sm:px-0 sm:w-[70%] md:w-full z-10'>{movieDetails.overview}</p>

</div>


<div className='flex flex-row flex-wrap gap-6 px-4 items-center justify-start mx-auto py-2 border-2 border-[#e2b616] w-[80%] z-20'>
  
  <div className='flex flex-col items-start'>
    <p>Status</p>
    <span>{movieDetails.status}</span>

  </div>
  <div className='flex flex-col items-start'>
  <p>Release Date</p>
    <span>{new Date(movieDetails['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>

   

    <div className='flex flex-col items-start'>
  <p>Budget</p>
    <span>{movieDetails.budget && '$' + movieDetails.budget.toLocaleString()}</span>
    </div>

    <div className='flex flex-col items-start'>
  <p>Revenue</p>
    <span>{movieDetails.revenue && '$' + movieDetails.revenue.toLocaleString()}</span>
    </div>

    <div className='flex flex-col items-start'>
  <p>Popularity</p>
    <span>{movieDetails.popularity && movieDetails.popularity.toFixed(1)}</span>
    </div>

    <div className='flex flex-col items-start'>
  <p>Vote Count</p>
    <span>{movieDetails.vote_count && movieDetails.vote_count.toLocaleString()}</span>
    </div>
    <div className='flex flex-row justify-end items-end float-right'>
<a href={`https://facebook.com/${movieSoc}`}>asd</a>
<a href={`https://facebook.com/${movieSoc}`}>asasdad</a>
</div>
</div>





<footer className='pt-[3.5rem] flex flex-col justify-center items-center gap-2 z-20'>

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
  }
  
        
       </body>
  );
}