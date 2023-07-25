'use client'
// External Libraries
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Headroom from 'react-headroom';
import Modal from './Random-Trailer_Modal';
import VidTrailer from './Videos'
import VideosLoading from '../Loaders/VideosLoading'
import PostersLoading from '../Loaders/PosterLoading'
interface MovieVideos {
    id?: string
    key?: string
    
}
interface MovieImgs {
  file_path?:string
  id?: number
}
export default function Media() {
    const searchParams = useSearchParams();
    const [movieImages, setMovieImages] = useState<any>({});
    const [MovieVids, setMovieVids] = useState<any>({});
    const [currmovieID, setcurMovieID] = useState<any>({})
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMovieKey, setSelectedMovieKey] =useState<string>('')
    const [movieVidsReady, setMovieVidsReady] = useState(false);
  const [movieImagesReady, setMovieImagesReady] = useState(false);

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
    
          setMovieVids(MovieVids.data);
          setMovieImages(MovieImages.data)
        
          setMovieVidsReady(true);
          setMovieImagesReady(true);
         
        } catch (error) {
          console.error('Error fetching data:', error); // Catch errors if data is not fetched
        } 
        
      };
      //call the function to get all the data from the api
      DataFromAPI();
  },[] );


  const seededRandom = (min: number, max: number, seed: number) => {
    const random = (seed * 9301 + 49297) % 233280;
    const scaledRandom = min + (random / 233280) * (max - min);
    return Math.floor(scaledRandom);
  };
  
  // Check if movieImages.posters is available and has a length greater than 0
  const postersArray = movieImages?.posters || [];
  const postersCount = postersArray.length;
  
  // Calculate the startIndex, making sure it is within the bounds of the array
  const startIndex = seededRandom(0, Math.max(0, postersCount - 50), currmovieID);
  
  // Calculate the number of posters to slice, considering the available posters
  let numberOfPostersToSlice = 0;
  if (postersCount >= 50) {
    // If there are 50 or more posters available, generate a random number between 50 and 65
    numberOfPostersToSlice = 50 + seededRandom(0, 16, currmovieID); // 16 (65 - 50) to have a range from 50 to 65
  } else {
    // If there are fewer than 50 posters, take all available posters
    numberOfPostersToSlice = postersCount;
  }
  
  // Get the subset of posters starting from the randomly generated index
  const randomPostersSubset = postersArray.slice(startIndex, startIndex + numberOfPostersToSlice);
  




  let vidLength =  MovieVids && MovieVids.results &&MovieVids.results.length 
  let ImgLength =  randomPostersSubset && randomPostersSubset.length
  //handler when the option is changed
  const [selectedOption, setSelectedOption] = useState<string>('Videos');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  console.log(movieImages)
  console.log(MovieVids)
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
        
        {ImgLength ?  `Posters  ${ImgLength}` : 'Posters 0'}
         </label>
       </div>
     
       </div>
       {selectedOption === 'Videos' && 
       <div>
        {!movieVidsReady ? 
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-4'>

   {Array.from({ length: 10 }).map((_, index) => (
     <VideosLoading key={index} />
   ))}
       
       </div> 
       
    :
       <div className='flex flex-row overflow-x-scroll  p-10 gap-4 relative'>
      {MovieVids && MovieVids.results && MovieVids.results.length  > 0 ? (
      
   
 MovieVids.results && MovieVids.results.map((movieVid: MovieVideos) => (

        <div key={movieVid.id} className='animate pop max-w-[20rem] min-w-[20rem] min-h-[11.25rem] max-h-[11.25rem] vids relative flex justify-center items-center  rounded-xl' style={{ backgroundImage: `url(https://i.ytimg.com/vi/${movieVid.key}/hqdefault.jpg)` }}>
           <button className='trailer-button' onClick={() => { 
            if(movieVid.key !== undefined) {
             setSelectedMovieKey(movieVid.key); setIsOpen(true); }}
            }>
  <i>
    <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-play pl-[1.5px]" color="#fff">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </i>
</button>

        </div>
        
 ))
 ) : (
  // Fallback content to display when movie videos is empty

    <p className='animate pop text-center text-[1.5rem] absolute top-0 right-0 bottom-0 left-0'>No videos available</p>
 
)}  


</div>
}
</div>
  }
  {selectedOption === 'Posters' && 
       <div>
          {!movieImagesReady ? 
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-4'>

   {Array.from({ length: 10 }).map((_, index) => (
     <PostersLoading key={index} />
   ))}
       
       </div> 
       
    :
    
    <div className='flex flex-row overflow-x-scroll p-10 gap-4 relative'>
    {randomPostersSubset && randomPostersSubset.length > 0 ? (
      randomPostersSubset.map((movieImg: MovieImgs) => (
        <div
          key={movieImg.file_path}
          className='animate pop max-w-[10rem] rounded-xl min-w-[10rem] min-h-[250px] max-h-[250px] relative flex justify-center items-center'
        >
          <Image
            onClick={() => window.open(`https://image.tmdb.org/t/p/original${movieImg.file_path}`, '_blank')}
            src={`https://image.tmdb.org/t/p/original${movieImg.file_path}`}
            alt='posters'
            className='w-full h-full rounded-xl cursor-pointer hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'
            width={1}
            height={1}
          />
        </div>
      ))
    ) : (
      // Fallback content to display when randomPostersSubset is empty
 
        <p className='animate pop text-center text-[1.5rem] absolute top-0 right-0 bottom-0 left-0'>No posters available</p>
     
    )}
  </div>
 

}

</div>

  }
  
  

    </div>
    
  )
}
