import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home/HomePage"
import { CatalogPage } from "./pages/Catalog/CatalogPage"
import { Navbar } from "./components/Navbar/Navbar"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
    </>
  )
}

export default App
