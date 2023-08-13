

import { useState, useEffect } from 'react';

import axios from 'axios';



const OverviewAPI = ( MovieDetailsData?: any, MovieVidsData?: any, MovieLogoData?: any, MovieSocMedData?: any   ) => {
    
  //use states
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [movieVid, setMovieVid] = useState<any>({});
  const [movielogo, setmovieLogo] = useState<any>({});
  const [movieSoc, setMovieSoc] = useState<any>({});
  const [currmovieID, setcurMovieID] = useState<any>({})
 
  const [isLoading, setisLoading] = useState(true);

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
        
        
        const apiPromises = [
           axiosInstance.get(MovieDetailsData),
           axiosInstance.get(MovieVidsData),
           axiosInstance.get(MovieLogoData),
           axiosInstance.get(MovieSocMedData),
      
        ];
    
        const [MovDetails, MovVids, MovLogo, MovSocMed   ] = await Promise.all(apiPromises);
    
        //getting the data from the API and put values on to its assigned variables
        setMovieDetails(MovDetails.data);
        setMovieVid(MovVids.data);
        setmovieLogo(MovLogo.data);
        setMovieSoc(MovSocMed.data);
   

        setisLoading(false); // Webpage now shows data after data is fetched
    
       
      } catch (error) {
        console.error('Error fetching data:', error); // Catch errors if data is not fetched
       
      }
      
      
    };
    useEffect(() => {

        //call the function to get all the data
        DataFromAPI();
  
      }, []);
   
  return {currmovieID, movieDetails, movieVid,movielogo, movieSoc ,isLoading };
};

export default OverviewAPI;