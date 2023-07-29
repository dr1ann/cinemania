'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';


// Images

import star from './Images/star.png';
import blackscreen from './Images/black-screen.png';

import CollectionLoading from '../components/Loaders/CollectionLoading';
//types

type movieCollection = {
    id: number;
    name: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
  }
const Collection = () => {

  //use states
  const searchParams = useSearchParams();
  const [movieDetails, setMovieDetails] = useState<any>({});

  const [isCollectionLoading, setIsCollectionLoading] = useState(true)
  const [collection, setCollection] = useState<any>({})
  const [isLoadingCardVisible, setIsLoadingCardVisible] = useState(true);





  //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });


  useEffect(() => {

    

 
   

    //fetch all data from the api
    const DataFromAPI = async () => {
      

      try {

        //the current movie id
        const currID = searchParams.get('id');

        const response =  await axiosInstance.get(`/movie/${currID}?language=en-US`) //MovieDetails
       
    
      
        setMovieDetails(response.data);

    
     
       
      } catch (error) {
        console.error('Error fetching data:', error); // Catch errors if data is not fetched
      }
      
    };
    //call the function to get all the data from the api
    DataFromAPI();

   //create new function to get the id of the current movie
   const movieCollection = async () => {
     
    try {
      const collectionId = movieDetails && movieDetails.belongs_to_collection && movieDetails.belongs_to_collection.id;
      
      //only get the collection data if the ID of the movie is there
      if (collectionId) {

      const response = await  axiosInstance.get(`/collection/${collectionId}`)
        
        setCollection(response.data);
        setIsCollectionLoading(false); //Collection now shows data in the webpage

      } 
     
    } catch (error) {
      console.error(error);
      
    }
    
  };
 

    movieCollection();
  
  
//call only the id value of the moviedetails object to prevent infinite loop when it re-renders
  }, [ movieDetails.id]);

console.log(collection && collection.parts)
 
  return (
    
    <div>

      
      { movieDetails && movieDetails.belongs_to_collection && movieDetails.belongs_to_collection.id 
   ?
   <div>
  {!isCollectionLoading

  ?
  
  
   
<div style={{backgroundPosition: 'center bottom 50%', backgroundAttachment:'fixed',
 backgroundImage: `linear-gradient(to top, rgba(7, 15, 21, 0.98), rgba(7, 15, 21, 0.85)),
 url(${collection['backdrop_path'] ? `https://image.tmdb.org/t/p/original${collection['backdrop_path']}` 
 : blackscreen })` }}
  className="relative flex flex-col  gap-0 sm:gap-10  lg:grid lg:grid-cols-2 lg:gap-0 place-content-center mt-16" >
    <div className="fade-effect-top-collection"></div>
    <div className="fade-effect-bottom-collection"></div>
  <div className='mt-4 sm:mt-0 z-[9999] flex flex-row items-center justify-center  gap-4  w-[95%] mx-auto lg:pr-4 lg:mr-0 lg:ml-auto'>
  <div className='hidden z-[9999] animate pop relative  max-w-[17rem] min-w-[17rem]  max-h-[400px] min-h-[400px] ml-4  sm:flex self-center   '>
    <Image
        className='max-w-full min-w-full rounded-xl max-h-full min-h-full'
        src={collection['poster_path'] ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${collection['poster_path']}` : "https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=Poster N/A"}
        alt={collection['poster_path']}
      loading='lazy'
      
      fill
        />
      </div>
   
    <div className='mb-6 sm:mb-0 px-4 sm:px-0'>
    
<h1 className='font-bold animate pop text-[1.5rem] 2xl:text-[2.5rem]'>{collection.name ? collection.name : ' Collection Name N/A'}</h1>
<p className='text-[0.85rem] animate pop xl:text-[1rem] 2xl:text-[1.5rem]  text-gray-300'>➠ {collection.overview  ? collection.overview: 'No overview available'}</p>

</div>
</div>
<ul className='grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-[repeat(3,1fr)] sm:grid  sm:grid-cols-collection sm:w-[95%] lg:w-[90%] mx-auto lg:ml-0 lg:mr-auto gap-6 px-4 sm:px-0 sm:gap-[20px]  lg:max-h-[500px] lg:min-h-[500px] lg:overflow-y-scroll lg:overflow-x-hidden lg:pr-4  '>
     
    {collection && collection.parts && collection.parts.map((movie: movieCollection) => (
      


        
       
<li key={movie['id']} className='z-[9999] flex flex-col mx-auto  justify-center relative min-w-full max-w-full    animate pop  sm:min-w-[11rem] sm:max-w-[11rem]'>

   
<Image
      className='w-full  sm:min-h-[250px] sm:max-h-[250px]  flex self-center rounded-xl'
          src={movie['poster_path'] ? `https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']}` : "https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=Poster N/A"}
          alt={movie['original_title']}
          width={1}
          height={1}
          loading='lazy'
          />
     {movie['original_title'] ?
      <Link
      href={{
       pathname: `/components/moviedetails`,
       query:  { id: movie.id }, // the data
     }} >
       <p className='truncate   text-[0.85rem] sm:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616] '>
           {movie['original_title']}
          </p>
          </Link>
          :
          <p className='truncate   text-[0.85rem] sm:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616] '>
           N/A
          </p>
}
          
         
          
            <div className='flex  justify-between items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <Image
         className='h-[0.9rem] w-[0.9rem] sm:h-[1rem] sm:w-[1rem] object-contain'
         src={star}
         alt='home icon'
         width={1}
         height={100}
        
          />
          {movie['vote_average']
          ?
           <p className='text-[0.75rem] collectionsmallscreen:text-[0.85rem] sm:text-[1rem]'>{movie['vote_average'].toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className='text-[0.75rem] collectionsmallscreen:text-[0.85rem] sm:text-[1rem]'>N/A</p>
  }
            </div>
            <p className='text-[0.75rem] collectionsmallscreen:text-[0.85rem] sm:text-[1rem]  truncate'>{movie['release_date'] ? new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</p>
        
            </div>
            </li>     

       


))

}
</ul>
</div>
:
<CollectionLoading />
}
</div>

:
''
}

    </div>
    
  );
}
export default Collection;