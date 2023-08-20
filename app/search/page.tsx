'use client'
//External Libraries
import { useState, ChangeEvent, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

//API Component
import { SearchedMoviesAPI } from '../components/API/MovieDetailsAPI'

//Client Components
import Header from '../components/Header'
import CollectionLoading from '../components/Loaders/CollectionLoading'
import Movies from './Movies'
import People from './People'
  //types
  interface SearchResultProps {
    media_type: string
   }

const page = () =>{

  const router = useRouter() // Instantiating a new router for navigating 

  // Instantiate a new search parameters object to access and manipulate the query parameters of the current URL.
    const searchParams = useSearchParams()

    // Retrieve the keyword entered by the user from the search parameters.
    const SearchedKeyword = searchParams.get('keyword')
    const [inputWord, setInputWord] = useState(''); // state used to get the keyword entered by the user


    //handler when the option is changed
    const [selectedOption, setSelectedOption] = useState<string>('Movies');
 //get the values of the fetched data from the API
 const {SearchResults, isLoading} = SearchedMoviesAPI(
`https://api.themoviedb.org/3/search/multi?query=${SearchedKeyword}`
   
  );




 const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
   setSelectedOption(e.target.value);
 };

 //Filter results based on the prefered media type
 const MovieResults  = SearchResults?.results?.filter((movie: SearchResultProps) => movie?.media_type === 'movie')
  const Peopleresults  = SearchResults?.results?.filter((person: SearchResultProps) => person?.media_type === 'person')

  //put the 2 results for specfying a condition
 let combinedResults=[]
 combinedResults.push(MovieResults, Peopleresults)


//handler of the button in search bar
const handleButtonClick = () => {
  router.push(`/search?keyword=${inputWord}`)
 if(inputWord !== SearchedKeyword){
  
  setTimeout(() => {
    window.location.reload();
  }, 500);
 }
  
};


  return (
    <>
  
   <Header />
   <div className=' p-2 sm:p-10 '>
    <form className="flex items-center w-full z-10">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
   <input value={inputWord}  onChange={(e) => setInputWord(e.target.value)} type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search for a movie, person..." required />
</div>
<button type="button" onClick={handleButtonClick} className="p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-lg border border-[#e2b616]">
   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
   </svg>
   <span className="sr-only">Search</span>
  
</button>
</form>
<>
{isLoading
?
<CollectionLoading />
:
   <div className='home-animate pop'>
     {SearchResults?.results?.length >0 && combinedResults?.length > 0
           ?
           <>
           
    <h1 className='bg-[#1a1a1a] rounded-md mt-8 pb-[2px]  px-2 text-[0.85rem] md:text-[1rem] w-fit'>Search results for: "{SearchedKeyword}"</h1>
 
           
        <div className='inline-flex items-center   pt-8  justify-start gap-4 rounded-xl'>
        {MovieResults?.length > 0
       ?
       
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'Movies' ? 'active1' : 'notactive'}>
           <input
           className='selector-item_radio'
             type="radio"
             value="Movies"
             checked={selectedOption === 'Movies'}
             onChange={handleOptionChange}
           />
            
            { `Movies  ${MovieResults?.length}`}
         </label>
       </div>
      
       :
       ''
      }
       {Peopleresults?.length > 0
       ?
       
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'People' ? 'active1' : 'notactive'} >
           <input
           className='selector-item_radio'
          
             type="radio"
             value="People"
             checked={selectedOption === 'People'}
             onChange={handleOptionChange}
           />
        
        { `People  ${Peopleresults?.length}`}
         </label>
       </div>
       :
       ''
     }
       </div>
      
       {selectedOption === 'Movies' && MovieResults.length > 0
       ?
       <Suspense fallback={<CollectionLoading />}>
       <Movies KeywordResults={MovieResults} />
       </Suspense>
       :
       ''
      }
      {selectedOption === 'People' && Peopleresults.length > 0
       ?
       <Suspense fallback={<CollectionLoading />}>
       <People KeywordResults={Peopleresults} />
         </Suspense>
       :
       ''
      }
      
       </>
       :
       <p className='text-[1rem] md:text-[1.2rem] 2xl:text[1.5rem] text-center mt-20'>{`No Search results for "${SearchedKeyword}" `}</p>
         }
         </div>
        }
         </>
         
   </div>

    </>
  )
}
export default page