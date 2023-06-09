import React from "react";
import styled from "styled-components";
import MainListItem from "./MainListItem";

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

function MainList(props) {
  const { posts } = props;

  return (
    <Wrapper style={{ display: "inline" }}>
      {true &&
        posts.map((post) => {
          return <MainListItem key={post.id} post={post} />;
        })}
    </Wrapper>
  );
}

export default MainList;
