import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

function GalleryPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
      const detailed = await Promise.all(
        res.data.results.map(async (p: { name: string; url: string }, index: number) => {
          const pokeData = await axios.get(p.url);
          return {
            id: pokeData.data.id,
            name: p.name,
            sprite: pokeData.data.sprites.front_default,
            types: pokeData.data.types.map((t: any) => t.type.name),
          };
        })
      );
      setPokemon(detailed);
    };
    fetchData();
  }, []);

  const filtered =
    filter === "all" ? pokemon : pokemon.filter((p) => p.types.includes(filter));

  return (
    <div>
      <h1>Pokémon Gallery</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {filtered.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <img src={p.sprite} alt={p.name} />
            <p>{p.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
