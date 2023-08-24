'use client'
//External Libraries
import { useState, ChangeEvent, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

//Client Components
import Header from '../components/Header'
import CollectionLoading from '../components/Loaders/CollectionLoading'

//Client Components that are dynamically rendered
const Movies =  dynamic(() => import ('./Movies'),
{ loading: () => < CollectionLoading /> })

const People =  dynamic(() => import ('./People'),
{ loading: () => < CollectionLoading /> })

//Footer Client Component
import Footer from '../components/Footer'



const Page = () =>{

  const router = useRouter() // Instantiating a new router for navigating 

  // Instantiate a new search parameters object to access and manipulate the query parameters of the current URL.
    const searchParams = useSearchParams()

  
    const SearchedKeyword = searchParams.get('keyword')   // Retrieve the keyword entered by the user from the search parameters.
    const [inputWord, setInputWord] = useState(''); // state used to get the keyword entered by the user
    const [selectedOption, setSelectedOption] = useState<string>('Movies');
    


 //handler when the option is changed
 const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
  setSelectedOption(e.target.value);
};

 //Handler of the searchbar button
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
router.push(`/search?keyword=${inputWord}`)
}

  return (
    <>
  
   <Header />
   <div className=' p-2 sm:p-10 '>
    <form onSubmit={handleFormSubmit } className="flex items-center w-full z-10">   
<label className="sr-only">Search</label>
<div className="relative w-full active">
  
<input value={inputWord}  onChange={(e) => setInputWord(e.target.value)} autoComplete='off' type="text" id="simple-search" className="bg-[hsla(0,0%,94.9%,.14)] input placeholder-[#e6e6e6] text-[1rem]  text-white text-sm rounded-lg block w-full  p-4  focus:outline-none focus:border-[#e2b616] focus:ring-1 focus:ring-[#e2b616]
 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " placeholder="Search for a movie, person..."  />
</div>
<button type="submit" className="p-4 ml-2 text-sm font-medium text-white bg-[#e2b616] rounded-lg border border-[#e2b616]">
   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
   </svg>
   <span className="sr-only">Search</span>
  
</button>
</form>
<>

   <div className='home-animate pop'>
    
           
    <h1 className=' mt-8 pb-[2px] text-center px-4 text-[1rem] md:text-[1.2rem] 2xl:text-[1.3rem] '>Search results for: "{SearchedKeyword}"</h1>
 
    <div className='inline-flex items-center   pt-8  justify-start gap-4 rounded-xl'>
        
       
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'Movies' ? 'active1' : 'notactive'}>
           <input
           className='selector-item_radio'
             type="radio"
             value="Movies"
             checked={selectedOption === 'Movies'}
             onChange={handleOptionChange}
           />
            
            Movies
         </label>
       </div>
  
       
       <div className='selector-item '>
       <label id='radiolabel' className={selectedOption === 'People' ? 'active1' : 'notactive'} >
           <input
           className='selector-item_radio'
          
             type="radio"
             value="People"
             checked={selectedOption === 'People'}
             onChange={handleOptionChange}
           />
        
        People
         </label>
       </div>
    
       </div>
       {selectedOption === 'Movies' ? <Movies /> : <People />}
       
    
         </div>
        
         </>
         
   </div>
< Footer />
    </>
  )
}
export default Page