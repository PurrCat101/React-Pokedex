import "./Type.css";

function Type({ pokemon }) {
  return (
    <p style={{ margin: 0, fontSize: 16 }}>
      <div className={`icon ${pokemon.type}`} alt={pokemon.type} />
    </p>
  );
}

export default Type;
