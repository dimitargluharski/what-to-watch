import { useFetch } from "../../hooks/useFetch"
import { InputField } from "../../components/InputField/InputField"
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { Dropdown } from "../../components/Dropdown/Dropdown";

export const CatalogPage = () => {
  const {movies} = useFetch();

  console.log('movies', movies);

  return (
    <>
      <div className="xl:w-full mx-auto lg:justify-center">
        <div className="flex py-4 items-center w-full justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <InputField />
          <Dropdown />
        </div>

        <div className="flex flex-wrap py-4 justify-center gap-1 mx-auto max-w-7xl">
          {movies.map((movie, index) => (
            // @TODO: Fix type error
            <CatalogCard key={index} {...movie} />
          ))}
        </div>
      </div>
    </>
  )
}