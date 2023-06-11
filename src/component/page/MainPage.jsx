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
  width: 80 %;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function MainPage(props) {
  const navigate = useNavigate();
  // const { title, setTitle } = useState();
  const [categoryData, setCateogryData] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  /*
    - 명칭: find All Categories
    - url: '/categories'
    - url 예시: 'http://localhost:8080/categories'
    - method: GET
    - 내용: 모든 카테고리 목록들을 이름 가나다순으로 조회.
    - 토큰 담긴 헤더 필수 유무: X
    - 반환되는 json 예시:
    [
        {
            "id": 2,
            "name": "네트워크",
            "image": "AQER"
        },
        {
            "id": 3,
            "name": "빅데이터",
            "image": "ARER"
        },
        {
            "id": 1,
            "name": "운영체제",
            "image": "AQEB"
        }
    ]
  */

  async function getCategory() {
    await axios
      .get("/categories")
      .then((response) => {
        console.log(response.data);
        setCateogryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <Container>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </Button>
        <MainList
          //과목 목록
          posts={categoryData}
          onClickItem={(item) => {
            navigate(`/categories/${item.id}/problems`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default MainPage;
