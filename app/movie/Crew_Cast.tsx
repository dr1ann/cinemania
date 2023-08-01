'use client'
// External Libraries
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

//Images
import noprofile from '../Images/noprofile.png'

//Components
import CardLoading from '../components/Loaders/CardLoading';

//type
type MovieCredits = {
  credit_id: number;
  id: number;
  cast_id: number;
 character: string;
  original_name: string ;
  
  profile_path: string ;
  known_for_department: string;
  job: string;
  
};

const Crew_Cast =   () => {

  //use states
  const searchParams = useSearchParams();
  const [credits, setCredits] = useState<any>({})
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);





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

        const response =  await axiosInstance.get(`/movie/${currID}/credits?language=en-US`) //MovieCredits
       
    
      
        setCredits(response.data);
        setIsPeopleLoading(false) // Skeleton loader is disabled
    
     
       
      } catch (error) {
        console.error('Error fetching data:', error); // Catch errors if data is not fetched
      }
      
    };
    //call the function to get the data from the api
    DataFromAPI();

 
   
  }, []);

 


 


 //get only the important crew members from the movie 
 const importantCrewMembers = credits && credits.crew && credits.crew.filter((movie:MovieCredits) => {
  return (
    movie.job === 'Director' || 
     movie.job === 'Writer' ||
      movie.job === 'Producer'
   
  )
  
});


  return (
    
    <div>
         <div>
    <h1 className='px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold '>Top Billed Cast</h1>
    {isPeopleLoading ? 
   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-10'>

   {Array.from({ length: 10 }).map((_, index) => (
     <CardLoading key={index} />
   ))}
       
       </div> 
       
    :
<div className='relative'>
      {credits && credits.cast && credits.cast.length > 0
      ?
    <div className='flex flex-row overflow-x-scroll  p-10 gap-6 '>

{credits && credits.cast && credits.cast.slice(0, 20).map((movie: MovieCredits) => (

<div key={movie['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl'> 



<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {movie['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-xl overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${movie['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${movie['profile_path']} 1x, https://image.tmdb.org/t/p/w276_and_h350_face${movie['profile_path']} 2x`}
loading='eager'
alt={movie['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  rounded-t-xl max-h-[175px] min-h-[175px] flex self-center  overflow-hidden'>
    <Image  
 src={noprofile}
    className='w-full h-full'
  
    loading='eager'
    alt={movie['original_name']} />
    
    </div>
  }

 
    <p className='font-bold  pt-2 px-2  text-[0.85rem] sm:text-[1rem]'>{movie['original_name'] ? movie['original_name'] : 'N/A'}</p>
    {movie.character ?
        <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]   text-gray-300'>{movie['character']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>N/A</p> 
  }

    
    </div>     
</div>

    
))

}
    
</div>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>


    



    <div >
     
   
      
    <h1 className='px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold '>Director, Writer & Producer</h1>
    {isPeopleLoading ? 


   <div className='flex flex-row justify-start overflow-x-scroll items-center  p-10 gap-10'>

   {Array.from({ length: 10 }).map((_, index) => (
     <CardLoading key={index} />
   ))}
       
       </div> 
       
    :
    <div className='relative'>
      {credits && credits.crew && credits.crew.length > 0
      ?
    <div className=' flex flex-row overflow-x-scroll  p-10 gap-6 '>

{importantCrewMembers && importantCrewMembers.map((movie: MovieCredits) => (


<div key={movie['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl'> 


<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {movie['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px]  flex self-center rounded-t-xl overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${movie['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${movie['profile_path']} 1x, https://image.tmdb.org/t/p/w276_and_h350_face${movie['profile_path']} 2x`}

alt={movie['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-xl overflow-hidden '>
    <Image  
 src={noprofile}
    className='w-full h-full'
   
    loading='eager'
    alt={movie['original_name']} />
    
    </div>
  }

 
    <p className='font-bold  pt-2 px-2 text-[0.85rem] sm:text-[1rem] '>{movie['original_name'] ? movie['original_name'] : 'N/A'}</p>
    {movie['job'] ?
   
   <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem] text-gray-300'>{movie['job']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>{movie['known_for_department']}</p> 
 }

    
    </div>     
</div>




))

}
</div>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>

    </div>
  );
}
export default Crew_Cast;