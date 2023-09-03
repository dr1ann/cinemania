

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function SearchPosterLoading() {

    return (

    <li className='flex flex-col mx-auto  justify-center relative min-w-full max-w-full 
      sm:min-w-[9.375rem] sm:max-w-[9.375rem]'>

    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    
    <Skeleton  className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-md'/>
    
      </SkeletonTheme>
          
      <div className='mt-[3px]'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Skeleton count={2} className='w-full' />
    </SkeletonTheme>
    </div>
    
          </li>
    )
}