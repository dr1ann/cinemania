'use client'

// External Libraries
import Image from 'next/image';
import Link from 'next/link';
import  {Drawer} from 'vaul'

//Images
import noprofile from '../../Images/noprofile.png'

//Components
import PersonLoading from '../../components/Loaders/PersonLoading';

//API component
import Crew_CastAPI from '../../components/API/MovieDetails/Crew_CastAPI';

//type
type MovieCredits = {
  credit_id: number;
  id: number;
  cast_id: number;
 character: string;
  original_name: string ;
  
  profile_path: string ;
  known_for_department: string;
  job: string;
  
};



const Crew_Cast = ({ id }: { id: number }) => {



  //get the values of the fetched data from the API
  const { credits, isPeopleLoading } = Crew_CastAPI(`/movie/${id}/credits?language=en-US`);
 

 


 


 //get only the important crew members from the movie 
 const importantCrewMembers = credits?.crew?.filter((movie:MovieCredits) => {
  return (
    movie.job === 'Director' || 
     movie.job === 'Writer' ||
      movie.job === 'Producer'
   
  )
  
});

  return (
    
    <>
         <div>
    <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top Billed Cast</h1>
    {isPeopleLoading ? 
   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center p-6 sm:py-6 sm:px-10 gap-6'>

   {Array.from({ length: 15 }).map((_, index) => (
     <PersonLoading key={index} />
   ))}
       
       </div> 
       
    :
<div className='relative'>
      {credits?.cast?.length > 0
      ?
    <ul className='flex flex-row overflow-x-scroll  bigscreens:justify-center  p-6 sm:py-6 sm:px-10 gap-6 '>

{credits?.cast?.slice(0, 15).map((cast: MovieCredits) => (

<li key={cast['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-md'> 



<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {cast['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${cast['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${cast['profile_path']} 1x,
 https://image.tmdb.org/t/p/w276_and_h350_face${cast['profile_path']} 2x`}
loading='eager'
alt={cast['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  rounded-t-md max-h-[175px] min-h-[175px] flex self-center  overflow-hidden'>
    <Image  
 src={noprofile}
    className='w-full h-full'
    
    loading='eager'
    alt={cast['original_name']} />
    
    </div>
  }

 
    <Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
       href={{
        pathname: `/person/${cast.id}`,
      }}
    
    >

    {cast['original_name'] ?
     cast['original_name'] : 'N/A'}
     
     </Link>
    {cast.character ?
        <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]   text-gray-300'>{cast['character']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>N/A</p> 
  }

    
    </div>     
</li>

    
))

}
<>
{credits?.cast?.length >= 20
?
<Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className='w-fit whitespace-nowrap  h-fit flex self-center hover:text-[#e2b616]'>View More ➠</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#141414] z-[99999999] flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px]">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#3F3F3F] mb-4 mt-2"  />
        <h1 className=' font-bold text-center text-[1.3rem] sm:text-[1.7rem]'>Cast</h1>
          <ul className="grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-[repeat(3,1fr)]  sm:grid  sm:grid-cols-moreCast
           mx-auto sm:w-[95%]  px-2   sm:gap-4  gap-6  overflow-y-scroll py-4 ">
          {credits?.cast?.slice(15).map((other_cast: MovieCredits) => (
            <li key={other_cast.credit_id} className='bg-[#1a1a1a] mx-auto  drop-shadow-2xl customized-shadow
             shadow-sm rounded-md flex flex-col 
             animate pop max-w-[8rem] min-w-[8rem] xsmallcpsize:max-w-[8.625rem] xsmallcpsize:min-w-[8.625rem]'>
  {other_cast['profile_path'] ?

<div className='max-w-full min-w-fullmax-h-[175px] min-h-[175px]  flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${other_cast['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${other_cast['profile_path']} 1x,
 https://image.tmdb.org/t/p/w276_and_h350_face${other_cast['profile_path']} 2x`}
loading='lazy'
alt={other_cast['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  rounded-t-md max-h-[175px] min-h-[175px] flex self-center  overflow-hidden'>
    <Image  
 src={noprofile}
    className='w-full h-full'
    
    loading='lazy'
    alt={other_cast['original_name']} />
    
    </div>
  }

 
    <Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
       href={{
        pathname: `/person/${other_cast.id}`,
      }}
    
    >

    {other_cast['original_name'] ?
     other_cast['original_name'] : 'N/A'}
     
     </Link>
    {other_cast.character ?
        <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]   text-gray-300'>{other_cast['character']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>N/A</p> 
  }

    
    </li>
))

}
          </ul>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
 

:
''
}
</>
</ul>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>


    



    <div >
     
   
      
    <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Director, Writer & Producer</h1>
    {isPeopleLoading ? 


   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center   p-6 sm:py-6 sm:px-10 gap-6'>

   {Array.from({ length: 5 }).map((_, index) => (
     <PersonLoading key={index} />
   ))}
       
       </div> 
       
    :
    <div className='relative'>
      {credits?.crew?.length > 0
      ?
    <ul className=' flex flex-row overflow-x-scroll bigscreens:justify-center  p-6 sm:py-6 sm:px-10 gap-6 '>

{importantCrewMembers?.map((crew: MovieCredits) => (


<li key={crew['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-md'> 


<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {crew['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px]  flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${crew['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${crew['profile_path']} 1x, 
https://image.tmdb.org/t/p/w276_and_h350_face${crew['profile_path']} 2x`}
loading='lazy'
alt={crew['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-md overflow-hidden '>
    <Image  
 src={noprofile}
    className='w-full h-full'
    loading='lazy'
    alt={crew['original_name']} />
    
    </div>
  }

 
<Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
    href={{
      pathname: `/person/${crew.id}`,
   }}
  
    >

    {crew['original_name'] ?
     crew['original_name'] : 'N/A'}
     
     </Link>
    {crew['job'] ?
   
   <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem] text-gray-300'>{crew['job']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>{crew['known_for_department']}</p> 
 }

    
    </div>     
</li>




))

}
</ul>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>

    </>
  );
}
export default Crew_Cast;