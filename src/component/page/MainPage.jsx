import React, { useState, useCallback, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainList from "../list/MainList";
import categoryData from "../../categoryData.json";
import Buttons from "../ui/Buttons";
import axios from "axios";
import { Button } from "react-bootstrap";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: inline-block;
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

function MainPage(props) {
  const navigate = useNavigate();
  const { title, setTitle } = useState();
  const { categoryData, setCateogryData } = useState();

  // TODO: useEffect
  useEffect(() => {
    // 컴포넌트가 마운트 될 때 실행
    getCategory();
  }, []);

  async function getCategory() {
    await axios
      .get("/categories")
      .then((response) => {
        console.log(response.data);
        setCateogryData(response.data);
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
          onClickItem={(item) => {
            navigate(`/login`);
          }}
        >
          로그인
        </Buttons>
        <Buttons
          onClickItem={(item) => {
            navigate(`/sighup`);
          }}
        >
          회원가입
        </Buttons>
        <MainList
          posts={categoryData} //과목 목록
          onClickItem={(item) => {
            navigate(`/categories/${item.id}/problems`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default MainPage;
