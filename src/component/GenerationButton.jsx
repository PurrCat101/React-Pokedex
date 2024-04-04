import { Button } from "antd";

function GenerationButton({ generation, setGeneration, buttonLoading }) {
  return (
    <Button
      onClick={() => {
        setGeneration(generation);
      }}
      loading={buttonLoading}
    >
      Gen {generation}
    </Button>
  );
}

export default GenerationButton;
