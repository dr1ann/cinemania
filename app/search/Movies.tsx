import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import star from '@/app/Images/star.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CollectionLoading from '../components/Loaders/CollectionLoading';
import ErrorImage from '@/app/Images/errorimg.webp'
//type
interface MoviesProps {
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
}
 //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
  },
});
 const Movies = () => {

  const [MovieResults, setMovieResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);
  const [PageNum, SetPageNum] = useState(1);
 
 // Instantiate a new search parameters object to access and manipulate the query parameters of the current URL.
 const searchParams = useSearchParams()

 // Retrieve the keyword entered by the user from the search parameters.
 const SearchedKeyword = searchParams.get('keyword')
 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(`https://api.themoviedb.org/3/search/movie?query=${SearchedKeyword}&page=${PageNum}`)
   
    setMovieResults(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  



};

//call the function to get the data from the api
useEffect(() => {

  DataFromAPI();

}, [PageNum]);
console.log(MovieResults?.results?.length)


  return (
   <>



{isLoading ?
   < CollectionLoading />

   :
<>
{MovieResults?.results?.length > 0

?
<>
<div className='flex justify-between mt-8'>
<p className='text-[0.85rem] md:text-[1rem]   px-2'>Total Results: <span className='font-bold'> {MovieResults?.total_results?.toLocaleString()}</span></p>
<p className='text-[0.85rem] md:text-[1rem] mt-4 px-2'> Pages: {PageNum +  '/' +  MovieResults?.total_pages?.toLocaleString()}</p> 
</div>
     
      
 <ul className={`mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-${
MovieResults?.results?.length >= 3 ? '[repeat(3,1fr)]' : '[repeat(2,1fr)]'} 
sm:grid-cols-searchresults  mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
  scroll-smooth`}>
  {MovieResults.results?.map((movie:MoviesProps) => (
<li key={movie['id']} className='z-[9999] flex flex-col mx-auto  justify-center relative min-w-full max-w-full 
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
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
className='w-full  sm:min-h-[225px] sm:max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10 '

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
        <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]'  onClick={() =>SetPageNum(PageNum - 1) }>{'< Previous Page'}</button>
        :
        ''
        }
      {PageNum !== MovieResults?.total_pages 
        ?
      <button className='bg-[#1a1a1a] rounded-md px-[1em]  py-[0.4em] text-[0.85rem] md:text-[1rem]'  onClick={() =>SetPageNum(PageNum + 1) }>{'Next Page >'}</button>
      :
      ''
      }
      </div>
    
       
     
 :
 ''
}

        </>
        
        :
        <div className='flex flex-col px-8 gap-10 mt-14 justify-center items-center'>
          <Image 
        
          src={ErrorImage}
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