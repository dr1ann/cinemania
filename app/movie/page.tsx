'use client'
//External Libraries
import Image from 'next/image'


// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { lazy, Suspense, useEffect, useState } from 'react';
import Loading from '../components/Loaders/PageLoading'
import { useSearchParams } from 'next/navigation';
// Images
import nextjs from '../Images/nextjs.png';
import tailwind from '../Images/tailwind.png';

// Client Components:
import Overview from './overview';
import Media from './Media';
import Collection from './Collection';
import Crew_Cast from './Crew_Cast';
import Similar from './Similar';
import Suggested from './Suggested'
import CardLoading from '../components/Loaders/CardLoading';
import HomeLoading from '../components/Loaders/HomeLoading';
import CollectionLoading from '../components/Loaders/CollectionLoading';
import VideosLoading from '../components/Loaders/PosterLoading';


const Page  = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(searchParams.get('id'))

  useEffect(() => {
    // Check if the searchParams.get('id') value has changed
    const newId = searchParams.get('id');
    if (newId !== isLoading) {
      setIsLoading(newId);
      // Perform any additional actions you need when the id value changes
      // For example, you can trigger a full page reload using window.location.reload()
      window.location.reload();
    
    }

  }, [searchParams, isLoading]);

  return (
    
    

       <>


    <Overview />

    <Crew_Cast />
   
    <Collection />

    <Media  />
 
    <Similar  />
    <Suggested  />

 

    <footer className='pt-[3.5rem] flex flex-col justify-center items-center gap-2 z-20 px-2 '>

<span className='text-[0.9rem]'>Copyright © 2023 Cinemania</span>
<div className=' flex flex-row flex-wrap justify-center items-center'>
<p className='text-white text-center text-[0.9rem]'>Created with 


</p>
<Image className='w-[30px] object-contain'
src={nextjs}

alt="NEXT JS Icon"
/>
<Image className='w-[34px] object-contain'
src={tailwind}

alt="NEXT JS Icon"
/>
<p className='text-white  text-[0.9rem] text-center'>
by  <span className='font-bold text-gray-200'>James Adrian Denoy </span>
</p>
</div>
<div className='flex flex-row justify-center items-center '>
<a href="https://web.facebook.com/jamesdenoy12/" target="_blank" rel="noopener noreferrer" className="icon-link" >
<FontAwesomeIcon icon={faFacebook} className="text-black m-2 text-xl animate-custom-bounce bg-gray-500 rounded-full p-2 "  />
</a>

<a href="https://www.instagram.com/dr1annnnnnn/" target="_blank" rel="noopener noreferrer" className="icon-link" >
<FontAwesomeIcon icon={faInstagram} className="text-black m-2  text-[1.25rem] animate-custom-bounce  bg-gray-500  rounded-full p-2" />
</a>
<a href="https://github.com/dr1ann" target="_blank" rel="noopener noreferrer" className="icon-link"  >
<FontAwesomeIcon icon={faGithub} className="text-black m-2 text-xl animate-custom-bounce bg-gray-500  rounded-full p-2" />
</a>
<a href="mailto:jamesdenoy56@gmail.com" target="_blank" rel="noopener noreferrer" className="icon-link"  >
<FontAwesomeIcon icon={faEnvelope} className="text-black  text-[1.15rem] animate-custom-bounce  m-2 bg-gray-500 rounded-full p-2" />

</a>

</div>
</footer>


</>
  );
}

export default Page;