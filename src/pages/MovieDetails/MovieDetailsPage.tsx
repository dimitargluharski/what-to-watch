import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { FaClock, FaRegCalendarAlt, FaStar } from 'react-icons/fa';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movies } = useFetch({ movieId });

  return (
    <>
      <Breadcrumbs />

      {movies.length > 0 ? (
        movies.map((movie) => (
          <div className=" bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-wrap py-4 justify-center gap-1 mx-auto max-w-7xl">
            <div className="md:flex p-4">
              <div className="md:flex-shrink-0 px-2">
                <img
                  className="h-full w-full object-cover md:w-72"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              </div>

              <div className='px-2'>
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="mt-1 text-gray-600 italic">{movie.tagline}</p>
                <div className="flex items-center mt-2">
                  <FaRegCalendarAlt className="text-gray-500 mr-2" />
                  <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaClock className="text-gray-500 mr-2" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500 mr-2" />
                  <span>{movie.vote_average} / 10</span>
                </div>
                <p className="mt-4">{movie.overview}</p>
                <div className="mt-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 rounded-full mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
