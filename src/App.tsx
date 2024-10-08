import { Route, Routes } from "react-router-dom"
import { MovieDetailsPage } from "./pages/MovieDetails/MovieDetailsPage"
import { Catalog } from "./pages/BrowseMovies/BrowseMoviesPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/movie-details/:movieId" element={<MovieDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
