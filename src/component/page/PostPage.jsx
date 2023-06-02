import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

  const problemList  = data.filter((item) => {
    //과목 id와 문제의 카테고리 안 id를 비교해서 list형태로 저장
    return item.category.id === mainIdInt;
  });

  // TODO: 백엔드 완성하기 전까지 주석처리
  // const [problemList, setProblemList] = useState();

  // async function getProblems() {
  //   await axios
  //     .get(`/categories/${mainId}/problems`)
  //     .then((response) => {
  //       setProblemList(response.data);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   getProblems();
  // }, []);

  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(`/categories`)} />
        <PostList
  posts={problemList}
  onClickItem={(item) => {
    
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