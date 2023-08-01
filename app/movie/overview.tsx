'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';


// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


// Images
import star from '../Images/star.png';
import tmdbicon from '../Images/tmdb.png';


//Components
import Modal from './Random-Trailer_Modal';
import Header from '../components/Header';
import HomeLoading from '../components/Loaders/HomeLoading';

const Overview =   () => {

  //use states
  const searchParams = useSearchParams();
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [movieVid, setMovieVid] = useState<any>({});
  const [movielogo, setmovieLogo] = useState<any>({});
  const [movieSoc, setMovieSoc] = useState<any>({});

  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currmovieID, setcurMovieID] = useState<any>({})




 


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
  
  useEffect(() => {



    //get the current movie id from the searchParams
    setcurMovieID(searchParams.get('id'))


 
    //call the function to get all the data
    DataFromAPI();


   
  }, []);




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
  const bgImage = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
  //get the logo image of the movie
  const logoImage = firstLogo && firstLogo.file_path && `https://image.tmdb.org/t/p/w500${firstLogo.file_path}`
  return (
    
     
<div>
  {isLoading  ?
       <HomeLoading />
         :
         <div>
          {movieDetails && movieDetails.backdrop_path ?
          
        
         <div className='movdetpic relative home-animate pop' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414),url(${bgImage})` }}>
 <div className="fade-effectcp md:hidden"></div>
  <div className="fade-effect2 hidden md:block"></div>
    <div className="fade-effect1"></div>
    <div className="fade-effect3 hidden md:block"></div>
    <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} getMovieID={currmovieID}  />
 <Header/>
   

    


  

    </div>
  
   :
   
   <div className='nobackdrop relative home-animate pop' style={{ backgroundImage: `linear-gradient(180deg,transparent,#141414),url('https://via.placeholder.com/220x330/141414/808080/?text=BACKDROP N/A')` }}>
 <div className="fade-effectcp md:hidden"></div>
  <div className="fade-effect2 hidden md:block"></div>
    <div className="fade-effect1"></div>
    <div className="fade-effect3 hidden md:block"></div>
 <Header/>
   

    

    </div>
  }
    <div className='home-animate pop flex flex-col  justify-center items-start  sm:items-center md:items-start py-10  md:px-6 pt-[40vh]  md:min-h-screen   md:max-w-[50%] md:pt-0 md:mt-10 z-10'>
{logoImage ? 
  <Image className='w-[70%]  max-h-[200px] object-contain flex self-center md:self-start px-2 z-10 md:mt-10' 
  src={logoImage}
  alt='image'
        width={1}
        height={1}
        priority
 />
: 
''
}
   

  
   
<h1 className='text-[1.5rem] font-bold  mt-[10px] md:mt-[30px] md:text-[2rem]  2xl:text-[2.5rem] px-4 md:px-0 z-10'>{movieDetails.original_title ? movieDetails.original_title : 'N/A' }</h1>
<div className='flex flex-row items-center justify-start px-4 md:px-0'>
  <div className='flex flex-row flex-wrap gap-2 text-[0.85rem] md:text-[1rem] 2xl:text-[1.2rem] z-10'>
    {movieDetails['release_date'] ?
  <p className=''>{new Date(movieDetails['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  :
  'N/A'
  }

 {separtedNames ?
  <span className=''>│ {separtedNames} </span>
  :
  '│N/A'
  }
   {movieDetails.runtime?
 <span>│ {time_convert(movieDetails.runtime)}</span>
  :
  '│ N/A'
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

         {movieVid && movieVid.results && movieVid.results.length > 0 ?
        <button className='bg-[#1a1a1a] px-[10px] rounded-xl inline-flex items-center justify-center gap-[6px] text-[0.85rem] md:text-[1rem] 2xl:text-[1.2rem] py-[2.5px] hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10' onClick={() =>  setIsOpen(true)}> 
        <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play" color="#fff">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
         Random Trailer</button>
        :
        <p className='px-2 text-[0.85rem] md:text-[1rem] 2xl:text-[1.2rem]'> No Trailer Available</p>
        }

</div>

{movieDetails.overview ?
  <p className='text-[0.85rem] mx-auto  md:text-[1rem] 2xl:text-[1.5rem] mt-2 px-4 md:px-0 sm:px-0 sm:w-[70%] sm:text-center md:text-left md:w-full z-10'>{movieDetails.overview}</p>
  :
  <p className='text-[0.85rem] mx-auto  md:text-[1rem] 2xl:text-[1.5rem] mt-2 px-4 md:px-0 sm:px-0 sm:w-[70%] md:w-full z-10'>No overview available</p>
}



</div>

<div className='px-4 home-animate pop'>
<div className=' grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-6 px-4  items-center movdet justify-center mx-auto py-2 bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl w-fit z-20'>
  
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
  <a className='hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10' href={`https://facebook.com/${movieSoc.facebook_id}` } target="_blank" rel="noopener noreferrer ">
<FontAwesomeIcon icon={faFacebook} className="text-white text-[1.5rem]  md:text-[1.75rem] 2xl:text-[2rem] "  />
  </a>
:
''
}
{movieSoc.instagram_id ?
  <a className='hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10' href={`https://instagram.com/${movieSoc.instagram_id}` } target="_blank" rel="noopener noreferrer">
<FontAwesomeIcon icon={faInstagram} className="text-white text-[1.5rem]  md:text-[1.75rem] 2xl:text-[2rem]"  />
  </a>
:
''
}
{movieSoc.twitter_id ?
  <a className='hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10' href={`https://twitter.com/${movieSoc.twitter_id}` } target="_blank" rel="noopener noreferrer">
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