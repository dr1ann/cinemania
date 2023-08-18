
//External Libraries

import dynamic from 'next/dynamic'

//Loader Components
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading'
import CollectionLoading from '@/app/components/Loaders/CollectionLoading'
import HomeLoading from '@/app/components/Loaders/HomeLoading'

//Normal import of a component
import Info from './info'
import PopularMovies from './PopularMovies'
// import AllMovies from './AllMovies'

//Client Components that are dynamically rendered
const AllMovies =  dynamic(() => import ('./AllMovies'),
{ loading: () => < CollectionLoading /> })

//Client Footer Component
import Footer from '@/app/components/Footer'

const page = ({ params }: { params: { id: number } }) => {
  return (
    <>
     
   < Info id={params.id} />
   < PopularMovies id={params.id} />
   < AllMovies id={params.id}/>
   < Footer />

   </>
  )
}
export default page