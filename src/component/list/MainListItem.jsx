import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import OperatingSystemImage from "../../image/free-icon-operating-system-2172894.png";

const Wrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
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
  const navigate = useNavigate();
  const { post } = props;

  return (
    <Wrapper>
      <Card
        border="success"
        style={{
          width: "18rem",
          height: "20rem",
          display: "inline-block",
          maxHeight: "600px",
        }}
      >
        <Card.Body>
          <Card.Img variant="top" src={OperatingSystemImage} />
          <Card.Title>{post.name}</Card.Title>
          <Button variant="primary" onClick={() => navigate(`/categories/${post.id}/problems`)}>
            문제 풀러가기
          </Button>
        </Card.Body>
      </Card>
    </Wrapper>
  );
}

export default MainListItem;
