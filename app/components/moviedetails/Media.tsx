'use client'
// External Libraries
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';
import Modal from './Trailer_Modal';
import VidTrailer from './VidTrailer'
interface MovieVideos {
    id?: number
    key?: string
    
}
interface MovieImgs {
  file_path?:string
    
}
export default function Media() {
    const searchParams = useSearchParams();
    const [movieImages, setMovieImages] = useState<any>({});
    const [MovieVids, setMovieVids] = useState<any>({});
    const [currmovieID, setcurMovieID] = useState<any>({})
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMovieKey, setSelectedMovieKey] =useState<string>('')
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
    const DataFromAPI = async () => {
      

        try {
  
          //the current movie id
          const currID = searchParams.get('id');
  
          const apiPromises = [
       
            axiosInstance.get(`/movie/${currID}/videos?language=en-US`), //MovieVids
            axiosInstance.get(`/movie/${currID}/images`), //MovieImages
           
        
          ];
        //getting the data from the API and put values on to its assigned variables
          const [MovieVids, MovieImages] = await Promise.all(apiPromises);
    
          setMovieVids(MovieVids.data)
          setMovieImages(MovieImages.data)
      
       
         
        } catch (error) {
          console.error('Error fetching data:', error); // Catch errors if data is not fetched
        }
        
      };
      //call the function to get all the data from the api
      DataFromAPI();
  }, );
 // Use the movieId as a seed value for the random number generator
const seededRandom = (min: number, max: number, seed: number) => {
    const random = (seed * 9301 + 49297) % 233280;
    const scaledRandom = min + (random / 233280) * (max - min);
    return Math.floor(scaledRandom);
  };
  
  // Generate the random start index using the seeded random function
  const startIndex = seededRandom(0, movieImages && movieImages.posters && movieImages.posters.length - 50, currmovieID);
  
  // Get the subset of 50 to 60 posters starting from the randomly generated index
  const randomPostersSubset = movieImages && movieImages.posters && movieImages.posters.slice(
    startIndex,
    startIndex + 50 + seededRandom(0, 11, currmovieID)
  );
  let vidLength =  MovieVids && MovieVids.results &&MovieVids.results.length 
  let ImgLength =  randomPostersSubset && randomPostersSubset.length
  //handler when the option is changed
  const [selectedOption, setSelectedOption] = useState<string>('Videos');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className='relative'>
         <VidTrailer isVisible={isOpen} onClose={() => setIsOpen(false)} selectedMovieKey={selectedMovieKey} />
        <h1  className='mt-10 px-10 mb-4 text-2xl font-bold'>Media</h1>
        <div className='inline-flex items-center  ml-[2.5rem]   justify-start gap-4 rounded-xl'>
       
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'Videos' ? 'active1' : 'notactive'}>
           <input
           className='selector-item_radio'
             type="radio"
             value="Videos"
             checked={selectedOption === 'Videos'}
             onChange={handleOptionChange}
           />
            
            {vidLength ?  `Videos ${vidLength}` : 'Videos 0'}
         </label>
       </div>
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'Posters' ? 'active1' : 'notactive'} >
           <input
           className='selector-item_radio'
          
             type="radio"
             value="Posters"
             checked={selectedOption === 'Posters'}
             onChange={handleOptionChange}
           />
        
        {vidLength ?  `Posters  ${ImgLength}` : 'Posters 0'}
         </label>
       </div>
     
       </div>
       {selectedOption === 'Videos' && 
       <div>
       <div className='flex flex-row overflow-x-scroll  p-10 gap-4 '>
      
 {MovieVids.results && MovieVids.results.map((movieVid: MovieVideos) => (

        <div className='max-w-[20rem] min-w-[20rem] min-h-[11.25rem] max-h-[11.25rem] vids relative flex justify-center items-center  rounded-xl' style={{ backgroundImage: `url(https://i.ytimg.com/vi/${movieVid.key}/maxresdefault.jpg)` }}>
           <button className='trailer-button' onClick={() => { 
            if(movieVid.key !== undefined) {
             setSelectedMovieKey(movieVid.key); setIsOpen(true); }}
            }>
  <i>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-play" color="#fff">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </i>
</button>

        </div>
        
 ))
        
}

</div>
</div>
  }
  {selectedOption === 'Posters' && 
       <div>
       <div className='flex flex-row overflow-x-scroll  p-10 gap-4 '>
      
 {randomPostersSubset && randomPostersSubset.map((movieImg: MovieImgs) => (

        <div className='max-w-[10rem] rounded-xl min-w-[10rem] min-h-[250px] max-h-[250px]  relative flex justify-center items-center '>
           <Image
           src={  `https://image.tmdb.org/t/p/original${movieImg.file_path}`}
           alt='posters'
            className=' w-full h-full rounded-xl'
           width={1}
           height={1}
           />


        </div>
        
 ))
        
}

</div>
</div>
  }
  


    </div>
  )
}
