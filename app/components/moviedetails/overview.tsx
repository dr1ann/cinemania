'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';


// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


// Images
import icon from './Images/icon.png';
import star from './Images/star.png';
import tmdbicon from './Images/tmdb.png';
import blackscreen from './Images/black-screen.png';
import loadingbar from './Images/loading-11.gif';

//Components
import Modal from './Trailer_Modal';



const Overview = () => {

  //use states
  const searchParams = useSearchParams();
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [movieVid, setMovieVid] = useState<any>({});
  const [movielogo, setmovieLogo] = useState<any>({});
  const [movieSoc, setMovieSoc] = useState<any>({});
  const [navbar, setNavbar] = useState(false);
  const [color, setColor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currmovieID, setcurMovieID] = useState<any>({})




  //change color of header when scrolled
  const changeColor = () => {
    if(window.scrollY) {
      setColor(true)
    } else {
      setColor(false)
    }
  }


  //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });


  useEffect(() => {

    

    //get the current movie id from the searchParams
    setcurMovieID(searchParams.get('id'))
    window.addEventListener('scroll', changeColor)

    //fetch all data from the api
    const DataFromAPI = async () => {
      

      try {

        //the current movie id
        const currID = searchParams.get('id');
        const apiPromises = [
          axiosInstance.get(`/movie/${currID}?language=en-US`), //MovieDetails
          axiosInstance.get(`/movie/${currID}/videos?language=en-US`), //MovieVids
          axiosInstance.get(`/movie/${currID}/images`), //MovieLogo
          axiosInstance.get(`/movie/${currID}/external_ids`), //MovieSocMed
      
        ];
    
        const [MovieDetails, MovieVids, MovieLogo, MovieSocMed   ] = await Promise.all(apiPromises);
    
        //getting the data from the API and put values on to its assigned variables
        setMovieDetails(MovieDetails.data);
        setMovieVid(MovieVids.data);
        setmovieLogo(MovieLogo.data);
        setMovieSoc(MovieSocMed.data);
   

        setIsLoading(false); // Webpage now shows data after data is fetched
    
       
      } catch (error) {
        console.error('Error fetching data:', error); // Catch errors if data is not fetched
      }
      
      
    };
    //call the function to get all the data
    DataFromAPI();

   //create new function to get the id of the current movie
   
  }, [searchParams.get('id')]);

 


  //convert the number to hours and minutes ex.2h 7m
  function time_convert(num: number)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + "h" + " " + minutes + "m";         
}

//get the genre names array and separate them
  const genreNames = movieDetails && movieDetails.genres && movieDetails.genres.map((genres: { id: number, name: string }) => genres.name);
