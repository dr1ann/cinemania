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

export const Crew_CastAPI = ( CreditsData: any  ) => {
    
    //use states
    const [credits, setCredits] = useState<any>({})
    const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  
  
   const DataFromAPI = async () => {
      
    try {
  
      const response =  await axiosInstance.get(CreditsData) //Movie Credits 
  
      setCredits(response.data);
      setIsPeopleLoading(false) // Skeleton loader is disabled
  
     
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };
    useEffect(() => {
   
      //call the function to get the data from the api
      DataFromAPI();
  
    }, []);
  return {credits, isPeopleLoading}
  };

  export const MediaAPI = ( MovieVideosData: any, MovieImagesData: any  ) => {
    
    //use states
      const [movieImages, setMovieImages] = useState<any>({});
      const [MovieVids, setMovieVids] = useState<any>({});
      const [movieVidsReady, setMovieVidsReady] = useState(false);
    const [movieImagesReady, setMovieImagesReady] = useState(false);
   
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

        //Skeleton Loders Now disabled
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
  
  export const OverviewAPI = ( MovieDetailsData?: any, MovieVidsData?: any, MovieLogoData?: any, MovieSocMedData?: any   ) => {
    
    //use states
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [movieVid, setMovieVid] = useState<any>({});
    const [movielogo, setmovieLogo] = useState<any>({});
    const [movieSoc, setMovieSoc] = useState<any>({});
   
    const [isLoading, setisLoading] = useState(true); // Skeleton Loader now disabled
 
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

          setisLoading(false); //Skeleton Loader is disabled
      
         
        } catch (error) {
          console.error('Error fetching data:', error); // Catch errors if data is not fetched
         
        }
        
        
      };
      useEffect(() => {
  
          //call the function to get all the data
          DataFromAPI();
    
        }, []);
     
    return { movieDetails, movieVid,movielogo, movieSoc ,isLoading };
  };
  
  export const SimilarMoviesAPI = ( SimilarMoviesData: any  ) => {
    
    //use states
    const [similarMovies, setSimilarMovies] = useState<any>({})
    const [isLoading, setIsLoading] = useState(true);
  
   const DataFromAPI = async () => {
        
    try {
  
      const response =  await axiosInstance.get(SimilarMoviesData) //Similar Movies
     
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

  export const SuggestedMoviesAPI = ( SuggestedMoviesData: any  ) => {
    
    //use states
    const [suggestedMovies, setSuggestedMovies] = useState<any>({})
    const [isLoading, setIsLoading] = useState(true);
  
   const DataFromAPI = async () => {
        
    try {
  
      const response =  await axiosInstance.get(SuggestedMoviesData) //Similar Movies
     
      setSuggestedMovies(response.data);
      setIsLoading(false) // Skeleton loader is disabled
  
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };
  
  //call the function to get the data from the api
    useEffect(() => {
  
      DataFromAPI();
  
    }, []);
  return {suggestedMovies, isLoading}
  };
