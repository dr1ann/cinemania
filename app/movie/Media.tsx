'use client'
// External Libraries
import React, { useState, Suspense, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import  {Drawer} from 'vaul'
//Components
import VidTrailer from './Videos'
import VideosLoading from '../components/Loaders/VideosLoading'
import PostersLoading from '../components/Loaders/PosterLoading'

//types
interface MovieVideos {
    id?: string
    key?: string
    
}
interface MovieImgs {
  file_path?:string
  id?: number
}
const Media =  () => {
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
  //geting the data from the API
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
  useEffect(() => {
     //get the current movie id from the searchParams
     setcurMovieID(searchParams.get('id'))
  
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
  



  //get the length of vid and img
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
        <h1  className='mt-10 px-6 sm:px-10 mb-4 text-[1.2rem] sm:text-2xl font-bold'>Media</h1>
        <div className='inline-flex items-center  ml-6 sm:ml-10   justify-start gap-4 rounded-xl'>
       
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
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-6 sm:p-10 gap-4'>

   {Array.from({ length: 10 }).map((_, index) => (
     <VideosLoading key={index} />
   ))}
       
       </div> 
       
    :
       <div className='flex flex-row overflow-x-scroll  p-6  sm:p-10 gap-4 relative'>
      {MovieVids && MovieVids.results && MovieVids.results.length  > 0 ? (
      
   
 MovieVids.results && MovieVids.results.map((movieVid: MovieVideos) => (

        <div key={movieVid.id} className='animate pop max-w-[20rem] min-w-[20rem] min-h-[11.25rem] max-h-[11.25rem] vids relative flex justify-center items-center  rounded-xl' style={{ backgroundImage: `url(https://i.ytimg.com/vi/${movieVid.key}/hqdefault.jpg)` }}>
           <button className='trailer-button' onClick={() => { 
            if(movieVid.key !== undefined) {
             setSelectedMovieKey(movieVid.key); setIsOpen(true); }}
            }>
  <i>
    <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play pl-[1.5px]" color="#fff">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </i>
</button>

        </div>
        
 ))
 ) : (
  // Fallback content to display when movie videos is empty

    <p className='animate pop text-center text-[1rem] centered-text sm:text-[1.5rem]'>No videos available</p>
 
)}  


</div>
}
</div>
  }
  {selectedOption === 'Posters' && 
       <div>
          {!movieImagesReady ? 
   <div className='flex flex-row justify-start overflow-x-scroll  items-center p-6 sm:p-10 gap-4'>

   {Array.from({ length: 10 }).map((_, index) => (
     <PostersLoading key={index} />
   ))}
       
       </div> 
       
    :
    
    <div className='flex flex-row overflow-x-scroll p-6 sm:p-10 gap-4 relative'>
  {randomPostersSubset && randomPostersSubset.length > 0 ? (
    <>
      {randomPostersSubset.slice(0, 15).map((movieImg: MovieImgs) => (
        <div
          key={movieImg.file_path}
          className='animate pop rounded-xl max-w-[9.375rem]  min-w-[9.375rem] min-h-[225px] max-h-[225px] relative flex justify-center items-center'
        >
          {movieImg.file_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movieImg.file_path}`}
              className='w-full h-full rounded-xl cursor-pointer hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'
              srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movieImg.file_path} 1x, https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieImg.file_path} 2x`}
              loading='eager'
              alt={movieImg.file_path}
              onClick={() =>
                window.open(`https://image.tmdb.org/t/p/original${movieImg.file_path}`, '_blank')
              }
            />
          ) : (
            <div className='max-w-full min-w-full rounded-t-xl max-h-[225px] min-h-[225px] flex self-center  overflow-hidden'>
              <Image
                src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
                className='w-full h-full'
                loading='eager'
                alt='movie poster'
              />
            </div>
          )}
        </div>
      ))}
      {/* Add the second condition here */}
      {randomPostersSubset && randomPostersSubset.length >= 19 ? (
        <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button className='max-w-[8.625rem] min-w-[8.625rem]'>View More ➠</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-[#141414] z-[99999999] flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px]">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#3F3F3F] mb-4 mt-2"  />
            <div className="grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-[repeat(3,1fr)] sm:grid  sm:grid-cols-morePosters tabletcollectionscreen:px-2 sm:px-0 mx-auto sm:w-[95%]   gap-2 sm:gap-4    overflow-y-scroll py-4 ">
            {randomPostersSubset && randomPostersSubset.slice(15).map((movieImg: MovieImgs) => (
               <div
               key={movieImg.file_path}
               className='animate pop rounded-xl max-w-[8rem]  min-w-[8rem] min-h-[190px] max-h-[190px]
               xsmallcpsize:max-w-[9.375rem]  xsmallcpsize:min-w-[9.375rem] xsmallcpsize:min-h-[225px] xsmallcpsize:max-h-[225px] 
               relative flex justify-center items-center'
             >
               {movieImg.file_path ? (
                 <img
                   src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movieImg.file_path}`}
                   className='w-full h-full rounded-xl cursor-pointer hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'
                   srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movieImg.file_path} 1x, https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieImg.file_path} 2x`}
                   loading='lazy'
                   alt={movieImg.file_path}
                   onClick={() =>
                     window.open(`https://image.tmdb.org/t/p/original${movieImg.file_path}`, '_blank')
                   }
                 />
               ) : (
                 <div className='max-w-full min-w-full rounded-t-xl max-h-[225px] min-h-[225px] flex self-center  overflow-hidden'>
                   <Image
                     src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
                     className='w-full h-full'
                     loading='lazy'
                     alt='movie poster'
                   />
                 </div>
               )}
             </div>
  ))
  
  }
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
   
      ) : (
        ''
      )}
    </>
  ) : (
    // Fallback content to display when randomPostersSubset is empty
    <p className='animate pop text-center text-[1rem] sm:text-[1.5rem] centered-text'>
      No posters available
    </p>
  )}
</div>

 

}

</div>

  }
  
  

    </div>
    
  )
}
export default Media;