import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => setPokemon(res.data));
    }
  }, [id]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h1>{pokemon.name} (#{pokemon.id})</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Types:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>

      <button onClick={() => navigate(`/pokemon/${+id! - 1}`)} disabled={+id! <= 1}>
        Previous
      </button>
      <button onClick={() => navigate(`/pokemon/${+id! + 1}`)}>
        Next
      </button>
    </div>
  );
}

export default DetailPage;
