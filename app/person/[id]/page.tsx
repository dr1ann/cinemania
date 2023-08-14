//External Libraries
import dynamic from 'next/dynamic'

import Info from './info'
import PopularMovies from './PopularMovies'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
const page = ({ params }: { params: { id: number } }) => {
  return (
    <>
      < Header />
   < Info id={params.id} />
   < PopularMovies id={params.id} />
   < Footer />

   </>
  )
}
export default page