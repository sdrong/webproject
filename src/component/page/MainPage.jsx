import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import MainList from "../list/MainList";
import categoryData from "../../categoryData.json";
import Button from "../ui/Button";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;np
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
  return (
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
