

import { useState, useEffect } from 'react';
import axios from 'axios';



const SimilarAPI = ( SimilarMovies: any  ) => {
    
  //use states

  const [similarMovies, setSimilarMovies] = useState<any>({})
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

    //the current movie id


    const response =  await axiosInstance.get(SimilarMovies) //Similar Movies
   

  
    setSimilarMovies(response.data);
    setIsLoading(false) // Skeleton loader is disabled

 
   
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};

//call the function to get the data from the api
  useEffect(() => {

    DataFromAPI();

  }, []);
return {similarMovies, isLoading}
};

export default SimilarAPI;