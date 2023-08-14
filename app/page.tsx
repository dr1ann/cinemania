
//External Libraries
import React from 'react'
import dynamic from 'next/dynamic'

//Loaders
import MoviePosterLoading from './components/Loaders/MoviePosterLoading'
import HomeLoading from './components/Loaders/HomeLoading'

//Client Components that are dynamically rendered
const MainPage =  dynamic(() => import ('./components/MainPage'),
{ loading: () => < HomeLoading />, })

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