import { useEffect, useState } from "react";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { MultiSelect } from "react-multi-select-component";
import { SearchInputField } from "../../components/SearchInputField/SearchInputField";
import { Button } from "../../components/Button/Button";

export const Catalog = () => {
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
        console.log('all moveis', response);
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

  const handleOnChange = (e: any) => {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <div className="xl:w-full mx-auto lg:justify-center">
        <div className="flex flex-col py-4 w-full xl:mx-auto xl:max-w-7xl px-2 sm:px-4 lg:px-8">
          <SearchInputField searchQuery={searchQuery} onChange={handleOnChange} />

          <MultiSelect
            className="w-full py-5"
            options={genreOptions}
            value={genreOptions.filter((option) => selectedGenres.includes(option.value))}
            onChange={(selected) => setSelectedGenres(selected.map((option) => parseInt(option.value)))}
            labelledBy="Select filter"
          />

          {
            selectedGenres.length
              ? (<Button className="p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={clearFilters}>
                Clear Filters
              </Button>)
              : null
          }
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
