'use client'

// External Libraries
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import  {Drawer} from 'vaul'

//Components
import VidTrailer from './Videos'
import VideosLoading from '@/app/components/Loaders/VideosLoading'
import PostersLoading from '@/app/components/Loaders/PosterLoading'

//API component
import { OverviewAPI } from '@/app/components/API/MovieDetailsAPI';



const Media = ({ id }: { id: number }) => {

    //use states
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMovieKey, setSelectedMovieKey] =useState<string>('')

  //get the values of the fetched data from the API
  const { movieVid, movieImages, movieVidsReady, movieImagesReady } = OverviewAPI(
    '',
    `/movie/${id}/videos?language=en-US`,
    `/movie/${id}/images`,
   
  );


  const seededRandom = (min: number, max: number, seed: number) => {
    const random = (seed * 9301 + 49297) % 233280;
    const scaledRandom = min + (random / 233280) * (max - min);
    return Math.floor(scaledRandom);
  };
  
  // Check if movieImages.posters is available and has a length greater than 0
  const postersArray = movieImages?.posters || [];
  const postersCount = postersArray?.length;
  
  // Calculate the startIndex, making sure it is within the bounds of the array
  const startIndex = seededRandom(0, Math.max(0, postersCount - 50), id);
  
  // Calculate the number of posters to slice, considering the available posters
  let numberOfPostersToSlice = 0;
  if (postersCount >= 50) {
    // If there are 50 or more posters available, generate a random number between 50 and 65
    numberOfPostersToSlice = 50 + seededRandom(0, 16, id); // 16 (65 - 50) to have a range from 50 to 65
  } else {
    // If there are fewer than 50 posters, take all available posters
    numberOfPostersToSlice = postersCount;
  }
  
  // Get the subset of posters starting from the randomly generated index
  const randomPostersSubset = postersArray.slice(startIndex, startIndex + numberOfPostersToSlice);
  


  //handler when the option is changed
  const [selectedOption, setSelectedOption] = useState<string>('Videos');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };


