import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import MainList from "../list/MainList";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

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

  const { categoryData, setCateogryName } = useState();
  const categoryId = categoryData.id;

  async function getCategory() {
    await axios
      .get("/categories" + "/" + { mainId } + "/" + "problems")
      .then((response) => {
        console.log(response.data);
        setCateogryName(response.data.categoryData);
        const categoryId = categoryData.id;
        // 카테고리 들어가는 요청
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <Container>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(`/categories`);
          }}
        />
        <PostList
          posts={postList}
          onClickItem={(item) => {
            const path = item.type === 1 ? "/problems/" : "/problems2/";
            navigate(`${path}${item.id}`);
          }}
        />
        <Buttons
          title="글 작성하기"
          onClick={() => {
            navigate(`/post-write1/${mainIdInt}`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostPage;
