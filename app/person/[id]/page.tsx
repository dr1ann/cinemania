//External Libraries
import dynamic from 'next/dynamic'

import Info from './info'
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading'
import CollectionLoading from '@/app/components/Loaders/CollectionLoading'

const PopularMovies =  dynamic(() => import ('./PopularMovies'),
{ loading: () => < MoviePosterLoading />, })

const AllMovies =  dynamic(() => import ('./AllMovies'),
{ loading: () => < CollectionLoading />, })

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
const page = ({ params }: { params: { id: number } }) => {
  return (
    <>
      < Header />
   < Info id={params.id} />
   < PopularMovies id={params.id} />
   < AllMovies id={params.id}/>
   < Footer />

   </>
  )
}
export default page