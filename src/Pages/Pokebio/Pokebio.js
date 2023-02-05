import { Link, useParams } from "react-router-dom";
import Pokestats from "../../Components/Pokestats/Pokestats";
import "./Pokebio.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function Pokebio({ pokeData, setPokeData, loading }) {
  const params = useParams;
  const pokeName = params().name;
  const info = pokeData.filter((pokemon) => pokemon.name === pokeName);
  console.log(info);

  let index = pokeData.indexOf(info[0]);
  const changePokemonLeft = () => {
    if (index === 0) {
      return `${pokeData[pokeData.length - 1].name}`;
    } else {
      return `${pokeData[index - 1].name}`;
    }
  };

  const changePokemonRight = () => {
    if (index === pokeData.length - 1) {
      return `${pokeData[0].name}`;
    } else {
      return `${pokeData[index + 1].name}`;
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="Pokebio-container">
            <ClipLoader
              color={"rgb(73 73 73)"}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <div className="Pokebio-container">
          <div className="pokebio-header">
            <div className="arrow-name">
              <Link to="/pokemones">
                <img
                  src="./Images/arrow-left-w.svg"
                  className="arrow-left"
                  alt="Arrow left"
                />
              </Link>
              <h2 className="name-pokemon">{info[0].name}</h2>
            </div>
            <div className="id">{info[0].id}</div>
          </div>
          <img src="./Images/Pokeball (1).png" className="img-pokebola" />
          <div className="pokePhoto-container">
            <Link to={`/pokemon/${changePokemonLeft()}`}>
              <button className="arrow-button2">{"<"}</button>
            </Link>
            <img
              src={info[0].img}
              alt="Pokemon picture"
              className="pokePhoto"
            />
            <Link to={`/pokemon/${changePokemonRight()}`}>
              <button className="arrow-button2">{">"}</button>
            </Link>
          </div>
          <Pokestats info={[info[0]]} pokeData={pokeData} />
        </div>
      )}
    </div>
  );
}
