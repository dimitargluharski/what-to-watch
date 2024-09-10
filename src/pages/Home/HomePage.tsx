import { useState, useEffect } from 'react';
import { InputField } from "../../components/InputField/InputField";
import { GenrePill } from "./GenrePill/GenrePill";
import { CatalogCard } from '../Catalog/CatalogCard/CatalogCard';

export const HomePage = () => {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_Read_Access_Token;

  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState([]);

  const handleSelectedFilter = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setMovies([]);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((response) => setAllGenres(response.genres))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc&with_genres=${selectedGenres}`, options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
      })
      .catch(err => console.error(err));
  }, [selectedGenres]);

  return (
    <div>
      <div className="w-full">
        <InputField />
      </div>

      <div className="w-full p-2 bg-red-500">
        {allGenres && allGenres.length > 0 ? (
          allGenres.map((genre) => (
            <GenrePill
              key={genre.id}
              genre={genre.name}
              handleSelectedFilter={() => handleSelectedFilter(genre.id)}
              isSelected={selectedGenres.includes(genre.id)}
            />
          ))
        ) : (
          <p>Loading genres...</p>
        )}
      </div>

      <div className='flex p-4'>
        filters: {selectedGenres.length}

        <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {movies.map((m, index) => (
        <CatalogCard {...m} key={index} />
      ))}
    </div>
  );
};