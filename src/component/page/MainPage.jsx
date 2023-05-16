import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainList from "../list/MainList";
import categoryData from "../../categoryData.json";
import Buttons from "../ui/Buttons";

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
  return (
    // <CategoryCard
    //   posts={categoryData}
    //   onClick={(item) => {
    //     navigate(`/categories/${item.id}/problems`);
    //   }}
    // />
    <Wrapper>
      <Container>
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
