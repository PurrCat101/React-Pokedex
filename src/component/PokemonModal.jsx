import { Modal, Button, Tag } from "antd";

const PokemonModal = ({ visible, onCancel, pokemon }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Tag>#{pokemon.id.toString().padStart(3, "0")}</Tag>
      <span className="PokemonName">{pokemon.name}</span>
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ maxWidth: "100%", marginBottom: 16 }}
      />
      <p style={{ margin: 0, fontSize: 16 }}>
        <strong>HP:</strong> {pokemon.hp}
      </p>
      <p style={{ margin: 0, fontSize: 16 }}>
        <strong>Attack:</strong> {pokemon.attack}
      </p>
      <p style={{ margin: 0, fontSize: 16 }}>
        <strong>Defense:</strong> {pokemon.defense}
      </p>
      <p style={{ margin: 0, fontSize: 16 }}>
        <strong>Type:</strong> {pokemon.type}
      </p>
    </Modal>
  );
};

export default PokemonModal;
