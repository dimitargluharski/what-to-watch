import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home/HomePage"
import { Navbar } from "./components/Navbar/Navbar"
import { MovieDetailsPage } from "./pages/MovieDetails/MovieDetailsPage"
import { BrowseMoviesPage } from "./pages/BrowseMovies/BrowseMoviesPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<BrowseMoviesPage />} />
        <Route path="/movie-details/:movieId" element={<MovieDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
