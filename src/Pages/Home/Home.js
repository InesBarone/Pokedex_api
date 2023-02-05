import React from "react";
import Pokecard from "../../Components/Pokecard/Pokecard";
import "./Home.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

export default function Principal({
  pokeData,
  setPokeData,
  loading,
  setLoading,
  setLimit,
  getPokemones,
}) {
  // Este estado se corresponde con el texto ingresado en la barra de busqueda
  const [text, setText] = useState("");

  //order se refiere a un estado que alternará entre true y false para cambiar
  //el boton de orden segun id o segun abecedario
  const [order, setOrder] = useState(false);

  //arrows es un vector que contiene la ruta a las imágenes de flechas, la primera
  //hacia abajo, y la segunda hacia arriba
  let arrows = ["/Images/Arrow.svg", "/Images/Vector.png"];

  //imgArrows es un estado que alternará entre los dos valoresde arrows, y se mostrará
  //su valor en el botón de la flecha
  const [imgArrow, setImgArrow] = useState(arrows[0]);
  const [loadingMore, setLoadingMore] = useState(false);

  let regex = new RegExp(text, "gi");
  let filtered = pokeData.filter(function (pokemon) {
    return pokemon.name.match(regex);
  });

  //manejarInput es el responsable de que text tenga el valor del valor ingresado en el input
  function manejarInput(e) {
    setText(e.target.value);
  }

  //manejarSortId se encarga de ordenar segun el ID, y al hacerle click, imgArrow es igual al valor inicial (flecha abajo)
  function manageSortId(e) {
    setOrder(false);
    setPokeData((previousState) => {
      let array = [...previousState];
      return array.sort((a, b) => a.number - b.number);
    });
    setImgArrow(arrows[0]);
  }

  //manejarSortId se encarga de ordenar segun el abecedario, y al hacerle click, imgArrow es igual al valor inicial (flecha abajo)
  function manageSortName(e) {
    setOrder(true);
    setPokeData((previousState) => {
      let array = [...previousState];
      function sortAlfabeto(x, y) {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      }
      return array.sort(sortAlfabeto);
    });
    setImgArrow(arrows[0]);
  }

  //reversePokeInfo se encarga de invertir el orden de los pokemones y que imgArrow alterne su valor
  function reversePokeInfo() {
    setPokeData((previousState) => {
      let array = [...previousState];
      return array.reverse();
    });
    if (imgArrow == arrows[0]) {
      setImgArrow(arrows[1]);
    } else {
      setImgArrow(arrows[0]);
    }
  }

  async function handleMore(e) {
    setLimit((prev) => {
      return prev + 15;
    });
    setLoadingMore(true);
    await getPokemones();
    setLoadingMore(false);
  }

  return (
    <div>
      <header>
        <div className="header-1">
          <Link to="/">
            <img src="/Images/arrow-left.svg" alt="Logo pokebola" />
          </Link>
          <div className="logo-title">
            <img
              src="/Images/Pokeball.png"
              className="logo"
              alt="Logo pokebola"
            />
            <h1>Pokédex</h1>
          </div>
          {order ? (
            <div className="arrow-button-container">
              <button className="arrow-button" onClick={manageSortId}>
                <div>
                  <p style={{ fontSize: "10px", marginRight: "3px" }}>A</p>
                  <p style={{ fontSize: "10px", marginRight: "3px" }}>Z</p>
                </div>
              </button>
              <button className="arrow-button" onClick={reversePokeInfo}>
                <img src={imgArrow} alt="arrow-button" className="arrow" />
              </button>
            </div>
          ) : (
            <div className="arrow-button-container">
              <button className="arrow-button" onClick={manageSortName}>
                <p>#</p>
              </button>
              <button className="arrow-button" onClick={reversePokeInfo}>
                <img src={imgArrow} alt="arrow-button" className="arrow" />
              </button>
            </div>
          )}
        </div>
        <input
          type="search"
          placeholder="🔎 Buscar"
          className="search-bar"
          onChange={manejarInput}
        />
      </header>
      <div className="Principal-container">
        <main>
          {loading ? (
            <>
              <ClipLoader
                color={"rgb(73 73 73)"}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          ) : (
            <div className="pokecard-container">
              {filtered.length > 0 ? (
                <>
                  {filtered.map((pokemon) => {
                    return <Pokecard pokemon={pokemon} />;
                  })}
                </>
              ) : (
                <>No pokemones found</>
              )}
            </div>
          )}
          <div className="more-container">
            {loadingMore ? (
              <>
                <ClipLoader
                  color={"rgb(73 73 73)"}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <>
                <button
                  className="more"
                  onClick={(e) => {
                    handleMore(e);
                  }}
                >
                  MÁS POKEMONES
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
