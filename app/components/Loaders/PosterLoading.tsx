

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function VideosLoading() {

    return (

      

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
        <Skeleton   className=' max-w-[10rem] rounded-xl min-w-[10rem] min-h-[250px] max-h-[250px]  '/>
        
          </SkeletonTheme>
              
         
        
             
    )
}

