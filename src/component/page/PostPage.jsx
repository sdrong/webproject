import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import data from "../../data.json"
import MainList from '../list/MainList';

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function PostPage(props) {
  const navigate = useNavigate();
  const { mainId } = useParams();
  const mainIdInt = parseInt(mainId, 10);
  const postList = data.filter((item) => {
    return item.category.id ===  mainIdInt
  });


  return (
    <Wrapper>
      <Container>
        <Button
          title="글 작성하기"
          onClick={() => {
          navigate(`/post-write/${mainIdInt}`);
        }}
/>

        <PostList
          posts={postList}
          onClickItem={(item) => {
            navigate('/post/' + item.id);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostPage;