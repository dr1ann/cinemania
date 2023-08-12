

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';



const OverviewAPI = ( MovieDetails?: any, MovieVids?: any, MovieLogo?: any, MovieSocMed?: any   ) => {
    
  //use states
  const searchParams = useSearchParams();
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
           axiosInstance.get(MovieDetails),
           axiosInstance.get(MovieVids),
           axiosInstance.get(MovieLogo),
           axiosInstance.get(MovieSocMed),
      
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

        setcurMovieID(searchParams.get('id'))
        //call the function to get all the data
        DataFromAPI();
    
    
       
      }, []);
      console.log(movieVid)
  return {currmovieID, movieDetails, movieVid,movielogo, movieSoc ,isLoading };
};

export default OverviewAPI;