
//External Libraries
import React from 'react'
import dynamic from 'next/dynamic'

//Loader Component(s)
import MoviePosterLoading from './components/Loaders/MoviePosterLoading'

//Normal import of a component
import MainPage from './homepage/MainPage'
import TrendingMovies from './homepage/TrendingMovies'
import PopularMovies from './homepage/PopularMovies'
import PopularPeople from './homepage/PopularPeople'

//Error Component
import ErrorContextProvider from './homepage/ErrorContextProvider'

//Client Components that are dynamically rendered
const InTheatersMovies =  dynamic(() => import ('./homepage/In_TheatersMovies'),
{loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })

const TopRatedMovies =  dynamic(() => import ('./homepage/TopRatedMovies'),
{loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })


//Foter Client Component
import Footer from './components/Footer'


const Page = () => {
  return (
   <>
   
   <ErrorContextProvider>
    <MainPage /> 
   <TrendingMovies /> 
   <PopularMovies /> 
   <PopularPeople /> 
   <InTheatersMovies /> 
   <TopRatedMovies /> 
   </ErrorContextProvider>

   <Footer /> 

   
   </>
  )
}
export default Page