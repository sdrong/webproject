import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import MainList from "../list/MainList";
import axios from "axios";

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
  const [ categoryList, setCateogryList ] = useState();

  async function getCategories() {
    await axios
      .get("/categories")
      .then((response) => {
        setCateogryList(response.data);
        console.log(response);
        // 카테고리 목록 불러오는 요청
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
      getCategories();
  }, []);

  return (
    <Wrapper>
      <Container>
        { categoryList &&
          <MainList
            posts={categoryList} //과목 목록들
          />
        }
      </Container>
    </Wrapper>
  );
}

export default MainPage;
