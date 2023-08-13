

import { useState, useEffect } from 'react';
import axios from 'axios';



const TopRatedMoviesAPI = ( TopRatedMoviesData: any  ) => {
    
  //use states
  const [TopRatedMovies, setTopRatedMovies] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);



  //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });

 //fetch all data from the api
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

export default TopRatedMoviesAPI;