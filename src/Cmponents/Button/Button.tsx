import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function MyButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/products")} colorScheme="teal" size="lg">
      Go to Products
    </Button>
  );
}

export default MyButton;
