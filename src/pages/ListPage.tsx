import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListPage.css";

interface Pokemon {
  name: string;
  url: string;
}

function ListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "id">("name");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => setPokemonList(res.data.results))
      .catch((err) => console.error("Error fetching Pokémon:", err));
  }, []);

  const getId = (url: string) => Number(url.split("/").filter(Boolean).pop());

  const filtered = pokemonList
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } 
      else {
        const idA = getId(a.url);
        const idB = getId(b.url);
        return sortOrder === "asc" ? idA - idB : idB - idA;
      }
    });

  return (
    <div className="list-page">
      <h2>Pokémon List</h2>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="sort-section">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "id")}
          >
            <option value="name">Name</option>
            <option value="id">Pokémon Number (ID)</option>
          </select>

          <button onClick={() => setSortOrder("asc")}>Ascending</button>
          <button onClick={() => setSortOrder("desc")}>Descending</button>
        </div>
      </div>

      <ul className="pokemon-list">
        {filtered.map((p) => {
          const id = getId(p.url);
          return (
            <li key={p.name}>
              <Link to={`/pokemon/${id}`}>
                {p.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListPage;
