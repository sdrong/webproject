import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";

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

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

function PostViewPage3(props) {
  const navigate = useNavigate();
  const { problemId } = useParams(); //데이터 받는거
  console.log(problemId);
  const problemIdInt = parseInt(problemId, 10);
  const post = data.find((item) => {
    return item.id === problemIdInt;
  });
  const [answer, setAnswer] = useState(""); //text area의 anwser 가져오는거
  const str = post.content; //글을 가져오고
  const regex = /\$%&123/g; //파싱을 조건
  const result = str.split(regex); // 컨텐츠 분할
  const anw = result[5].trim(); // 답 저장
  const [resultText, setResultText] = useState(""); //정답유무
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");
  const handleAnswerSubmit = () => {
    if (answerWithoutSpace === anwWithoutSpace) {
      setResultText("정답입니다!");
    } else {
      setResultText("틀렸습니다.");
    }
  };
  const [showAnswer, setShowAnswer] = useState(false);
  const Result = styled.h4`
    margin: 16px 0;
    font-size: 20px;
  `;
  const [buttonTitle, setButtonTitle] = useState("정답 보기");
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    setButtonTitle(showAnswer ? "정답 보기" : "정답 숨기기");
  };
  return (
    <Wrapper>
    <Container>
      <Buttons
        title="뒤로 가기"
        onClick={() => {
          navigate(`/categories/${post.category.id}/problems`);
        }}
      />
      <Buttons
          title="수정"
          onClick={() => navigate(`/post-write3/${problemId}`)}
        />
        <Buttons
        title = "삭제"
        />
      <TitleText>{post.title}</TitleText>
      <PostContainer>
        <ContentText>{result[0]}</ContentText>
      </PostContainer>
        <h4>1.{result[1]}</h4>
        <h4>2.{result[2]}</h4>
        <h4>3.{result[3]}</h4>
        <h4>4.{result[4]}</h4>
      <AnswerList>answers = {post.answers}</AnswerList>
      <hr></hr>
      <TextInput
        height={40}
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
        }}
      />
      <Buttons title="정답 제출" onClick={handleAnswerSubmit} />
      <h4>result: {resultText}</h4>

      <Buttons title={buttonTitle} onClick={toggleShowAnswer} />
      {showAnswer && <Result>정답은 {anw} 입니다!</Result>}
      <hr/>
      <Buttons title="댓글보기"onClick={() => navigate(`/problems/${problemId}/comments`)}/>
    </Container>
  </Wrapper>
  );
}

export default PostViewPage3;