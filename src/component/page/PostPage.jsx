import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link, Route } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Buttons from "../ui/Buttons";
import MainList from "../list/MainList";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import data from "../../data.json";

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

  const problemList = data.filter((item) => {
    return item.category.id === mainIdInt;
  });

  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(`/categories`)} />
        <PostList
          posts={problemList}
          onClickItem={(item) => {
            // TODO: 클릭한 항목에 대한 동작 구현
          }}
        />

        <Buttons
          title="글 작성하기"
          onClick={() => navigate(`/post-write1/${mainId}`)}
        />        
      </Container>
    </Wrapper>
  );
}

export default PostPage;
