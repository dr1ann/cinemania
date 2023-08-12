'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import loadingbar from '../Images/loading-11.gif';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className='h-screen flex flex-col justify-center items-center'>
          <Image
            className='w-[30%] object-contain'
            src={loadingbar}
            alt='loading bar'
            width={1}
            height={1}
          />
        </div>
      )}
    </>
  );
};

export default Loading;
