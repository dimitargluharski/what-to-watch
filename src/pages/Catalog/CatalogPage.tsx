import { useFetch } from "../../hooks/useFetch"
import { InputField } from "../../components/InputField/InputField"

export const CatalogPage = () => {
  const movies = useFetch();

  console.log('movies', movies);
  return (
    <>
      Catalog Page
      <div className="mx-auto max-w-[500px] bg-slate-600">
        <InputField />

      </div>
    </>
  )
}