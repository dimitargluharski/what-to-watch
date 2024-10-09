import { useEffect, useState } from "react";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { MultiSelect } from "react-multi-select-component";
import { SearchInputField } from "../../components/SearchInputField/SearchInputField";
import { Button } from "../../components/Button/Button";

export const Catalog = () => {
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_Read_Access_Token;

  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const clearFilters = () => {
    setSelectedGenres([]);
    setMovies([]);
    setSearchQuery("");
  };

  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc&with_genres=${selectedGenres.join(",")}`,
        options
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => setAllGenres(response.genres))
      .catch((err) => console.error("Error fetching genres:", err));

    fetchMovies(currentPage);
  }, [selectedGenres]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight &&
      !isLoading &&
      currentPage < totalPages
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies(currentPage);
    }
  }, [currentPage]);

  const genreOptions = allGenres.map((g) => ({
    label: g.name,
    value: g.id,
  }));

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOnChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="xl:w-full mx-auto lg:justify-center">
        <div className="flex flex-col py-4 w-full xl:mx-auto xl:max-w-7xl px-2 sm:px-4 lg:px-8">
          <SearchInputField searchQuery={searchQuery} onChange={handleOnChange} />

          <MultiSelect
            className="w-full py-5"
            options={genreOptions}
            value={genreOptions.filter((option) =>
              selectedGenres.includes(option.value)
            )}
            onChange={(selected) =>
              setSelectedGenres(selected.map((option) => parseInt(option.value)))
            }
            labelledBy="Select filter"
          />

          {selectedGenres.length ? (
            <Button
              className="p-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>

        {isLoading && <p>Loading...</p>}
        <div className="flex flex-wrap py-4 justify-center gap-1 mx-auto max-w-7xl">
          {filteredMovies.map((m, index) => (
            <CatalogCard {...m} key={index} />
          ))}
        </div>

      </div>
    </>
  );
};
