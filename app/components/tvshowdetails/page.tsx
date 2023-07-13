'use client'
import React, { useState, useEffect } from 'react';

export default function Page() {
    const [tvDetails, SetTvDetails] = useState<any>({});
    useEffect(() => {
        const tvDet = async () => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/tv/114472?language=en-US`,
                {
                  headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
                  },
                }
              );
              const data = await response.json();
              SetTvDetails(data);
             
            } catch (error) {
              console.error(error);
            }
          };
          tvDet();
    }, []);
  console.log(tvDetails)
  return (
    <div>page</div>
  )
}
