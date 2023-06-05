import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";

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

const SomeContent = styled.p`
    font-size: 13px;np
    font-weight: 300;
`;

function PostListItem(props) {
  const { post, handleClick } = props;
  const str = post.content;
  const regex = /\$%&123/g;
  const result = str.split(regex); //

  return (
    <div onClick={handleClick}>
      {["Success"].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === "light" ? "dark" : "white"}
          className="mb-2"
        >
          <Card.Header>{post.title}</Card.Header>
          <Card.Body>
            <Card.Text>{result[0] + " [???] " + result[2]}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>

    // <Card style={{ margin: "10px", marginLeft: "0", width:"" }} onClick={onClick}>
    //   <Card.Header as="h5">{post.title}</Card.Header>
    //   <Card.Body>
    //     <Card.Title>{result[0] + "???" + result[2]}</Card.Title>
    //   </Card.Body>
    // </Card>
  );
}

export default PostListItem;