    
    //External Libraries
    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useSearchParams } from 'next/navigation';
    import React from 'react';

     //Authorization to fetch data from the API with its base url
 const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });
//type
interface MovieResultsProps {
    page: number
    results: Array<{
        id: number;
        title: string;
        vote_average: number;
        release_date: string;
        poster_path: string;
    }>
    total_pages:number
total_results: number
}

export const SearchedMovieAPI = (SearchedKeywordData: string) :
{   MovieResults: MovieResultsProps
    isLoading: boolean   
    PageNum: number
    SetPageNum: React.Dispatch<React.SetStateAction<number>>;
    error: boolean
} => {
const [MovieResults, setMovieResults] = useState<MovieResultsProps>({} as MovieResultsProps)
const [isLoading, setIsLoading] = useState(true);
const [PageNum, SetPageNum] = useState(1);
const [error, setError] = useState(false);

const searchParams = useSearchParams()

const SearchedKeyword = searchParams.get('keyword')
//fetching the data from the api
const DataFromAPI = async () => {
    
try {

  const response =  await axiosInstance.get(SearchedKeywordData)
 
  setMovieResults(response.data);
  setIsLoading(false) // Skeleton loader is disabled
  setError(false); // set error to false whenever the fetching is success
} catch (error) {
  console.error('Error fetching data:', error); // Catch errors if data is not fetched
  setError(true) // set error to true whenever the fetching is failed
}




};

//call the function to get the data from the api
useEffect(() => {

DataFromAPI();
return () => {
 setIsLoading(true) // Clean up: Set isLoading to true before next fetch
};
}, [PageNum, SearchedKeyword]); //re render the component whenever there are changes to the dependencies


return {MovieResults, isLoading, error, PageNum, SetPageNum }
}