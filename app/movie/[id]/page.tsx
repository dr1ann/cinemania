
"use client"
//External Libraries
import dynamic from 'next/dynamic'

//Loaders
import PersonLoading from '@/app/components/Loaders/PersonLoading'
import CollectionLoading from '@/app/components/Loaders/CollectionLoading'
import VideosLoading from '@/app/components/Loaders/VideosLoading'
import MoviePosterLoading from '@/app/components/Loaders/MoviePosterLoading'

//Normal import of a component
import Overview from './overview'

//Error Component
import ErrorContextProvider from './ErrorContextProvider'

//Client Components that are dynamically rendered
const Crew_Cast =  dynamic(() => import ('./Crew_Cast'),
{ loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
   {Array.from({ length: 15 }).map((_, index) => (
  <PersonLoading key={index} />
))}</div> })

const Collection =  dynamic(() => import ('./Collection'),
{ loading: () => < CollectionLoading /> })

const Media =  dynamic(() => import ('./Media'),
{ loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<VideosLoading key={index} />
))}</div> })

const Similar =  dynamic(() => import ('./Similar'),
{ loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })

const Suggested =  dynamic(() => import ('./Suggested'),
{ loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })

//Client Footer Component
import Footer from '../../components/Footer'

const Page = ({ params }: { params: { id: number } }) => {

  return (
    <>

 <ErrorContextProvider>
 

  <Overview id={params.id} />

  <Crew_Cast id={params.id} />
    <Collection id={params.id} />
    <Media id={params.id}/>
    <Similar id={params.id} />
    <Suggested id={params.id} />
    </ErrorContextProvider>
 
    <Footer />
    </>

  
  )
}

export default Page
