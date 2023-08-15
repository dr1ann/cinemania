

import { useState, useEffect } from 'react';
import axios from 'axios';



const PopularMoviesAPI = ( PersonMovies: any  ) => {
    
  //use states
  const [isLoading, setIsLoading] = useState(true);
  const [Movies, setMovies] = useState<any>({})


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
  
    const response =  await axiosInstance.get(PersonMovies) //Person's Movies 
   
    setMovies(response.data); 
    setIsLoading(false) // Skeleton loader is disabled


  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

  useEffect(() => {
 
    //call the function to get the data from the api
    DataFromAPI();

  }, []);
  
return {Movies, isLoading}
};

export default PopularMoviesAPI;