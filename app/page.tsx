import React from 'react'

import TrendingMovies from './components/TrendingMovies'
import PopularMovies from './components/PopularMovies'
import PopularPeople from './components/PopularPeople'
import InTheatersMovies from './components/In_TheatersMovies'
import TopRatedMovies from './components/TopRatedMovies'
import Footer from './components/Footer'
import MainPage from './components/MainPage'

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