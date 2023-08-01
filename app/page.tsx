import React from 'react'
import TrendingMovies from './components/TrendingMovies'
import PopularMovies from './components/PopularMovies'
import PopularPeople from './components/PopularPeople'
import InTheatersMovies from './components/In_Theaters'
import TopRatedMovies from './components/TopRated'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
export default function page() {
  return (
   <>
    <HomePage /> 
   <TrendingMovies /> 
   <PopularMovies /> 
   <PopularPeople /> 
   <InTheatersMovies /> 
   <TopRatedMovies /> 
   <Footer /> 
   </>
  )
}
