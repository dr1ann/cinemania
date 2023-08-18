
//External Libraries
import React from 'react'
import dynamic from 'next/dynamic'

//Loader Components
import MoviePosterLoading from './components/Loaders/MoviePosterLoading'
import HomeLoading from './components/Loaders/HomeLoading'

//Normal import of a component
import MainPage from './components/MainPage'

//Client Components that are dynamically rendered
const TrendingMovies =  dynamic(() => import ('./components/TrendingMovies'),
{ loading: () => < MoviePosterLoading />, })

const PopularMovies =  dynamic(() => import ('./components/PopularMovies'),
{ loading: () => < MoviePosterLoading />, })

const PopularPeople =  dynamic(() => import ('./components/PopularPeople'),
{ loading: () => < MoviePosterLoading />, })

const InTheatersMovies =  dynamic(() => import ('./components/In_TheatersMovies'),
{ loading: () => < MoviePosterLoading />, })

const TopRatedMovies =  dynamic(() => import ('./components/TopRatedMovies'),
{ loading: () => < MoviePosterLoading />, })


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