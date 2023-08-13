export async function generateStaticParams() {
    const posts = ['one, two']
   
    return posts.map((post) => ({
      slug: post,
    }))
  }


  

 
 export default function page() {
   return (
     <div>page</div>
   )
 }
 
  