const separtedNames = genreNames && genreNames.join( ' ' + '•' + ' ')

  //get only the first movie logo
  const firstLogo = movielogo && movielogo.logos && movielogo.logos[0];
 


 //get only the important crew members from the movie 





  //get the bg image of the movie
  const bgImage = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
  //get the logo image of the movie
  const logoImage = firstLogo && firstLogo.file_path && `https://image.tmdb.org/t/p/original${firstLogo.file_path}`
  return (
    
     
<div>
  {isLoading  ?
           <div className='h-screen flex flex-col  items-center relative'>

           <SkeletonTheme baseColor="#202020" highlightColor="#444">
           
           <Skeleton   style={{ height: '100vh', width: '100vw' }}  className='rounded-xl '/>
           
             </SkeletonTheme>
                 
            
           
                 </div>
         :
         <div>
         <div className='movdetpic relative home-animate pop' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414),url(${bgImage ? bgImage : blackscreen })` }}>
 <div className="fade-effectcp md:hidden"></div>
  <div className="fade-effect2 hidden md:block"></div>
    <div className="fade-effect1"></div>
    <div className="fade-effect3 hidden md:block"></div>
    <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} getMovieID={currmovieID}  />
<Headroom>
      <nav id='changeHeight' className={color ? 'new-bg' : 'myHeader'} >
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
   
    <div className='home-animate pop flex flex-col flex-wrap justify-center items-start  sm:items-center md:items-start py-10  md:px-6 pt-[40vh] md:h-screen  md:max-w-[50%] md:pt-0 md:mt-10 z-10'>
{logoImage ? 
 <Image className=' w-[70%] flex self-center md:self-start px-2 z-10' 
 src={logoImage}
 alt='image'
       width={1}
       height={1}
/>
: 
''
}
   

  
   
<h1 className='text-[1.5rem] font-bold  mt-[10px] md:mt-[30px]  2xl:text-[2.5rem] px-4 md:px-0 z-10'>{movieDetails.original_title}</h1>
<div className='flex flex-row items-center justify-start px-4 md:px-0'>
  <div className='flex flex-row flex-wrap gap-2 text-[0.85rem] 2xl:text-[1.2rem] z-10'>
    {movieDetails['release_date'] ?
  <p className=''>{new Date(movieDetails['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  :
  ''
  }

 {separtedNames ?
  <span className=''>│ {separtedNames} </span>
  :
  ''
  }
   {movieDetails.runtime?
 <span>│ {time_convert(movieDetails.runtime)}</span>
  :
  ''
  }


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
          {movieDetails.vote_average
          
          ?
          <p className='mr-4 2xl:text-[1.2rem]'>{movieDetails.vote_average && movieDetails.vote_average.toFixed(1)}</p>
          :
          <p className='mr-4 2xl:text-[1.2rem]'>N/A</p>
          }

         {movieVid ?
        <button className='border-2 border-[#e2b616] px-2 rounded-xl text-[0.85rem] 2xl:text-[1.2rem] pb-[2px] pt-[1px]' onClick={() =>  setIsOpen(true)}> ▷ Random Trailer</button>
        :
        <p className='px-2 text-[0.85rem] 2xl:text-[1.2rem]'> No Trailer Available</p>
        }

</div>

{movieDetails.overview ?
  <p className='text-[0.85rem] mx-auto  md:text-[1rem] 2xl:text-[1.5rem] mt-2 px-4 md:px-0 sm:px-0 sm:w-[70%] md:w-full z-10'>{movieDetails.overview}</p>
  :
  <p className='text-[0.85rem] mx-auto  md:text-[1rem] 2xl:text-[1.5rem] mt-2 px-4 md:px-0 sm:px-0 sm:w-[70%] md:w-full z-10'>No overview available</p>
}



</div>

<div className='px-4 home-animate pop'>
<div className=' grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-6 px-4  items-center movdet justify-center mx-auto py-2 shadow-3xl shadow-[#e2b616] rounded-xl w-fit z-20'>
  
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
    <p className='text-gray-400 '>Status</p>
    <span>{movieDetails.status ? movieDetails.status :  'N/A'} </span>

  </div>
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Release Date</p>
    <span>{movieDetails['release_date'] ? new Date(movieDetails['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }): 'N/A'}</span>
    </div>

   

    <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Budget</p>
  <span>{movieDetails.budget ? '$' + movieDetails.budget.toLocaleString() : '-'}</span>
    </div>

    <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Revenue</p>
    <span>{movieDetails.revenue ? '$' + movieDetails.revenue.toLocaleString() : '-'}</span>
    </div>

    <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400'>Popularity</p>
    <span>{movieDetails.popularity ? movieDetails.popularity.toFixed(2).replace(/\.0$/, '') : 'N/A'}</span>
    </div>

    <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Vote Count</p>
    <span>{movieDetails.vote_count ? movieDetails.vote_count.toLocaleString() : 'N/A'}</span>
    </div>
   
    {movieSoc.facebook_id || movieSoc.instagram_id || movieSoc.twitter_id ?
   <div className='md:hidden flex items-center justify-center text-[0.85rem]'>
    <p>Discover More ➠</p>
   </div>

   :
   ''
}
{movieSoc.facebook_id || movieSoc.instagram_id || movieSoc.twitter_id ?
    <div className='flex flex-row justify-center items-center gap-6  md:w-full'>
 
 <p className='hidden md:block 2xl:text-[1.5rem]'>Discover More ➨</p>

   

{movieSoc.facebook_id ?
  <a href={`https://facebook.com/${movieSoc.facebook_id}` } target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faFacebook} className="text-white text-[1.5rem]  md:text-[1.75rem] 2xl:text-[2rem]"  />
  </a>
:
''
}
{movieSoc.instagram_id ?
  <a href={`https://instagram.com/${movieSoc.instagram_id}` } target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faInstagram} className="text-white text-[1.5rem]  md:text-[1.75rem] 2xl:text-[2rem]"  />
  </a>
:
''
}
{movieSoc.twitter_id ?
  <a href={`https://twitter.com/${movieSoc.twitter_id}` } target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faTwitter} className="text-white text-[1.5rem] md:text-[1.75rem] 2xl:text-[2rem]"  />
  </a>
:
''
}

</div>
:
''
}

</div>

</div>
</div>
  }
 
</div>
   );
}
export default Overview;