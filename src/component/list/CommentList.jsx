import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CommentListItem from "./CommentListItem";
import { Card } from "react-bootstrap";

function CommentList(props) {
  const { comments } = props;

  return (
    <Card style={{ border: "none", marginLeft: "0" }}>
      {true &&
        comments.map((comment) => {
          return <CommentListItem key={comment.id} comment={comment} />;
        })}
    </Card>
  );
}

export default CommentList;
