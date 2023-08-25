
'use client'

// External Libraries
import Image from 'next/image';
import Link from 'next/link';

//Images
import star from '@/app/Images/star.png'

//Components
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading';

//API component
import { SuggestedMoviesAPI } from '@/app/components/API/MovieDetailsAPI';


const Suggested = ({ id }: { id: number }) => {
 
    //get the values of the fetched data from the API
    const {suggestedMovies, isLoading } = SuggestedMoviesAPI(`/movie/${id}/recommendations`)

  return (
    <>
   

    {isLoading ? 


<>
<h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Suggested Movies</h1>
<div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center   p-6 sm:py-6 sm:px-10 gap-6'>

{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}

</div> 
</>
       
    :
    
<div className='relative'>
      {suggestedMovies?.results?.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Suggested Movies</h1>
   
    <ul className='flex flex-row overflow-x-scroll scroll-smooth bigscreens:justify-center  p-6 sm:py-6 sm:px-10 gap-6 '>
{suggestedMovies?.results?.slice(0, 15).map((movie) => (
<li key={movie.id}>
    <div className='flex flex-col justify-center animate pop max-w-[9.375rem] min-w-[9.375rem]'>
{movie['poster_path']
         ?
         <Link
   
         href={`${movie.id}`}
       
         >
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']}`}
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie['poster_path']} 1x,
 https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie['poster_path']} 2x`}
loading='lazy'
alt={movie['title']} />
</Link>
:
<Link
   
   href={`${movie.id}`}

>
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=POSTER N/A'
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'

loading='lazy'
alt={movie['title']} />
</Link>
}
     {movie['title'] ?
      <Link
      className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={`${movie.id}`}
    
      >
       {movie['title']}
          </Link>
          :
          <Link
          
          className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
          href={`${movie.id}`}
        
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
             
            </div>
</li>
))
}
</ul>
</>
:
''


    }
  
    </div>
    
}

 
   </>
  )
}
export default Suggested