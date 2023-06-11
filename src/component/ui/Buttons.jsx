import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledButton = styled(Button)`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-radius: 8px;
  cursor: pointer;
  background-color: gray;
  color: white;

  &:hover {
    background-color: black;
    color: white;
  }
`;

function Buttons(props) {
  const { title, onClick } = props;

  return (
    <StyledButton onClick={onClick}>
      {title || "button"}
    </StyledButton>
  );
}

export default Buttons;
