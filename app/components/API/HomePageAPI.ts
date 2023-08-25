
//External Libraries
import { useState, useEffect } from 'react';
import axios from 'axios';
 

 //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
  },
});

//types
interface MovieProps {
  results:Array<{
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
    backdrop_path?: string;
  }>

}

interface PersonProps {
  results: Array<{
    id: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
  }>
}
//All API request functions 

 export const In_TheatersMoviesAPI = ( In_TheatersMoviesData: string ) :
 { InTheatersMovies: MovieProps,
   isLoading: boolean
 } => {
    
  //use states
  const [InTheatersMovies, SetInTheatersMovies] = useState<MovieProps>({results: []})
  const [isLoading, setIsLoading] = useState(true);


 const DataFromAPI = async () => {
      

  try {

    const response =  await axiosInstance.get(In_TheatersMoviesData) //In Theaters Movies
   
    SetInTheatersMovies(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {InTheatersMovies, isLoading}
};


export const PopularMoviesAPI = ( PopularMoviesData: string  ) :
{ PopularMovies: MovieProps,
  isLoading: boolean
} => {
    
  //use states
  const [PopularMovies, setPopularMovies] = useState<MovieProps>({results: []})
  const [isLoading, setIsLoading] = useState(true);

 const DataFromAPI = async () => {
    
  try {

    const response =  await axiosInstance.get(PopularMoviesData) //Popular Movies
   
    setPopularMovies(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {PopularMovies, isLoading}
};


export const TrendingMoviesAPI = ( TrendingMoviesData: string ) :
{ TrendingMovies: MovieProps,
  isLoading: boolean
} => {
  //use states
  const [TrendingMovies, setTrendingMovies] = useState<MovieProps>({results: []})
  const [isLoading, setIsLoading] = useState(true);
    
 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(TrendingMoviesData) //Trending Movies
   
    setTrendingMovies(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {TrendingMovies, isLoading}
};


export const PopularPeopleAPI = ( PopularPeopleData: string  ) :
{ PopularPeople: PersonProps,
  isLoading: boolean
} => {
  //use states
  const [PopularPeople, setPopularPeople] = useState<PersonProps>({results: []})
  const [isLoading, setIsLoading] = useState(true);

 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(PopularPeopleData) //Popular People
   
    setPopularPeople(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {PopularPeople, isLoading}
};


export const TopRatedMoviesAPI = ( TopRatedMoviesData: string  ) :
{ TopRatedMovies: MovieProps,
  isLoading: boolean
} => {
    
  //use states
  const [TopRatedMovies, setTopRatedMovies] = useState<MovieProps>({results: []})
  const [isLoading, setIsLoading] = useState(true);

 const DataFromAPI = async () => {
      
  try {

    const response =  await axiosInstance.get(TopRatedMoviesData) //Top Rated Movies
   
    setTopRatedMovies(response.data);
    setIsLoading(false) // Skeleton loader is disabled

  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {TopRatedMovies, isLoading}
};
