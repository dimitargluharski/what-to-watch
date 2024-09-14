import { useContext, useEffect, useState } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { InputField } from "../../components/InputField/InputField";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { GenrePill } from "../Home/GenrePill/GenrePill";
import { Pagination } from "../../components/Pagination/Pagination";

export const BrowseMoviesPage = () => {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_Read_Access_Token;

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

  return (
    <>
      <div className="xl:w-full mx-auto lg:justify-center">
        <div className="flex py-4 items-center w-full justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <InputField />
          <Dropdown />
        </div>

        <div>
          {selectedGenres.length
            ? (<div className="p-2 bg-blue-500 text-white rounded" onClick={clearFilters}>Clear Filters</div>)
            : null
          }
        </div>

        <div className="w-full p-2">
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

          <div className="flex flex-wrap py-4 justify-center gap-1 mx-auto max-w-7xl">
            {movies.map((m, index) => (
              <CatalogCard {...m} key={index} />
            ))}
          </div>
        </div>
        <Pagination totalPagesCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </>
  )
}