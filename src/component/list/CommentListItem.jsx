import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CommentListItem(props) {
  const { comment } = props;
  const commentId = comment.id;
  const [good, setGood] = useState(comment.recommendCount);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  return (
    <Card
      border="success"
      style={{
        width: "100%",
        display: "inline-block"
      }}
    >
      <Card.Header>
        <Link to={`/comments/${commentId}`}>{"수정"}</Link>
        <h4>
          <span onClick={handleGoodClick}>👍</span>
          {good}
        </h4>
        <Card.Text>{"익명"}{comment.id}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CommentListItem;
