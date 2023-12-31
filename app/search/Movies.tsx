
//External Libraries
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import star from '@/app/Images/star.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';


//Loader(s)
import SearchPosterLoading from '../components/Loaders/SearchPageLoading';

//Images
import SearchErrorImage from '@/app/Images/searcherrorimg.webp'
import ErrorImage from '@/app/Images/errorimg.webp'
import posterplaceholder from '@/app/Images/movieplaceholder.png'
//type
interface MovieResultsProps {
  page: number;
  results: Array<{
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
  }>
  total_pages: number
  total_results: number
}

 //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
  },
});

 const Movies = () => {

  //use states
  const [MovieResults, setMovieResults] = useState<MovieResultsProps>({} as MovieResultsProps)
  const [isLoading, setIsLoading] = useState(true);
  const [PageNum, SetPageNum] = useState(1);
  const [error, setError] = useState(false);
  
 // Instantiate a new search parameters object to access and manipulate the query parameters of the current URL.
 const searchParams = useSearchParams()

 // Retrieve the keyword entered by the user from the search parameters.
 const SearchedKeyword = searchParams.get('keyword')

 //fetching the data from the api
 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(`https://api.themoviedb.org/3/search/movie?query=${SearchedKeyword}&page=${PageNum}`)
   
    setMovieResults(response.data);
    setIsLoading(false) // Skeleton loader is disabled
    setError(false); // set error to false whenever the fetching is success
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
    setError(true) // set error to true whenever the fetching is failed
  }
  

};

//call the function to get the data from the api
useEffect(() => {

  DataFromAPI();
  return () => {
   setIsLoading(true) // Clean up: Set isLoading to true before next fetch
  };
}, [PageNum, SearchedKeyword]); //re render the component whenever there are changes to the dependencies
 
//make the page go back to 1 whenever the value of the searchkeyword changes
useEffect(() => {
SetPageNum(1)
},[SearchedKeyword])

//return an error statement whenever the fetching of data is failed
if(error) {
  return (
  <div className='flex flex-col px-2  mt-8 justify-center items-center'>
          <Image 
        
          src={ErrorImage}
          width={400}
          height={400}
          alt='error image'
          />
     
       
        </div>
        )
}


  return (
    
   <>

{isLoading ?
 <ul className='mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-[repeat(3,1fr)]
  sm:grid-cols-searchresults  mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
    scroll-smooth '>
{Array.from({ length: 10 }).map((_, index) => (
     <SearchPosterLoading key={index} />
   ))}
</ul>
   :
<>
{MovieResults?.results?.length > 0

?
<>
<div className='flex justify-between mt-8'>
<p className='text-[0.95rem] md:text-[1.1rem] 2xl:text-[1.3rem]   px-2'>Total Results: <span className='font-bold'> {MovieResults?.total_results?.toLocaleString()}</span></p>
<p className='text-[0.95rem] md:text-[1.1rem] 2xl:text-[1.3rem] mt-4 bg-[#1a1a1a] rounded-md px-[.8em]  pt-[0.3em] pb-[0.4em]'> Page: {PageNum +  '/' +  MovieResults?.total_pages?.toLocaleString()}</p> 
</div>
     
      
 <ul className={`mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-${
MovieResults?.results?.length >= 3 ? '[repeat(3,1fr)]' : '[repeat(2,1fr)]'} 
sm:grid-cols-searchresults  mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
  scroll-smooth`}>
  {MovieResults.results?.map((movie) => (
<li key={movie['id']} className='z-[9999] flex flex-col mx-auto   relative min-w-full max-w-full 
   animate pop  sm:min-w-[9.375rem] sm:max-w-[9.375rem]'>
{movie['poster_path']
         ?
         <Link
   
         href={{
          pathname: `/movie/${movie.id}`,
        }}
       
         > 
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']}`}
className='w-full  sm:min-h-[225px] sm:max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10 cursor-pointer'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']} 1x, 
https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie['poster_path']} 2x`}
loading='lazy'
alt={movie['title']} />
</Link>
:
<Link
   
href={{
 pathname: `/movie/${movie.id}`,
}}

> 
<Image  
src={posterplaceholder}
className='w-full  sm:min-h-[225px] sm:max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10 '
width={220}
height={330}
loading='lazy'
alt={movie['title']} />
 </Link>
}
     {movie['title'] ?
      <Link
      className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
        pathname: `/movie/${movie.id}`,
      }}
    
      >
       {movie['title']}
          </Link>
          :
          <Link
          className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
          href={{
            pathname: `/movie/${movie.id}`,
          }}
        
          >
           N/A
              </Link>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <Image
         className='h-[0.8rem] w-[0.8rem] sm:h-[0.9rem] sm:w-[0.9rem] object-contain mb-[2px] sm:mb-[1px]'
         src={star}
         alt='home icon'
         width={1}
         height={1}
        
          />
          {movie['vote_average']
          ?
           <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>{movie['vote_average'].toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300  truncate'>{movie['release_date'] ? new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</p>
        
            </div>
             
          
</li>
))
}
</ul>
{ MovieResults?.total_pages > 0 
      ?
  
      <div className='items-center justify-center px-2 flex gap-6 mt-6'>
        {PageNum !== 1 
        ?
        <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]' 
         onClick={() =>SetPageNum(prev => prev - 1) }>{'< Previous Page'}</button>
        :
        ''
        }
      {PageNum !== MovieResults?.total_pages 
        ?
      <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]' 
       onClick={() =>SetPageNum(prev => prev + 1) }>{'Next Page >'}</button>
      :
      ''
      }
      </div>
    
       
     
 :
 ''
}

        </>
        
        :
        <div className='flex flex-col px-10 gap-10 mt-14 justify-center items-center'>
          <Image 
        
          src={SearchErrorImage}
          width={300}
          height={300}
          alt='error image'
          />
     
        <p className='  text-[1rem] md:text-[1.2rem] 2xl:text-[1.4rem] text-center '>{`No results found for "${SearchedKeyword}" as a movie.`}</p>
        </div>
    }
    </>
      
        
}

   </>
   
  )
}
export default Movies