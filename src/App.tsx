import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokédex</h1>
      </header>

      <nav className="App-nav">
        <Link to="/">List</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>

      <main className="App-main">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
