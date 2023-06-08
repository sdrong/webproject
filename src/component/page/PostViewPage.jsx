import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";
import { Card } from "react-bootstrap";
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

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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

function PostViewPage(props) {
  const navigate = useNavigate();
  const { problemId } = useParams(); //데이터 받는거
  console.log(problemId);
  const problemIdInt = parseInt(problemId, 10);
  const post = data.find((item) => {
    //쓸 데이터id 찾기
    return item.id === problemIdInt;
  });
  const solvedusers = post.solveUsers;//푼사람 목록
  const users = post.user;
  const [answer, setAnswer] = useState(""); //text area의 anwser 가져오는거
  const str = post.content; //글을 가져오고
  const regex = /\$%&123/g; //파싱을 조건
  const result = str.split(regex); // 컨텐츠 분할
  const anw = result[1].trim(); // 답 저장
  const [resultText, setResultText] = useState(""); //정답유무
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");
  const [categoryName, setCategoryName] = useState();

  const [problem, setProblem] = useState();

  //   - url: '/problems/{problemId}'
  // - method: GET
  // - 설명: 선택한 문제 1개 조회.
  async function getProblem() {
    await axios
      .get(`/problems/${problemId}`)
      .then((response) => {
        setProblem(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProblem();
  }, []);

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
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const title = post.title;
  const [re_problem, setReProblem] = useState(result[0]+"???"+result[2]); //수정 문제설명
  const [re_title, setReTitle] = useState(title);//수정할 제목
  const [re_answer, setReAnswer] = useState(anw);
  return (
    <Wrapper>
      <Container>
        <Buttons
          title="뒤로 가기"
          onClick={() => navigate(-1)}
        />
        <Buttons title="댓글보기"onClick={() => navigate(`/problems/${problemId}/comments`)}/>
        <br/>
        <Buttons
        title = "삭제"/>
        <hr/>
        {isEditMode ? (
           <>
           <h2>문제 제목</h2>
           <input
           style={{ width: "100%", height: "50px" }}
           value={re_title}
            onChange={(event) => {
              setReTitle(event.target.value);
               }}
               />

               
           <h2>문제 내용</h2>
            <textarea
              style={{ width: "100%", height: "200px" }}
              value={re_problem}
              placeholder="정답부분을???로 표기하여 주세요 ex) 2002년 월드컵의 마스코트는 ???이다."
              onChange={(event) => {
              setReProblem(event.target.value);
               }}
           />
           <h2>수정 정답</h2>
           <TextInput
           style={{ width: "100%", height: "200px" }}
           value={re_answer}
            onChange={(event) => {
              setReAnswer(event.target.value);
               }}
               />
                <br/>
          <Buttons title="저장" onClick={toggleEditMode} />
          <hr/>
           </>
         ) : (
            <Buttons title="수정" onClick={toggleEditMode} />
          )}
        {["Success"].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === "light" ? "dark" : "white"}
            className="mb-2"
          >
            <Card.Header>{post.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                <PostContainer>
                  <ContentText>{result[0]}</ContentText>
                  <TextInput
                    height={40}
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value);
                    }}
                  />
                  <ContentText>{result[2]}</ContentText>
                </PostContainer>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <AnswerList>answers = {post.answers}</AnswerList>
        <hr></hr>
        <Buttons title="정답 제출" onClick={handleAnswerSubmit} />
        <h4>result: {resultText}</h4>

        <Buttons title={buttonTitle} onClick={toggleShowAnswer} />
        {showAnswer && <Result>정답은 [{anw}] 입니다!</Result>}
        <hr/>
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;