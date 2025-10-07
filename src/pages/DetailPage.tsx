import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailPage.css";

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .catch(() => setError("Unable to load Pokémon details."))
      .finally(() => setLoading(false));
    }
  })

  if (loading) return <p className="status">Loading Pokémon...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="detail-page">
      <h1>{pokemon.name} (#{pokemon.id})</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>

      <p>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </p>

      <div className="nav-buttons">
        <button onClick={() => navigate(`/pokemon/${+id! - 1}`)} disabled={+id! <= 1}>Previous</button>
        <button onClick={() => navigate(`/pokemon/${+id! + 1}`)}>Next</button>
      </div>
    </div>
  );
}

export default DetailPage;
