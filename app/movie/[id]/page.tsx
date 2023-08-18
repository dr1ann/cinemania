

//External Libraries
import dynamic from 'next/dynamic'

//Loaders
import HomeLoading from '@/app/components/Loaders/HomeLoading'
import PersonLoading from '@/app/components/Loaders/PersonLoading'
import CollectionLoading from '@/app/components/Loaders/CollectionLoading'
import VideosLoading from '@/app/components/Loaders/VideosLoading'
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading'

//Normal import of a component
import Overview from './overview'


//Client Components that are dynamically rendered
const Crew_Cast =  dynamic(() => import ('./Crew_Cast'),
{ loading: () => < PersonLoading />, })

const Collection =  dynamic(() => import ('./Collection'),
{ loading: () => < CollectionLoading />, })

const Media =  dynamic(() => import ('./Media'),
{ loading: () => < VideosLoading />, })

const Similar =  dynamic(() => import ('./Similar'),
{ loading: () => < MoviePosterLoading />, })

const Suggested =  dynamic(() => import ('./Suggested'),
{ loading: () => < MoviePosterLoading />,})



//Client Footer Component
import Footer from '../../components/Footer'

const page = ({ params }: { params: { id: number } }) => {

  return (
    <>
  <Overview id={params.id} />
  <Crew_Cast id={params.id} />
    <Collection id={params.id} />
    <Media id={params.id}/>
    <Similar id={params.id} />
    <Suggested id={params.id} />
    <Footer />
    </>
  )
}

export default page
