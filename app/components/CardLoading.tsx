

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function CardLoading() {

    return (

    <div className='grid grid-cols-fit place-content-center'>

    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    
    <Skeleton  height={300} width={200}  className='rounded-xl  '/>
    
      </SkeletonTheme>
          
      <div>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Skeleton count={2} />
    </SkeletonTheme>
    </div>
    
          </div>
    )
}