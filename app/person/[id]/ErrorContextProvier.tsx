'use client'
import React from 'react'
import { createContext, useState } from 'react'
import Image from 'next/image';
import ErrorImage from '@/app/Images/errorimg.webp'
import SideSearchBar from '@/app/components/SideSearchbar'
type useError = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,

];


export const ErrorContext = createContext<useError>([false, () => {}]);

// Create a component that provides the state
export default function ErrorContextProvider({children} : {children: React.ReactNode}) {
  const [isError, setisError] = useState(false);
console.log(isError)




  return (
    <ErrorContext.Provider value={[isError, setisError]}>
      
      {
      isError === true
      ?
      <>
      <SideSearchBar/>
          <div className='flex flex-col px-4  h-screen justify-center items-center'>
          <Image 
        
          src={ErrorImage}
          width={450}
          height={450}
          alt='error image'
          />
     
        </div>

      </>

      :

      children}
    </ErrorContext.Provider>
  );
}
