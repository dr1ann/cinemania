import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  getMovieKey?: string;
  getMovieID?: string | null;
}

const Modal :  React.FC<ModalProps>  =   ({ isVisible, onClose, getMovieID }) => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });

  const [movieVid, setMovieVid] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieVid = async () => {
      try {

      

        const response =  await axiosInstance.get(`/movie/${getMovieID}/videos?language=en-US`) //MovieCredits
       
    
      
        generateRandomVid(response.data && response.data.results);
    
     
       
      } catch (error) {
        console.error('Error fetching data:', error); // Catch errors if data is not fetched
      }
    };
    if (isVisible) {
      fetchMovieVid();
    }
  }, [isVisible, getMovieID]);

  const generateRandomVid = (movies: any[]) => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];
      const vidUrl = `https://www.youtube.com/embed/${movie.key}`;
      setMovieVid(vidUrl);
    }
  };

  return (
    <div>
      {isVisible  && movieVid !== null ? (
        <div className='h-screen w-full bg-opacity-25 z-[100000] backdrop-blur-sm fixed mx-auto flex justify-center items-center'>
          <div className='flex items-center justify-center relative mx-4 sm:mx-0 h-[50%] w-full sm:w-[80%] sm:h-[55%] md:w-[70%] md:h-[60%] lg:w-[55%] lg:h-[65%] overflow-x-hidden '>
            <button
              className='absolute top-0 text-[0.75rem] rounded-full bg-gray-800 w-fit h-fit px-2 py-[2px] right-0 z-[9999999] mx-auto'
              onClick={onClose}
            >
              ✕
            </button>
            <iframe
              src={movieVid}
              className='object-contain responsive-iframe w-full h-full'
              allowFullScreen
              
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
