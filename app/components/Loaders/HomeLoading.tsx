

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';





export default function HomeLoading() {

    return (

        <div className='h-screen flex flex-col  items-center relative'>

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
        <Skeleton   style={{ height: '100vh', width: '100vw' }}  className='rounded-xl '/>
        
          </SkeletonTheme>
              
         
        
              </div>
    )
}

