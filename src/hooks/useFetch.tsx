import { useState, useEffect } from 'react';

type FetchProps = {
  movieId?: string;
};

export const useFetch = ({ movieId }: FetchProps = {}) => {
  // @TODO: Removes any type
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_TMDB_API_Read_Access_Token;

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is missing or invalid.');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const url = movieId
        ? `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
        : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(movieId ? [data] : data.results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, apiKey]);

  return {
    movies,
    isLoading,
    error,
  };
};
