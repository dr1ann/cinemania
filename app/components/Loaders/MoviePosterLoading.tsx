

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function MoviePosterLoading() {

    return (

    <div >

    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    
    <Skeleton  className='rounded-xl  max-w-[9.375rem] min-w-[9.375rem]  max-h-[225px] min-h-[225px]'/>
    
      </SkeletonTheme>
          
      <div className='mt-[3px]'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Skeleton count={2} />
    </SkeletonTheme>
    </div>
    
          </div>
    )
}