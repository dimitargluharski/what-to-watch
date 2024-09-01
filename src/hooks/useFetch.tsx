import { useState, useEffect } from 'react';

export const useFetch = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.TMDB_API_Read_Access_Token;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, []);

  return {
    movies
  }
}