import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostListItem from "./PostListItem";
import { Card } from "react-bootstrap";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function PostList(props) {
  const navigate = useNavigate();
  const { posts } = props;

  if (!posts) {
    return null; // posts가 없는 경우 아무것도 렌더링하지 않음
  }

  return (
    <Card style={{ border: "none", marginLeft: "0" }}>
      {posts.map((post) => {
        return (
          <PostListItem
            key={post.id}
            post={post}
            handleClick={() => {
              var path = post.type === 1 ? "/problems" : "/problems2";
              if (post.type === 3) {
                path = "/problems3";
              }
              navigate(`${path}/${post.id}`);
            }}
          />
        );
      })}
    </Card>
  );
}

export default PostList;
