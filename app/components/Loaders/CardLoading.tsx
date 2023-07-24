

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function CardLoading() {

    return (

    <div >

    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    
    <Skeleton  className='rounded-xl  max-w-[11rem] min-w-[11rem] max-h-[250px] min-h-[250px]'/>
    
      </SkeletonTheme>
          
      <div className='mt-[3px]'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Skeleton count={2} />
    </SkeletonTheme>
    </div>
    
          </div>
    )
}