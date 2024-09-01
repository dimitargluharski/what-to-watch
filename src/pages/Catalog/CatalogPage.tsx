import { useFetch } from "../../hooks/useFetch"
import { InputField } from "../../components/InputField/InputField"
import { CatalogCard } from "./CatalogCard/CatalogCard";

export const CatalogPage = () => {
  const movies = useFetch();

  return (
    <>
      <div className="xl:w-full mx-auto">
        <InputField />

        <div className="flex flex-wrap py-4 mx-auto justify-center gap-1">
          {movies.movies.map((movie, index) => (
            // @TODO: Fix type error
            <CatalogCard key={index} {...movie} />
          ))}
        </div>
      </div>
    </>
  )
}