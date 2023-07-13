import { useState, ChangeEvent, useEffect } from 'react';

import Image from 'next/image'
import star from '../Images/star.png'
import CardLoading from './CardLoading';
import Router from 'next/navigation';
import Link from 'next/link';
import Movies from 'moviestmdb/lib/Classes/Movies';

export default function Trending() {
    const [trendingmovies, setTrendingMovies] = useState<any[]>([]);
    const [trendingtv, setTrendingtv] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        // trending movies
        const trendingmovies = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
          }
        
        };
      
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', trendingmovies)
          .then(response => response.json())
          .then(data => {
            setTrendingMovies(data.results);
            setIsLoading(false)
          })
          .catch(err => console.error(err));
      
      //trending tv shows
      
      const trendingtv = {method: 'GET', headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
        }};
        
        
        fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', trendingtv)
        .then(response => response.json())
        .then(data => {
          setTrendingtv(data.results);
      
        })
        .catch(err => console.error(err));
        const delay = 2000

      


        
      }, []);
    //handler when the option is changed
  const [selectedOption, setSelectedOption] = useState<string>('Movies');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  console.log(trendingtv)

  return (
    <div className='selector '>

      <div className='inline-flex items-center border-2 border-[#e2b616] ml-[2.5rem]   justify-start gap-2 rounded-xl'>
       
      <div className='selector-item '>
      <label id='radiolabel' className={selectedOption === 'Movies' ? 'active1' : ''}>
          <input
          className='selector-item_radio'
            type="radio"
            value="Movies"
            checked={selectedOption === 'Movies'}
            onChange={handleOptionChange}
          />
           
          Movies
        </label>
      </div>
      <div className='selector-item '>
      <label id='radiolabel' className={selectedOption === 'TV' ? 'active1' : ''} >
          <input
          className='selector-item_radio'
         
            type="radio"
            value="TV"
            checked={selectedOption === 'TV'}
            onChange={handleOptionChange}
          />
       
          TV Shows
        </label>
      </div>
    
      </div>
      <div>
      {isLoading &&  
        
          <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-10'>
  
  {Array.from({ length: 21 }).map((_, index) => (
    <CardLoading key={index} />
  ))}
      
      </div> 
      }

  {selectedOption === 'Movies' && 
        <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>

        {trendingmovies.map(movie => (
        <div key={movie['id']}> 
        
        <div className='grid grid-cols-fit '>
        
        <div className='flex flex-col justify-center  animate pop'>
       
          <Link
           href={{
            pathname: `/components/moviedetails`,
            query: movie, // the data
          }}
       
          >
          <Image
          className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'
          src={  `https://image.tmdb.org/t/p/original${movie['poster_path']}`}
          alt={movie['original_title']}
          width={1}
          height={1}
        
          />
         </Link>


         <Link
           href={{
            pathname: `/components/moviedetails`,
            query: movie, // the data
          }} >
            <p className='font-bold  mt-4 truncate hover:text-[#e2b616]'>{ movie['original_title'] }</p>
         </Link>
            <div className='flex  justify-between items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-2'>
             <Image
         className='h-[1rem] w-[1rem] object-contain'
         src={star}
         alt='home icon'
         width={1}
         height={100}
        
          />
           <p>{movie['vote_average'].toFixed(1)}</p>
        
            </div>
            <p>{new Date(movie['release_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        
            </div>
            </div>     
        </div>
        </div>
        
        ))
        
        }
        </div>
        
        
      }
       
        {selectedOption === 'TV' && 


            <div className='flex flex-row overflow-x-scroll  p-10 gap-10 '  >
        
            {trendingtv.map(movie => (
           <div key={movie['id']}> 
          
          <div className='grid grid-cols-fit '>
     
         <div className='flex flex-col justify-center animate pop'>
              <Image
              className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-3deg] transform transition duration-250 hover:scale-110 hover:z-10 '
              src={`https://image.tmdb.org/t/p/original${movie['poster_path']} ` }
              alt={movie['original_title']}
              width={1}
              height={1}
     
              />
             
             <p className='font-bold mt-4 truncate'>
      {movie['name']}
    </p>
    
                <div className='flex  justify-between items-center py-[5px] '>
                 <div className=' flex flex-row items-center gap-2'>
                 <Image
             className='h-[1rem] w-[1rem] object-contain'
             src={star}
             alt='home icon'
             width={1}
             height={100}
     
              />
               <p>{movie['vote_average'].toFixed(1)}</p>
     
                </div>
                <p>{new Date(movie['first_air_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
     
                </div>
                </div>     
        </div>
           </div>
     
            ))
            
            }
            </div>
          
        }







      </div>
    </div>
  );
};