//give each poster a random id
const randomPosters = 
   randomPostersSubset?.map((randomPoster) => ({
    ...randomPoster,
    randomId: Math.floor(10000000 + Math.random() * 90000000)

  }))


  //get the length of vid and img
  let vidLength =movieVid?.results?.length 
  let ImgLength = randomPosters?.length


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
       <>
        {!movieVidsReady ? 
   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth items-center  p-6 sm:py-6 sm:px-10 gap-4'>

   {Array.from({ length: 15 }).map((_, index) => (
     <VideosLoading key={index} />
   ))}
       
       </div> 
       
    :
       <ul className='flex flex-row overflow-x-scroll scroll-smooth  p-6 sm:py-6 sm:px-10 gap-4 relative'>
      {movieVid?.results?.length  > 0 ? (
      
   
      movieVid?.results?.map((movieVid) => (

        <li key={movieVid.id} className='animate pop max-w-[20rem] min-w-[20rem] min-h-[11.25rem] 
        max-h-[11.25rem] vids relative flex justify-center items-center  rounded-xl'
         style={{ backgroundImage: movieVid.key ? `url(https://i.ytimg.com/vi/${movieVid.key}/hqdefault.jpg)`
        :
`linear-gradient(180deg,transparent,#3f3f3f), 
url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg)`
        }}>
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

        </li>
        
 ))
 ) : (
  // Fallback content to display when movie videos is empty

    <p className='home-animate pop text-center text-[1rem] centered-text sm:text-[1.2rem] 2xl:text-[1.5rem]'>No videos available</p>
 
)}  


</ul>
}
</>
  }
  {selectedOption === 'Posters' && 
       <>
          {!movieImagesReady ? 
   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth  items-center p-6 sm:py-6 sm:px-10 gap-4'>

   {Array.from({ length: 15 }).map((_, index) => (
     <PostersLoading key={index} />
   ))}
       
       </div> 
       
    :
    
    <ul className='flex flex-row overflow-x-scroll scroll-smooth p-6 sm:py-6 sm:px-10 gap-4 relative'>
  {randomPosters?.length > 0 ? (
    <>
      {randomPosters?.slice(0, 10).map((posters) => (
        <li key={posters.randomId}
          className='animate pop rounded-xl max-w-[9.375rem]  min-w-[9.375rem] min-h-[225px] max-h-[225px] relative flex justify-center items-center'
        >
          {posters.file_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${posters.file_path}`}
              className='w-full h-full rounded-xl cursor-pointer hover:rotate-[0deg] transform transition duration-250 hover:scale-110 hover:z-10'
              srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${posters.file_path} 1x,
               https://image.tmdb.org/t/p/w300_and_h450_bestv2${posters.file_path} 2x`}
              loading='eager'
              alt={posters.file_path}
              onClick={() =>
                window.open(`https://image.tmdb.org/t/p/original${posters.file_path}`, '_blank')
              }
            />
          ) : (
            <div className='max-w-full min-w-full  max-h-[225px] min-h-[225px] flex self-center  overflow-hidden'>
            <Image
              src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
              className='w-full h-full rounded-xl bg-[#3f3f3f]'
              loading='eager'
              fill
              alt='movie poster'
            />
          </div>
          )}
        </li>
      ))}
   
      {randomPosters?.length >= 12 ? (
        <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
        <button className='w-fit whitespace-nowrap  h-fit flex self-center hover:text-[#e2b616]'>View More ➠</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-[#141414] z-[99999999] flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px]">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#3F3F3F] mb-4 mt-2"  />
          <h1 className=' font-bold text-center text-[1.3rem] sm:text-[1.7rem]'>Posters</h1>
            <ul className="grid grid-cols-[repeat(2,1fr)] place-items-center tabletcollectionscreen:grid-cols-[repeat(3,1fr)] 
            sm:grid  sm:grid-cols-morePosters px-2
             mx-auto sm:w-[95%] gap-2   overflow-y-scroll scroll-smooth py-4 ">
            {randomPosters?.slice(10).map((other_posters) => (
               <li key={other_posters.randomId}
               className=' animate pop rounded-xl max-w-[8rem]  min-w-[8rem] min-h-[190px] max-h-[190px]
               xsmallcpsize:max-w-[9.375rem]  xsmallcpsize:min-w-[9.375rem] xsmallcpsize:min-h-[225px] xsmallcpsize:max-h-[225px] 
               relative flex justify-center items-center'
             >
               {other_posters.file_path ? (
                 <img
                   src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${other_posters.file_path}`}
                   className='w-full h-full rounded-xl cursor-pointer hover:rotate-[0deg] transform transition
                    duration-250
                    hover:scale-110 hover:z-10'
                   srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${other_posters.file_path} 1x,
                    https://image.tmdb.org/t/p/w300_and_h450_bestv2${other_posters.file_path} 2x`}
                   loading='lazy'
                   alt={other_posters.file_path}
                   onClick={() =>
                     window.open(`https://image.tmdb.org/t/p/original${other_posters.file_path}`, '_blank')
                   }
                 />
               ) : (
                <div className='max-w-full min-w-full  max-h-[225px] min-h-[225px] flex self-center  overflow-hidden'>
              <Image
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                className='w-full h-full rounded-xl bg-[#3f3f3f]'
                loading='eager'
                fill
                alt='movie poster'
              />
            </div>
               )}
             </li>
  ))
  
  }
            </ul>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
   
      ) : (
        ''
      )}
    </>
  ) : (
    // Fallback content to display when randomPosters is empty
    <p className='home-animate pop text-center text-[1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] centered-text'>
      No posters available
    </p>
  )}
</ul>

 

}

</>

  }
  
  

    </div>
    
  )
}
export default Media;