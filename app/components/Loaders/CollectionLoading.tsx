

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function CollectionLoading() {

    return (

        <div className='h-[500px] w-[95%] mx-auto mt-4'>

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
        <Skeleton   style={{ height: '100%', width: '100%' }}  className='rounded-xl '/>
        
          </SkeletonTheme>
              
         
        
              </div>
    )
}

