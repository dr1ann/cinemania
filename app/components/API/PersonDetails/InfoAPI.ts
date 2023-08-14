

import { useState, useEffect } from 'react';
import axios from 'axios';



const InfoAPI = ( PersonInfoData: any, PersonSocMediaData:any  ) => {
    
  //use states
  const [personDetails, setPersonDetails] = useState<any>({})
  const [PersonSocMedia, setPersonSocMedia] = useState<any>({})
  const [isPersonLoading, setIsPersonLoading] = useState(true);


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

export default InfoAPI;