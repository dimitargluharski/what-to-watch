import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home/HomePage"
import { CatalogPage } from "./pages/Catalog/CatalogPage"
import { Navbar } from "./components/Navbar/Navbar"
import { MovieDetailsPage } from "./pages/MovieDetails/MovieDetailsPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/movie-details/:movieId" element={<MovieDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
