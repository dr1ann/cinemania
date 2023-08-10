'use client'

// External Libraries
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import  {Drawer} from 'vaul'

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

//Images
import noprofile from '../Images/noprofile.png'

//Components
import Header from '../components/Header';

const Info = () => {
    //use states
  const searchParams = useSearchParams();
  const [personDetails, setPersonDetails] = useState<any>({})
  const [isPersonLoading, setIsPersonLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const biographyHeightRef = useRef<HTMLDivElement>(null);



  //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });

 //fetch all data from the api
 const DataFromAPI = async () => {
      

  try {

    //the current person id
    const currID = searchParams.get('id');

    const response =  await axiosInstance.get(`/person/${currID}`) //Person Details
   

    
    setPersonDetails(response.data) //data is fetched 
    setIsPersonLoading(false) // Skeleton loader is disabled

 
   
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

  

  console.log(
personDetails
  );
  useEffect(() => {
  
  
    //call the function to get the data from the api
    DataFromAPI();

  }, [isPersonLoading ]);

  const formatBiographyText = (text: string) =>  {
    return (
      <div  ref={biographyHeightRef}> {/* Wrap the generated <p> elements in a <div> */}
        {text.split('\n').map((paragraph, index) => (
          <p key={index} className='my-2  text-[0.85rem] lg:text-[0.95rem] 2xl:text-[1.1rem]'>{paragraph}</p>
        ))}
      </div>
    );
  }
  




const  calculateAge = (birthdate:number) => {
  const birthYear = new Date(birthdate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}





const renderReadButton = () => {
  if ((biographyHeightRef?.current?.clientHeight ?? 0) > 240 ) {
    return (
      <button
        onClick={() => setReadMore(!readMore)}
        className='bg-[#1a1a1a] py-[0.2em] px-[0.8em]'
      >
        {readMore ? 'Read less ←' : 'Read more →'}
      </button>
    );
  }
  return null;
};

console.log(personDetails?.length)


  return (
   
    <> 
    <Header />
    
    <div className='flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start p-2 md:p-10'>
{personDetails.profile_path
?
    <img className='rounded-xl max-w-[50%]' 
     src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${personDetails.profile_path}`}
    data-src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${personDetails.profile_path}`}
    data-srcset={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${personDetails.profile_path} 1x,
    https://image.tmdb.org/t/p/w600_and_h900_bestv2/${personDetails.profile_path} 2x`}
     alt={`${personDetails.name}`}
      srcSet={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${personDetails.profile_path} 1x,
      https://image.tmdb.org/t/p/w600_and_h900_bestv2/${personDetails.profile_path}2x`} ></img>

      :
      <img
      className='  max-w-[50%] rounded-xl'
      src='https://via.placeholder.com/300x450/3F3F3F/FFFFFF/?text=PROFILE N/A'
       />
    }
      <div className='flex flex-col px-6'>
      <h1 className='text-[1.5rem] font-bold  text-center md:text-left md:text-[2rem]  2xl:text-[2.5rem]  z-10'>{personDetails.name ? personDetails.name : 'N/A' }</h1>
     
       {/* checks first if there is a biography of the person details */}
      { personDetails.biography 
     ?

     // another statement if the above condition is true
     <>
     
     {(biographyHeightRef?.current?.clientHeight ?? 0) > 240 
     ?
     
      //another statement if the above condition is true
     <> 
     

     {!readMore
     ?
       //show only less content when read more is not clicked 
        <div className='relative  max-h-[220px]   overflow-y-hidden'  >
    {formatBiographyText(personDetails.biography)}

      {/* put a fade effect on it */}
   <div className='fade-effect-biography' /> 

    </div>

    :
    //show all content when read more is clicked and replace with read less
   
    formatBiographyText(personDetails.biography)
    
    }
    </>
      
:
formatBiographyText(personDetails.biography) //show all content without fade effect if specified height is not reached

}


      {/* read more and read less buttons */}
      <div className='flex flex-start mt-2'>{renderReadButton()}</div>
       
   
     </>
        :
      
        
        // show something if person has no biography
       <p className='text-[0.85rem]  lg:text-[0.95rem] 2xl:text-[1.1rem]'>Biography N/A</p>

       
        
    }
  
  
    <div className=' mt-6 grid grid-cols-2 grid-auto-rows gap-6 px-4 place-content-start  items-center movdet justify-center mx-auto py-2 bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl w-fit z-20'>
  
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
    <p className='text-gray-400 '>Popularity</p>
    <div className='flex flex-row gap-1'>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
    <span>{personDetails.popularity  ?
     personDetails.popularity.toFixed(1).replace(/\.0$/, '') + '%'  :  'N/A'} </span>
</div>
  </div>
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Known for</p>
    <span>{personDetails.known_for_department ? personDetails.known_for_department : 'N/A'}</span>
    </div>

   

    <div className='flex flex-col items-center  text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Birthday</p>
  <span className='text-center'>

  {personDetails.birthday ? (
    <>
      {personDetails.birthday}({calculateAge(personDetails.birthday)} years old)
    </>
  ) : (
    'N/A'
  )}

  </span>
    </div>

    <div className=' text-center flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.5rem]'>
  <p className='text-gray-400 '>Place of Birth</p>
    <span>{personDetails.place_of_birth ? personDetails.place_of_birth : 'N/A' }</span>
    </div>

   
   

</div>

      </div>
      
      </div>
     
     
    
    </>
  )
}
export default Info;