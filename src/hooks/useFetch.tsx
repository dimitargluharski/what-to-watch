import { useState, useEffect } from 'react';

type FetchProps = {
  movieId?: string;
};

export const useFetch = ({ movieId }: FetchProps = {}) => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_Read_Access_Token; // Ensure it matches your .env setup

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is missing or invalid.');
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    console.log('movie id', movieId);

    const url = movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
      : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (movieId) {
          setMovies([response]); // Wrap in array to maintain state consistency
        } else {
          setMovies(response.results);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [movieId, apiKey]);

  return {
    movies,
  };
};
