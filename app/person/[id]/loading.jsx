'use client'
import Image from 'next/image';
import loadingbar from '@/app/Images/loading-11.gif';

const Loading = () => {


  return (
    <>
      
        <div className='h-screen flex flex-col justify-center items-center'>
          <Image
            className='w-[30%] object-contain'
            src={loadingbar}
            alt='loading bar'
            width={1}
            height={1}
          />
        </div>
      
    </>
  );
};

export default Loading;
