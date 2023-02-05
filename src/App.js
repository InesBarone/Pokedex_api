import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Pokebio from "./Pages/Pokebio/Pokebio";
import { useEffect, useState } from "react";
import Welcome from "./Pages/Welcome/Welcome";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(15);

  async function getPokemones() {
    const fetchPokemones = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`
    );
    const response = await fetchPokemones.json();
    await getPokemon(response.results);
    setLoading(false);
  }

  async function getPokemon(pokemonesList) {
    let list = [];
    for (let i = 0; i < pokemonesList.length; i++) {
      let fetchPokemon = await fetch(pokemonesList[i].url);
      let responsePokemon = await fetchPokemon.json();

      let fetchColor = await fetch(responsePokemon["species"]["url"]);
      let responseColor = await fetchColor.json();

      let name = responsePokemon["name"];
      let moves = responsePokemon["moves"][0].move.name;
      let j = 0;
      while (
        j < responseColor["flavor_text_entries"].length &&
        responseColor["flavor_text_entries"][j]["language"]["name"] != "en"
      ) {
        j++;
      }
      let description = responseColor["flavor_text_entries"][j]["flavor_text"];
      let stats = [];
      let stat;

      name = name[0].toUpperCase() + name.substring(1);
      moves = moves[0].toUpperCase() + moves.substring(1);
      description = description.replace("\f", " ");

      responsePokemon.stats.forEach((element) => {
        let stat_name = element.stat.name;
        // stat_name = stat_name[0].toUpperCase() + stat_name.substring(1);
        stat_name = stat_name.toUpperCase();
        stat = {
          stat_value: element.base_stat,
          stat_name: stat_name,
        };
        stats.push(stat);
      });

      let pokemon = {
        id: "",
        number: responsePokemon.id,
        name: name,
        img: responsePokemon["sprites"]["other"]["official-artwork"][
          "front_default"
        ],
        color: responseColor["color"]["name"],
        type: responsePokemon.types,
        weight: responsePokemon.weight,
        height: responsePokemon.height,
        moves: moves,
        description: description,
        stats: stats,
      };
      switch (pokemon.number.toString().length) {
        case 1:
          pokemon.id = "#000" + responsePokemon.id;
          break;
        case 2:
          pokemon.id = "#00" + responsePokemon.id;
          break;
        case 3:
          pokemon.id = "#0" + responsePokemon.id;
          break;
        case 4:
          pokemon.id = "#" + responsePokemon.id;
          break;
      }
      list.push(pokemon);
    }
    setPokeData(list);
    console.log(pokeData);
  }

  useEffect(() => {
    getPokemones();
  }, [loading, limit]);

  return (
    <div className="App">
      <BrowserRouter basename="/Pokedex_api">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/pokemones"
            element={
              <Home
                setPokeData={setPokeData}
                pokeData={pokeData}
                loading={loading}
                setLoading={setLoading}
                setLimit={setLimit}
                getPokemones={getPokemones}
              />
            }
          />
          <Route
            path="/pokemon/:name"
            element={
              <Pokebio
                pokeData={pokeData}
                setPokeData={setPokeData}
                loading={loading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
