import { useState } from "react";
import Type from "./Type";
import { Card, Tag, Button } from "antd";
import PokemonModal from "./PokemonModal";
import "./PokemonCard.css";
import "./Type.css";

const PokemonCard = ({ pokemon }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        className="pokemon-card"
        style={{ width: 300, margin: 10, position: "relative" }} // Added position: "relative"
        onClick={showModal}
      >
        <div>
          <div
            className="card-header"
            style={{
              position: "relative",
            }}
          >
            <div style={{ display: "flex" }}>
              <Tag>#{pokemon.id.toString().padStart(3, "0")}</Tag>
              <div className="PokemonName">{pokemon.name}</div>
            </div>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <Type pokemon={pokemon} />
            </div>
          </div>
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ maxWidth: "100%" }}
          />
        </div>
      </Card>
      <PokemonModal
        visible={isModalVisible}
        onCancel={handleCancel}
        pokemon={pokemon}
      />
    </div>
  );
};

export default PokemonCard;
