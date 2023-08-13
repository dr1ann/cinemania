'use client'

//Client Components
import Overview from './overview'
import Crew_Cast from './Crew_Cast'
import Collection from './Collection'
import Media from './Media'
import Similar from './Similar'
import Suggested from './Suggested'
import Footer from '../../components/Footer'

const page = ({ params }: { params: { id: number } }) => {

  console.log(params.id)
  return (
    <>
 
    <Collection params={{ id: Number(params.id) }} />
   
    <Footer />
    </>
  )
}

export default page
