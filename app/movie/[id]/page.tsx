'use client'
import dynamic from 'next/dynamic'
import HomeLoading from '@/app/components/Loaders/HomeLoading'
import PersonLoading from '@/app/components/Loaders/PersonLoading'
import CollectionLoading from '@/app/components/Loaders/CollectionLoading'
import VideosLoading from '@/app/components/Loaders/VideosLoading'
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading'

//Client Components
const Overview =  dynamic(() => import ('./overview'),
{
  loading: () => < HomeLoading />,
}
)
const Crew_Cast =  dynamic(() => import ('./Crew_Cast'),
{
  loading: () => < PersonLoading />,
}

)

const Collection =  dynamic(() => import ('./Collection'),
{
  loading: () => < CollectionLoading />,
}
)

const Media =  dynamic(() => import ('./Media'),
{
  loading: () => < VideosLoading />,
}
)
const Similar =  dynamic(() => import ('./Similar'),
{
  loading: () => < MoviePosterLoading />,
}
)

const Suggested =  dynamic(() => import ('./Suggested'),
{
  loading: () => < MoviePosterLoading />,
}
)
export async function generateStaticParams() {
  return [
    {
      params: {
        id: '82992',
      },
    },
    // You can add more objects with different IDs if needed
    // {
    //   params: {
    //     id: 'another_id',
    //   },
    // },
    // ...
  ];
}



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
