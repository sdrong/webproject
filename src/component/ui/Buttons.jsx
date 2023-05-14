import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-radius: 8px;
  cursor: pointer;
`;
function Buttons(props) {
  const { title, onClick } = props;

  return (
    <Button variant="primary" onClick={onClick}>
      {title || "button"}
    </Button>
  );
}

export default Buttons;
