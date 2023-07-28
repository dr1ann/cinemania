

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function CardLoading() {

    return (

    <div >

    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    
    <Skeleton  className='rounded-xl  max-w-[10rem] min-w-[10rem] max-h-[220px] min-h-[220px]'/>
    
      </SkeletonTheme>
          
      <div className='mt-[3px]'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Skeleton count={2} />
    </SkeletonTheme>
    </div>
    
          </div>
    )
}