'use client'


// External Libraries
import React, { useState, useRef } from 'react';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


//API Component
import InfoAPI from '../../components/API/PersonDetails/InfoAPI';

const Info = ({ id }: { id: number }) => {

    //use states
  const [readMore, setReadMore] = useState(false);
  const biographyHeightRef = useRef<HTMLDivElement>(null);

  const {personDetails, PersonSocMedia, isPersonLoading } =
   InfoAPI (`/person/${id}`,
           `/person/${id}/external_ids`
           )
console.log(personDetails)
  

  const formatBiographyText = (text: string) =>  {
    return (
      <div  ref={biographyHeightRef} className='w-full sm:w-[80%] lg:w-full  sm:mx-auto lg:mx-0'> {/* Wrap the generated <p> elements in a <div> */}
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

const calculateDeathAge = (deathdate: number, birthdate: string) => {
  const DeathYear = new Date(deathdate).getFullYear();
  const DeathMonth = new Date(deathdate).getMonth();
  const BirthYear = new Date(birthdate).getFullYear();
  const BirthMonth = new Date(birthdate).getMonth();

  let age = DeathYear - BirthYear;

  // If the death month is earlier than the birth month, subtract one year from the calculated age
  if (DeathMonth < BirthMonth) {
    age--;
  }

  return age;
}


const renderReadButton = () => {
  if ((biographyHeightRef?.current?.clientHeight ?? 0) > 240 ) {
    return (
      <div className='w-full sm:w-[80%] lg:w-full  sm:mx-auto lg:mx-0'>
      <button
        onClick={() => setReadMore(!readMore)}
        className='bg-[#1a1a1a] rounded-md py-[0.2em] px-[0.8em] text-[0.85rem] md:text-[0.95rem] 2xl:text-[1.1rem]'
      >
        {readMore ? 'Read less <' : 'Read more >'}
      </button>
      </div>
    );
  }
  return null;
};




  return (
   
    <> 
 
    
    <div className='flex flex-col lg:flex-row items-center  justify-center lg:items-start  p-2 lg:p-10'>
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
   
    
      <div className='flex flex-col px-4 lg:px-6'>
      <h1 className='text-[1.5rem] font-bold  text-center lg:text-left md:text-[2rem]  2xl:text-[2.3rem]  z-10'>{personDetails.name ? personDetails.name : 'N/A' }</h1>
      <>
      {personDetails.deathday ? 
      <span className='text-center lg:text-left text-[0.78rem] pb-2 sm:text-[0.813rem]   text-gray-300'>

     Death Day: {new Date(personDetails.deathday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      {' ('}
      {calculateDeathAge(personDetails.deathday, personDetails.birthday)}
      {' years old)'}
    
      </span>
    :
  ''
  }
</>


<>

{PersonSocMedia.facebook_id || PersonSocMedia.instagram_id || PersonSocMedia.twitter_id ?

<ul className='my-1 pb-[3px] pt-[5px] bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl w-fit mx-auto lg:mx-0 px-4 flex flex-row gap-4 justify-center lg:justify-start items-center'>
<h3 className='pb-[3px] text-[0.85rem] md:text-[1rem] 2xl:text-[1.1rem]'>Social Media ➨</h3>
{PersonSocMedia.facebook_id
?
    <li className='hover:rotate-[0deg]   transform transition duration-250 hover:scale-110 hover:z-10'>
           
      <a  href={`https://facebook.com/${PersonSocMedia.facebook_id}` } target="_blank" rel="noopener noreferrer ">
      <FontAwesomeIcon icon={faFacebook} className="text-white text-[1.3rem]  md:text-[1.5rem] 2xl:text-[1.75rem] "  />
     </a>
      
    </li>
   
    :
     ''
    }
    
    {PersonSocMedia.instagram_id
?
    <li className='hover:rotate-[0deg]   transform transition duration-250 hover:scale-110 hover:z-10'>
           
      <a  href={`https://instagram.com/${PersonSocMedia.instagram_id}` } target="_blank" rel="noopener noreferrer ">
      <FontAwesomeIcon icon={faInstagram} className="text-white text-[1.3rem]  md:text-[1.5rem] 2xl:text-[1.75rem] "  />
     </a>
      
    </li>
   
    :
     ''
    }

{PersonSocMedia.twitter_id
?
    <li className='hover:rotate-[0deg]   transform transition duration-250 hover:scale-110 hover:z-10'>
           
      <a  href={`https://twitter.com/${PersonSocMedia.twitter_id}` } target="_blank" rel="noopener noreferrer ">
      <FontAwesomeIcon icon={faTwitter} className="text-white text-[1.3rem]  md:text-[1.5rem] 2xl:text-[1.75rem] "  />
     </a>
      
    </li>
   
    :
     ''
    }
    </ul>
    :
    ''
}
</>
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
  
  
    <div className=' mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 px-4 mx-auto py-2 bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-xl w-fit z-20'>
  
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.1rem]'>
    <p className='text-gray-400 '>Popularity</p>
    <div className='flex flex-row gap-1'>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
    <span>{personDetails.popularity  ?
     personDetails.popularity.toFixed(1).replace(/\.0$/, '') + '%'  :  'N/A'} </span>
</div>
  </div>
  <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.1rem]'>
  <p className='text-gray-400 '>Known for</p>
    <span>{personDetails.known_for_department ? personDetails.known_for_department : 'N/A'}</span>
    </div>

   

    <div className='flex flex-col items-center  text-[0.85rem]  md:text-[1rem] 2xl:text-[1.1rem]'>
  <p className='text-gray-400 '>Birthday</p>
  <span className='text-center max-w-[170px]'>

  {personDetails.birthday ? 
      <>
        {new Date(personDetails.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        {personDetails.deathday ? '' : ` (${calculateAge(personDetails.birthday)} years old)`}
      </>
     : 
      'N/A'
    }

  </span>
    </div>

    <div className='flex flex-col items-center text-[0.85rem]  md:text-[1rem] 2xl:text-[1.1rem]'>
  <p className='text-gray-400 '>Place of Birth</p>
    <span className=' text-center '>{personDetails.place_of_birth ? personDetails.place_of_birth : 'N/A' }</span>
    </div>

   
   

</div>

      </div>
      
      </div>
     
     
    
    </>
  )
}
export default Info;