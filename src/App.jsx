import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Spin } from "antd";
import Logo from "./component/Logo";
import PokemonCard from "./component/PokemonCard";
import GenerationButton from "./component/GenerationButton";
import Navbar from "./component/Navbar";
import "./App.css";

function App() {
  const [arrayPokemons, setArrayPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(1); // State to store selected generation
  const [buttonLoading, setButtonLoading] = useState(false); // State to store loading state for buttons
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  useEffect(() => {
    async function getPokemon() {
      try {
        let url = "https://pokeapi.co/api/v2/pokemon?limit=151";
        // Define variables for each generation's range of Pokemon IDs
        const genRanges = {
          1: { start: 1, end: 151 },
          2: { start: 152, end: 251 },
          3: { start: 252, end: 386 },
          4: { start: 387, end: 493 },
          5: { start: 494, end: 649 },
          6: { start: 650, end: 721 },
          7: { start: 722, end: 809 },
          8: { start: 810, end: 905 },
        };
        // Adjust the API URL based on the selected generation
        if (generation) {
          const { start, end } = genRanges[generation];
          url = `https://pokeapi.co/api/v2/pokemon?limit=${
            end - start + 1
          }&offset=${start - 1}`;
        }
        const response = await axios.get(url);
        const pokemonList = response.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              id: detailsResponse.data.id,
              name: pokemon.name,
              imageUrl:
                detailsResponse.data.sprites.other["official-artwork"]
                  .front_default,
              hp: detailsResponse.data.stats[0].base_stat,
              attack: detailsResponse.data.stats[1].base_stat,
              defense: detailsResponse.data.stats[2].base_stat,
              type: detailsResponse.data.types[0].type.name,
            };
          })
        );
        setArrayPokemons(pokemonWithDetails);
        setLoading(false); // Set loading to false after data is fetched
        setButtonLoading(false); // Set button loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (generation !== null) {
      setLoading(true); // Set loading to true before fetching data
      setButtonLoading(true); // Set button loading to true before fetching data
      getPokemon();
    }
  }, [generation]); // Fetch data when generation changes

  // Filter all pokemon regardless of generation based on search term
  const filteredPokemonList = arrayPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
      />
      <Logo />
      <div className="input-box">
        <Input
          style={{ width: 250 }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search here"
        />
      </div>
      <div className="button-gen">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((gen) => (
          <GenerationButton
            key={gen}
            generation={gen}
            setGeneration={setGeneration}
            buttonLoading={buttonLoading && generation === gen}
          />
        ))}
      </div>
      <div className="pokemon-list">
        {loading ? (
          <Spin size="large" />
        ) : (
          filteredPokemonList.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
