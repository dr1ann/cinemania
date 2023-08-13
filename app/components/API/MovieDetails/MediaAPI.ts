

import { useState, useEffect } from 'react';
import axios from 'axios';



const MediaAPI = ( MovieVideosData: any, MovieImagesData: any  ) => {
    
  //use states
    const [movieImages, setMovieImages] = useState<any>({});
    const [MovieVids, setMovieVids] = useState<any>({});
    const [movieVidsReady, setMovieVidsReady] = useState(false);
  const [movieImagesReady, setMovieImagesReady] = useState(false);
 
     //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });

  //geting the data from the API
  const DataFromAPI = async () => {
      
    try {

      const apiPromises = [
   
        axiosInstance.get(MovieVideosData), //Movie Videos
        axiosInstance.get(MovieImagesData), //Movie Images
       
    
      ];
    //getting the data from the API and put values on to its assigned variables
      const [MovieVids, MovieImages] = await Promise.all(apiPromises);

      setMovieVids(MovieVids.data);
      setMovieImages(MovieImages.data)

      setMovieVidsReady(true);
      setMovieImagesReady(true);
     
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    } 
    
  };
  useEffect(() => {

      //call the function to get all the data from the api
      DataFromAPI();
  },[] );

return {MovieVids, movieImages, movieVidsReady, movieImagesReady }
};

export default MediaAPI;