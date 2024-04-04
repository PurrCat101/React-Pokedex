import { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Input, Button, message, Card, Select } from "antd";
import Navbar from "../component/Navbar";
import "./Game.css";

const { Option } = Select;

const pokemonGen = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
};

const Game = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("game");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [selectedGenerations, setSelectedGenerations] = useState(
    Object.keys(pokemonGen)
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    const storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore) {
      setHighestScore(parseInt(storedHighestScore));
    }
  }, []);

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      let validRange = [];
      selectedGenerations.forEach((gen) => {
        const { start, end } = pokemonGen[gen];
        for (let i = start; i <= end; i++) {
          validRange.push(i);
        }
      });
      const randomId =
        validRange[Math.floor(Math.random() * validRange.length)];
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    fetchRandomPokemon();
    setScore(0);
    setRemainingAttempts(10);
  };

  const handleRandomClick = () => {
    if (remainingAttempts > 0) {
      fetchRandomPokemon();
      setGuess("");
      setRemainingAttempts(remainingAttempts - 1);
    }
  };

  const handleGuessSubmit = () => {
    if (!pokemonData) return;

    if (guess.toLowerCase() === pokemonData.name.toLowerCase()) {
      message.success("Correct");
      setScore(score + 1);
    } else {
      message.error("Incorrect");
    }
    if (remainingAttempts > 0) {
      handleRandomClick();
    }
  };

  const handleGenerationChange = (value) => {
    setSelectedGenerations(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGuessSubmit();
    }
  };

  useEffect(() => {
    if (remainingAttempts === 0) {
      setGameStarted(false);
      if (score > highestScore) {
        setHighestScore(score);
        localStorage.setItem("highestScore", score);
      }
    }
  }, [remainingAttempts, score, highestScore]);

  const handleNewGame = () => {
    setGameStarted(false);
    setScore(0);
    setRemainingAttempts(10);
  };

  return (
    <>
      <Navbar
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!gameStarted ? (
          <>
            <h2 className="game-title">Guess Pokémon Game</h2>
            <Select
              mode="multiple"
              style={{ width: "300px", marginBottom: "1rem" }}
              placeholder="Select Pokémon Generations"
              onChange={handleGenerationChange}
              value={selectedGenerations}
            >
              {Object.keys(pokemonGen).map((gen) => (
                <Option key={gen}>{`Gen ${gen}`}</Option>
              ))}
            </Select>
            <p className="score-text">Highest Score: {highestScore}</p>
            <Button onClick={startGame} style={{ marginBottom: "1rem" }}>
              Start Game
            </Button>
          </>
        ) : (
          <>
            <h2 className="game-title">Guess Pokémon Game</h2>
            <Select
              mode="multiple"
              style={{ width: "300px", marginBottom: "1rem" }}
              placeholder="Select Pokémon Generations"
              onChange={handleGenerationChange}
              value={selectedGenerations}
              disabled
            >
              {Object.keys(pokemonGen).map((gen) => (
                <Option key={gen}>{`Gen ${gen}`}</Option>
              ))}
            </Select>
            <p className="score-text">Highest Score: {highestScore}</p>
            <p className="score-text">Score: {score}</p>
            <Spin spinning={loading}>
              <Card
                className=""
                style={{ width: 300, margin: 10 }}
                bodyStyle={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {pokemonData ? (
                  <div>
                    <img
                      src={
                        pokemonData.sprites.other["official-artwork"]
                          .front_default
                      }
                      alt={pokemonData.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                <Input
                  placeholder="Enter your guess"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={handleKeyDown} // Handle submit on Enter key press
                  style={{ width: "80%", marginBottom: "10px" }}
                />
                <Button
                  onClick={handleGuessSubmit}
                  type="primary"
                  style={{ width: "80%" }}
                >
                  Submit Guess
                </Button>
              </Card>
            </Spin>
            <p className="remaining-attempts">
              Remaining Attempts: {remainingAttempts}
            </p>
            <Button onClick={handleNewGame} style={{ marginTop: "1rem" }}>
              New Game
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Game;
