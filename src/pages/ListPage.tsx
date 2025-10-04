import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

function ListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => setPokemonList(res.data.results));
  }, []);

  const filtered = pokemonList
    .filter((p) => p.name.includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div>
      <h1>Pokédex List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // controlled input
      />
      <button onClick={() => setSortOrder("asc")}>A–Z</button>
      <button onClick={() => setSortOrder("desc")}>Z–A</button>
      <ul>
        {filtered.map((p, i) => (
          <li key={i}>
            <Link to={`/pokemon/${i + 1}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
