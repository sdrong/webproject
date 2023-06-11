import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PostList from "../list/PostList";
import Buttons from "../ui/Buttons";

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

function PostPage() {
  const navigate = useNavigate();
  const { mainId } = useParams();
  const mainIdInt = parseInt(mainId, 10);
  const [selectedOption, setSelectedOption] = useState("빈칸"); // 라디오 선택 머했는지

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const handleButtonClick = async () => {
    if (selectedOption === "빈칸") {
      navigate(`/post-write1/${mainId}`);
    } else if (selectedOption === "서술형") {
      navigate(`/post-write2/${mainId}`);
    } else if (selectedOption === "객관식") {
      navigate(`/post-write3/${mainId}`);
    }
  
    // 문제 작성 후 데이터를 가져와서 화면 갱신
    await getCategory();
  };

  const [categoryData, setCategoryData] = useState();
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  

  async function getCategory() {
    try {
      const response = await axios.get(`/categories/${mainId}/problems`);
      console.log(response.data);
      setCategoryData(response.data);
      setCategoryId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(`/categories`)} />
        <PostList posts={categoryData} onClickItem={(item) => {}} />
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
