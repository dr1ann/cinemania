import Image from 'next/image'
import loadingbar from './Images/loading-11.gif'
import NextNProgress from 'nextjs-progressbar';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className='h-screen movdbg flex flex-col justify-center items-center'  >
      
             <Image className=' w-[35%] object-contain'
        src={loadingbar}
        alt='laoding bar'
        width={1}
        height={1}
        
        />
       <p className='text-[1.5rem] sm:text-[3rem] text-center ml-4'>Loading...</p>
       
         </div>
    )
  }