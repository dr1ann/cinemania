'use client'
//External Libraries
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import  { ErrorContext }  from './ErrorContextProvider';

 //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
  },
});

//types

interface CreditsProps {
     cast: Array<{
   credit_id?: string;
   id: number;
   cast_id: number;
   character: string;
   original_name: string ;
   profile_path: string ;
   known_for_department: string;
   job: string;
  }>;
  crew: Array<{
    credit_id?: string;
    id: number;
    cast_id: number;
    character: string;
    original_name: string ;
    profile_path: string ;
    known_for_department: string;
    job: string;
  }>;
}

interface VideoProps {
  results: Array<{
    id: string;
    key:string;
  }>
}


interface MovieDetailsProps {
  backdrop_path: string;
  belongs_to_collection:{
    id:number | string
  }
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>
  id?:number
  title: string
  overview: string;
  popularity: number;
  release_date: string | number;
  revenue: number
  runtime: number
  vote_average: number;
  vote_count: number;
  status: string;

}

interface MovieSocMediaProps {
  facebook_id: string;
instagram_id: string
twitter_id: string
}

interface MovieImagesProps {
  logos?: Array<{
    file_path: string;
  }>,
  posters?: Array<{
    file_path:string
    id?: number
  }>
}
interface Suggested_SimilarProps {
  results: Array<{
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
  }>
}





// All API request functions
export const Crew_CastAPI = (CreditsData: string): {
  credits: CreditsProps;
  isPeopleLoading: boolean;
  
} => {
  // use states
  const [credits, setCredits] = useState<CreditsProps>({ cast: [], crew: [] });
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isError, setisError]  = useContext(ErrorContext);

  const DataFromAPI = async () => {
    try {
      const response = await axiosInstance.get(CreditsData); // Movie Credits
      setCredits(response.data);
      setIsPeopleLoading(false); // Skeleton loader is disabled
       
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set isError to true on error
       setisError(true) // set error to true whenever fetching of data is failed
    }
  };

  useEffect(() => {
    // call the function to get the data from the api
    DataFromAPI();
  }, []);

  return { credits, isPeopleLoading };
};


  

  export const OverviewAPI = (  MovieDetailsData: string = '',
  MovieVidsData: string = '',
  MovieImagesData: string = '',
  MovieSocMedData: string = '' ) :
  { movieDetails: MovieDetailsProps,
    movieVid: VideoProps,
    movieImages: MovieImagesProps,
    movieSoc: MovieSocMediaProps,
    isLoading: boolean,
    movieVidsReady: boolean,
    movieImagesReady: boolean,
    
  } => {
    
    //use states
    const [isError, setisError]  = useContext(ErrorContext);
    const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>({} as MovieDetailsProps);
    const [movieVid, setMovieVid] = useState<VideoProps>({results: []});
    const [movieImages, setmovieImages] = useState<MovieImagesProps>({logos: [], posters: []});
    const [movieSoc, setMovieSoc] = useState<MovieSocMediaProps>({} as MovieSocMediaProps);
    
    const [isLoading, setisLoading] = useState(true); // Skeleton Loader now disabled
    const [movieVidsReady, setMovieVidsReady] = useState(false);
    const [movieImagesReady, setMovieImagesReady] = useState(false);
      const DataFromAPI = async () => {

        try {
          
          const apiPromises = [
             axiosInstance.get(MovieDetailsData),
             axiosInstance.get(MovieVidsData),
             axiosInstance.get(MovieImagesData),
             axiosInstance.get(MovieSocMedData),
          ];
      
          const [MovDetails, MovVids, MovLogo, MovSocMed   ] = await Promise.all(apiPromises);
      
          //getting the data from the API and put values on to its assigned variables
          if (MovDetails) {
            setMovieDetails(MovDetails.data);
          }
          setMovieVid(MovVids.data);
          setmovieImages(MovLogo.data);
          setMovieSoc(MovSocMed.data);

          setisLoading(false); //Skeleton Loader is disabled
          setMovieVidsReady(true);
          setMovieImagesReady(true);
           
        } catch (error) {
          console.error('Error fetching data:', error); // Catch errors if data is not fetched
          setisError(true) // set error to true whenever fetching of data is failed
        }
        
        
      };
      useEffect(() => {
  
          //call the function to get all the data
          DataFromAPI();
    
        }, []);
     
    return { movieDetails, movieVid, movieImages, movieSoc ,isLoading, movieVidsReady, movieImagesReady   };
  };
  
  export const SimilarMoviesAPI = ( SimilarMoviesData: string  ) :
  {  similarMovies: Suggested_SimilarProps,
     isLoading: boolean;
    
  } => {
    
    //use states
    const [similarMovies, setSimilarMovies] = useState<Suggested_SimilarProps>({results: []})
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setisError]  = useContext(ErrorContext);
   const DataFromAPI = async () => {
        
    try {
  
      const response =  await axiosInstance.get(SimilarMoviesData) //Similar Movies
     
      setSimilarMovies(response.data);
      setIsLoading(false) // Skeleton loader is disabled
      
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
      setisError(true) // set error to true whenever fetching of data is failed
    }
    
  };
  
  //call the function to get the data from the api
    useEffect(() => {
  
      DataFromAPI();
  
    }, []);
  return {similarMovies, isLoading}
  };

  export const SuggestedMoviesAPI = ( SuggestedMoviesData: string  ) :
  {  suggestedMovies: Suggested_SimilarProps,
     isLoading: boolean;
   
  } => {
    
    //use states
    const [suggestedMovies, setSuggestedMovies] = useState<Suggested_SimilarProps>({results: []})
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setisError]  = useContext(ErrorContext);
   const DataFromAPI = async () => {
        
    try {
  
      const response =  await axiosInstance.get(SuggestedMoviesData) //Similar Movies
     
      setSuggestedMovies(response.data);
      setIsLoading(false) // Skeleton loader is disabled
     
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
      setisError(true) // set error to true whenever fetching of data is failed
    }
    
  };
  
  //call the function to get the data from the api
    useEffect(() => {
  
      DataFromAPI();
  
    }, []);
  return {suggestedMovies, isLoading}
  };
