'use client'

//External Libraries
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';


// Client Components:
import Overview from './overview';
import Media from './Media';
import Collection from './Collection';
import Crew_Cast from './Crew_Cast';
import Similar from './Similar';
import Suggested from './Suggested'
import Footer from '../components/Footer';


const Page  = async () => {
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
    <Footer  />
 




</>
  );
}

export default Page;