import React, { useState } from "react";
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

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label`
  margin-right: 16px;
`;

function PostPage(props) {
  const navigate = useNavigate();
  const { mainId } = useParams();
  const mainIdInt = parseInt(mainId, 10);
  const [selectedOption, setSelectedOption] = useState("빈칸"); // 라디오 선택 머했는지

  const problemList = data.filter((item) => {
    return item.category.id === mainIdInt;
  });

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const handleButtonClick = () => { 
    if (selectedOption === "빈칸") {
      navigate(`/post-write1/${mainId}`);
    } else if (selectedOption === "서술형") {
      navigate(`/post-write2/${mainId}`);
    } else if (selectedOption === "객관식") {
      navigate(`/post-write3/${mainId}`);
    }
  };

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
        <RadioContainer>
          <RadioLabel>
            <input
              type="radio"
              name="option"
              value="빈칸"
              checked={selectedOption === "빈칸"}
              onChange={() => handleRadioChange("빈칸")}
            />
            빈칸
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="option"
              value="서술형"
              checked={selectedOption === "서술형"}
              onChange={() => handleRadioChange("서술형")}
            />
            서술형
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="option"
              value="객관식"
              checked={selectedOption === "객관식"}
              onChange={() => handleRadioChange("객관식")}
            />
            객관식
          </RadioLabel>
        </RadioContainer>
        <Buttons title="글 작성하기" onClick={handleButtonClick} />       
      </Container>
    </Wrapper>
  );
}

export default PostPage;
