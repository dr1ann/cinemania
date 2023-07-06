import Image from 'next/image'
import icon from './Images/icon.png'
import homebg from './Images/test.jpg'
export default function Home() {
  return (
 <div>
<div className='h-screen homepage w-screen flex flex-col justify-center items-center  object-cover bg-black'>

  <Image
  className='object-cover'
  src={icon}


  alt='ICON'
  
  />


</div>
 </div>
  )
}
