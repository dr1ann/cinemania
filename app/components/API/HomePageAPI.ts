
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

//All API request functions 

 export const In_TheatersMoviesAPI = (In_TheatersMoviesData: any  ) => {
    
  //use states
  const [InTheatersMovies, SetInTheatersMovies] = useState<any>({})
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


export const PopularMoviesAPI = ( PopularMoviesData: any  ) => {
    
  //use states
  const [PopularMovies, setPopularMovies] = useState<any>({})
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


export const TrendingMoviesAPI = ( TrendingMoviesData: any  ) => {
    
  //use states
  const [TrendingMovies, setTrendingMovies] = useState<any>({})
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


export const PopularPeopleAPI = ( PopularPeopleData: any  ) => {
    
  //use states
  const [PopularPeople, setPopularPeople] = useState<any>({})
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


export const TopRatedMoviesAPI = ( TopRatedMoviesData: any  ) => {
    
  //use states
  const [TopRatedMovies, setTopRatedMovies] = useState<any>({})
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
