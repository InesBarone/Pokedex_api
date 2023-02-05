import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="wallpaper"></div>
      <Link to="/pokemones">
        <button className="more go-button">
          IR A LA POKEDEX
          <img src="./Images/arrow-right-w.svg" className="arrow-right" />
        </button>
      </Link>
      <div className="wallpaper-logo-container">
        <img className="wallpaper-logo" src="./Images/pngegg.png" />
      </div>
    </div>
  );
}
