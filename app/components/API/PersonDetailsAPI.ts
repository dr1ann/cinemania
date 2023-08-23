

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
  interface PersonDetailsProps {
    name: string
    profile_path: string
    biography: string
    deathday: string | number
    birthday: string | number
    popularity: number
    known_for_department: string
    place_of_birth: string
   
  }

interface PersonSocMediaProps {
  facebook_id: number | string
  instagram_id: number | string
  twitter_id: number | string

}

interface PersonMoviesProps {
  cast: Array<{
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
  }>;
  crew: Array<{
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
  }>;
}

export const PersonMoviesAPI = ( PersonMovies: string) : {
  Movies: PersonMoviesProps ;
  isLoading: boolean;
 
} => {
    
  //use states
  const [isLoading, setIsLoading] = useState(true);
  const [Movies, setMovies] = useState<PersonMoviesProps>({cast: [],crew: [] });
  

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
  
return { Movies, isLoading }
};


export const InfoAPI = (
  PersonInfoData: string,
  PersonSocMediaData: string
): {
  personDetails: PersonDetailsProps;
  PersonSocMedia: PersonSocMediaProps;
  isPersonLoading: boolean;
} => {
    
    //use states
    const [personDetails, setPersonDetails] = useState<PersonDetailsProps>({} as PersonDetailsProps);
    const [PersonSocMedia, setPersonSocMedia] = useState<PersonSocMediaProps>({} as PersonSocMediaProps);
    const [isPersonLoading, setIsPersonLoading] = useState(true);
  
   const DataFromAPI = async () => {
        
    try {

      const apiPromises = [
        axiosInstance.get(PersonInfoData), //Person's Info/details
        axiosInstance.get(PersonSocMediaData) //Person's Social Media
      ]
  
      const [details, socMedia] = await Promise.all(apiPromises);
      
      setPersonDetails(details.data) //Personal data is fetched 
      setPersonSocMedia(socMedia.data) //Social Media is fetched 
      setIsPersonLoading(false) // Skeleton loader is disabled
  
   
     
    } catch (error) {
      console.error('Error fetching data:', error); // Catch errors if data is not fetched
    }
    
  };
  
    
  
    useEffect(() => {
    
    
      //call the function to get the data from the api
      DataFromAPI();
  
    }, [isPersonLoading ]);
  
  return {personDetails, PersonSocMedia, isPersonLoading}
  };