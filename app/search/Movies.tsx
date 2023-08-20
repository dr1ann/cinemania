import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import star from '@/app/Images/star.png'
//type
interface MoviesProps {
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
}

const Movies = ({ KeywordResults }: { KeywordResults: any }) => {
  return (
   <>
 <ul className={`mt-8 grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-${
KeywordResults?.length >= 3 ? '[repeat(3,1fr)]' : '[repeat(2,1fr)]'} 
sm:grid-cols-searchresults  mx-auto gap-6 px-2 sm:px-0 sm:gap-[20px] 
  scroll-smooth`}>
  {KeywordResults?.map((movie:MoviesProps) => (
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
   </>
  )
}
export default Movies