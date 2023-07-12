import { useRouter } from 'next/router';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Retrieve the specific movie details using the 'id' parameter

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
      {/* Display the fetched movie details */}
    </div>
  );
};

export default MovieDetails;
