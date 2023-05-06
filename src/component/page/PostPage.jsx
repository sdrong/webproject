import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import data from "../../data.json";
import MainList from "../list/MainList";

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
    //과목 id와 문제의 카테고리 안 id를 비교해서 list형태로 저장
    return item.category.id === mainIdInt;
  });

  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate(`/categories`);
          }}
        />
        <PostList
          posts={postList}
          onClickItem={(item) => {
            navigate("/problems/" + item.id);
          }}
        />
        <Button
          title="글 작성하기"
          onClick={() => {
            navigate(`/post-write/${mainIdInt}`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostPage;
