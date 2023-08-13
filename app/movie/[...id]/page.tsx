
//Client Components
import Overview from './overview'
import Crew_Cast from './Crew_Cast'
import Collection from './Collection'
import Media from './Media'
import Similar from './Similar'
import Suggested from './Suggested'
import Footer from '@/app/components/Footer'

const page = ({ params }: { params: { id: number } }) => {
  return (
    <>
   <Overview id={params.id} />
    <Crew_Cast id={params.id} />
    <Collection id={params.id} />
    <Media id={params.id}/>
    <Similar id={params.id} />
    <Suggested id={params.id} />
    <Footer />
    </>
  )
}

export default page
