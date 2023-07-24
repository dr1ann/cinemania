

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function VideosLoading() {

    return (

      

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
        <Skeleton   className='rounded-xl max-w-[20rem] min-w-[20rem] min-h-[11.25rem] max-h-[11.25rem]  '/>
        
          </SkeletonTheme>
              
         
        
             
    )
}

