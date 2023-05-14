import React from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

function MainListItem(props) {
  const { post, onClick } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src="../image/free-icon-operating-system-2172894.png"
        />
        <Card.Title>{post.category}</Card.Title>
        <Button variant="primary" onClick={onClick}>
          문제 풀러가기
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MainListItem;
