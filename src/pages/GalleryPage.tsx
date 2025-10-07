import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GalleryPage.css";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

function GalleryPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem("galleryData");
    if (cached) {
      setPokemon(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const detailed = await Promise.all(
          res.data.results.map(async (p: { name: string; url: string }) => {
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
        localStorage.setItem("galleryData", JSON.stringify(detailed));
      } catch {
        setError("API unavailable, try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered =
    filter === "all" ? pokemon : pokemon.filter((p) => p.types.some((t) => t.toLowerCase() === filter.toLowerCase()));

  if (loading) return <p className="status">Loading Gallery...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="gallery-page">
      <h1>Pokémon Gallery</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="normal">Normal</option>
        <option value="electric">Electric</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="bug">Bug</option>
        <option value="fairy">Fairy</option>
      </select>

      <div className="gallery-grid">
        {filtered.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id} className="gallery-item">
            <img src={p.sprite} alt={p.name} />
            <p>{p.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
