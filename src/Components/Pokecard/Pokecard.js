import React from "react";
import { Pokeinfo } from "../Pokeinfo/Pokeinfo";
import "./Pokecard.css";
import { Link } from "react-router-dom";

export default function Pokecard({ pokemon }) {
  return (
    <div className="card" key={pokemon.id}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <div className="id-card">{pokemon.id}</div>
        <div className="img-card-container">
          <img src={pokemon.img} className="img-card" alt="pokemon-photo" />
        </div>
        <div className="name-card">{pokemon.name}</div>
      </Link>
    </div>
  );
}
