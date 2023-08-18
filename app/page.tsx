
//External Libraries
import React from 'react'
import dynamic from 'next/dynamic'

//Loader Component(s)
import MoviePosterLoading from './components/Loaders/MoviePosterLoading'

//Normal import of a component
import MainPage from './components/MainPage'
import TrendingMovies from './components/TrendingMovies'
import PopularMovies from './components/PopularMovies'
import PopularPeople from './components/PopularPeople'

//Client Components that are dynamically rendered
const InTheatersMovies =  dynamic(() => import ('./components/In_TheatersMovies'),
{loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })

const TopRatedMovies =  dynamic(() => import ('./components/TopRatedMovies'),
{loading: () =>   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>
{Array.from({ length: 15 }).map((_, index) => (
<MoviePosterLoading key={index} />
))}</div> })


//Foter Client Component
import Footer from './components/Footer'


const page = () => {
  return (
   <>
    <MainPage /> 
   <TrendingMovies /> 
   <PopularMovies /> 
   <PopularPeople /> 
   <InTheatersMovies /> 
   <TopRatedMovies /> 
   <Footer /> 

   
   </>
  )
}
export default page