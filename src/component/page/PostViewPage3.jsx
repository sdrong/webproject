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

const Mkdetail = styled.textarea`
  padding: 16px 24px;
  width: 80%;
  height: 200px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
`;

const Mkproblem = styled.input`
  padding: 16px 24px;
  width: 80%;
  height: 50px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  margin-right: 8px;
`;

function PostViewPage3(props) {
  const navigate = useNavigate();
  const { problemId } = useParams();
  console.log(problemId);
  const problemIdInt = parseInt(problemId, 10);
  const post = data.find((item) => {
    return item.id === problemIdInt;
  });
  const [answer, setAnswer] = useState("");
  const str = post.content;
  const regex = /\$%&123/g;
  const result = str.split(regex);
  const anw = result[5].trim();
  const [resultText, setResultText] = useState("");
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
  const [isEditMode, setIsEditMode] = useState(false);
const toggleEditMode = () => {
  setIsEditMode(!isEditMode);
};

const handleTextChange = (index, value) => {
  const newValues = [...texts];
  newValues[index] = value;
  setTexts(newValues);
};

const toggleShowAnswer = () => {
  setShowAnswer(!showAnswer);
  setButtonTitle(showAnswer ? "정답 보기" : "정답 숨기기");
};

    const title = post.title;
    const [texts, setTexts] = useState([result[1], result[2], result[3], result[4]]);
    const [re_write, setReWrite] = useState(result[0]);
    const [re_title, setReTitle] = useState(post.title);
    const [re_answer, setReAnswer] = useState(result[5]);
    
    const handleRadioButtonChange = (event) => {
      const selectedAnswer = event.target.value;
      const selectedAnswerIndex = result.indexOf(selectedAnswer);
      setAnswer(selectedAnswerIndex.toString());
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
  title="댓글보기"
  onClick={() => navigate(`/problems/${problemId}/comments`)}
/>

    <br />
    <Buttons title="삭제" />
    <hr />
    {isEditMode ? (
    <>
    <h2>수정 문제 제목</h2>
    <input
    style={{ width: "100%", height: "50px" }}
    value={re_title}
    onChange={(event) => {
    setReTitle(event.target.value);
    }}
    />
    <h2>수정 문제 내용</h2>
        <textarea
          style={{ width: "100%", height: "100px" }}
          value={re_write}
          placeholder="정답부분을$%&123사이에 넣어주세요 ex) 2002년 월드컵의 마스코트는 $%&123정답부분$%&123이다."
          onChange={(event) => {
            setReWrite(event.target.value);
          }}
        />
        <h2>수정 문제 정답 예시</h2>
        {texts.map((text, index) => (
          <div key={index}>
            <span>{index + 1}. </span>
            <Mkproblem
              value={text}
              onChange={(event) => {
                handleTextChange(index, event.target.value);
              }}
            />
          </div>
        ))}
        <h2>수정 정답</h2>
        <TextInput
          style={{ width: "100%", height: "200px" }}
          value={re_answer}
          onChange={(event) => {
            setReAnswer(event.target.value);
          }}
        />
        <br />
        <Buttons title="저장" onClick={toggleEditMode} />
        <hr />
      </>
    ) : (
      <Buttons title="수정" onClick={toggleEditMode} />
    )}

    <TitleText>{post.title}</TitleText>
    <PostContainer>
      <ContentText>{result[0]}</ContentText>
    </PostContainer>
    <RadioContainer>
  <RadioButton
    type="radio"
    value={result[1]}
    checked={answer === "1"}
    onChange={handleRadioButtonChange}
  />
  <label>{result[1]}</label>
</RadioContainer>
<RadioContainer>
  <RadioButton
    type="radio"
    value={result[2]}
    checked={answer === "2"}
    onChange={handleRadioButtonChange}
  />
  <label>{result[2]}</label>
</RadioContainer>
<RadioContainer>
  <RadioButton
    type="radio"
    value={result[3]}
    checked={answer === "3"}
    onChange={handleRadioButtonChange}
  />
  <label>{result[3]}</label>
</RadioContainer>
<RadioContainer>
  <RadioButton
    type="radio"
    value={result[4]}
    checked={answer === "4"}
    onChange={handleRadioButtonChange}
  />
  <label>{result[4]}</label>
</RadioContainer>
<AnswerList>answers = {post.answers}</AnswerList>
<hr></hr>
<Buttons title="정답 제출" onClick={handleAnswerSubmit} />
<h4>result: {resultText}</h4>
<Buttons title={buttonTitle} onClick={toggleShowAnswer} />
    {showAnswer && <Result>정답은 {anw} 입니다!</Result>}
    <hr />
  </Container>
</Wrapper>
);
}

export default PostViewPage3;