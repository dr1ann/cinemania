import Image from 'next/image'
import doublechevron from './Images/doublechevron.png'
import todayicon from './Images/todayicon.png'
import calendaricon from './Images/calendaricon.png'
import stickyicon from './Images/stickyicon.png'
export default function Home() {
  return (
  <div className=' ml-4 float-left h-screen p-10 rounded-xl bg-gray-300'>
    <h2 className='font-bold mb-10 text-center text-2xl'>Menu</h2>
 <div className='flex flex-col justify-center items-center gap-8'>
  <p className='mr-auto'>Tasks</p>
  <a href='/' className='flex flex-row items-center justify-center gap-4' >

    
    <Image 
    className='h-[1.5rem] w-[1.5rem] object-contain'
    src={doublechevron}
    alt='UPCOMING icon'

    />

 <p className='w-[6.5rem]' >Upcoming</p>


<span className='text-[0.813rem] rounded-full w-[2rem] text-center bg-gray-400 px-2 py-1'>21</span>

</a>
  
<a href='/' className='flex flex-row items-center justify-center gap-4' >

    
<Image 
className='h-[1.5rem] w-[1.5rem] object-contain'
src={todayicon}
alt='UPCOMING icon'

/>

<p className='w-[6.5rem]'>Today</p>


<span className='text-[0.813rem] rounded-full w-[2rem] text-center bg-gray-400 px-2 py-1'>21</span>

</a>
<a href='/' className='flex flex-row items-center justify-center gap-4' >

    
<Image 
className='h-[1.5rem] w-[1.5rem] object-contain'
src={calendaricon}
alt='UPCOMING icon'

/>

<p className='w-[6.5rem]'>Calendar</p>


<span className='text-[0.813rem] rounded-full w-[2rem] text-center bg-gray-400 px-2 py-1 '>21</span>

</a>

<a href='/' className='flex flex-row items-center justify-center gap-4' >

    
<Image 
className='h-[1.7rem] w-[1.7rem] object-contain'
src={stickyicon}
alt='UPCOMING icon'

/>

<p className='w-[6.5rem]'>Sticky Wall</p>


<span className='text-[0.813rem] rounded-full w-[2rem] text-center bg-gray-400 px-2 py-1 '>1</span>

</a>
 </div>
  </div>
  )
}
