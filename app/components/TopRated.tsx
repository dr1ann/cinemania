import { useState, ChangeEvent, useEffect } from 'react';

import Image from 'next/image'
import star from '../Images/star.png'





const TopRated = () => {
 
    const [topratedmovies, setTopRatedMovies] = useState<any[]>([]);
    const [topratedtv, setTopRatedtv] = useState<any[]>([]);
    useEffect(() => {
       //top rated movies
       const topratedmovies = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
        }
      
      };

      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', topratedmovies)
.then(response => response.json())
.then(data => {
    setTopRatedMovies(data.results);

})
.catch(err => console.error(err));


      // popular tv shows
      const topratedtv = {method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY'
      }};

      fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', topratedtv)
.then(response => response.json())
.then(data => {
    setTopRatedtv(data.results);

})
.catch(err => console.error(err));
      }, []);

  const [selectedOption, setSelectedOption] = useState<string>('Movies');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='selector '>

      <div className='inline-flex items-center border-2 border-white ml-[2.5rem]   justify-start gap-2 rounded-xl'>
       
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
        {selectedOption === 'Movies' && 
        <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>

        {topratedmovies.map(movie => (
        <div key={movie['id']}> 
        
        <div className='grid grid-cols-fit'>
        
        <div className='flex flex-col justify-center '>
          <img
          className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-3deg] transform transition duration-500 hover:scale-110 hover:z-10'
          src={`https://image.tmdb.org/t/p/original${movie['poster_path']}`}
          alt={movie['original_title']}
        
        
          />
         
            <p className='font-bold  mt-4 truncate '>{movie['original_title']}</p>
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
        <div className='flex flex-row overflow-x-scroll  p-10 gap-10'>
    
        {topratedtv.map(movie => (
       <div key={movie['id']}> 
      
      <div className='grid grid-cols-fit'>
 
     <div className='flex flex-col justify-center '>
          <img
          className='w-[13rem] cursor-pointer flex self-center rounded-xl object-cover hover:rotate-[-3deg] transform transition duration-500 hover:scale-110 hover:z-10'
          src={`https://image.tmdb.org/t/p/original${movie['poster_path']}`}
          alt={movie['original_title']}
       
 
          />
         
            <p className='font-bold  mt-4 truncate '>{movie['name']}</p>
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

export default TopRated;
