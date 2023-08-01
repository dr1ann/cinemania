

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function PosterLoading() {

    return (

      

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
        <Skeleton   className=' max-w-[9.375rem] rounded-xl min-w-[9.375rem] min-h-[225px] max-h-[225px]  '/>
        
          </SkeletonTheme>
              
         
        
             
    )
}

