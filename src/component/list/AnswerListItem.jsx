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
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const ContentText = styled.p`
  font-size: 14px;
`;

function AnswerListItem(props) {
  const { comment } = props;

  return (
    <Card>
      <Card.Header>{comment.id}</Card.Header>
      <Card.Body>{comment.content}</Card.Body>
    </Card>
  );
}

export default AnswerListItem;