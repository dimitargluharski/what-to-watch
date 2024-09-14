import { useEffect, useState } from "react";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { MultiSelect } from "react-multi-select-component";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const BrowseMoviesPage = () => {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_Read_Access_Token;

  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const clearFilters = () => {
    setSelectedGenres([]);
    setMovies([]);
    setSearchQuery("");
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
      .catch((err) => console.error('Error fetching movies:', err));
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
      .catch((err) => console.error('Error fetching genres:', err));
    
    fetchMovies(currentPage);
  }, [selectedGenres, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const genreOptions = allGenres.map((g) => ({
    label: g.name,
    value: g.id
  }));

  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="xl:w-full mx-auto lg:justify-center">
        <div className="flex py-4 items-center w-full xl:mx-auto xl:max-w-7xl px-2 sm:px-4 lg:px-8">
          {/* Search */}
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <MultiSelect
            className="w-96"
            options={genreOptions}
            value={genreOptions.filter((option) => selectedGenres.includes(option.value))}
            onChange={(selected) => setSelectedGenres(selected.map((option) => parseInt(option.value)))}
            labelledBy="Select genre/s"
          />

          {selectedGenres.length ? (
            <div className="p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={clearFilters}>
              Clear Filters
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap py-4 justify-center gap-1 mx-auto max-w-7xl">
          {filteredMovies.map((m, index) => (
            <CatalogCard {...m} key={index} />
          ))}
        </div>

        <Pagination totalPagesCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </>
  );
};
