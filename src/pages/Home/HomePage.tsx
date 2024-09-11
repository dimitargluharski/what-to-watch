import { useState, useEffect } from 'react';
import { InputField } from "../../components/InputField/InputField";
import { GenrePill } from "./GenrePill/GenrePill";
import { CatalogCard } from '../Catalog/CatalogCard/CatalogCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const HomePage = () => {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_Read_Access_Token;

  const { theme, handleToggleThemes } = useContext(ThemeContext);

  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchMovies = (page: number) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc&with_genres=${selectedGenres.join(',')}`, options)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((err) => console.error(err));
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

    fetchMovies(currentPage);
  }, [selectedGenres, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log('theme', theme);

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-300'}`}>
      <button onClick={handleToggleThemes}>Change theme!</button>
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

      <div className='flex items-center bg-red-500'>
        <div className='mr-3 text-3xl'>
          Picked: {selectedGenres.length} {`${selectedGenres.length === 1 ? 'filter' : 'filters'}`}
        </div>

        <div>
          {selectedGenres.length
            ? (<div className="p-2 bg-blue-500 text-white rounded" onClick={clearFilters}>Clear Filters</div>)
            : null
          }
        </div>

      </div>

      {movies.map((m, index) => (
        <CatalogCard {...m} key={index} />
      ))}

      {/* Pagination Component */}
      <Pagination totalPagesCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};
