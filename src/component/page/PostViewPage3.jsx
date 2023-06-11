import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
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
  useEffect(() => {
    getProblem();
    findUserById();
  });
  // 객관식
  const navigate = useNavigate();
  const { problemId } = useParams();
  // console.log(problemId);
  const problemIdInt = parseInt(problemId, 10);
  // const post = data.find((item) => {
  //   return item.id === problemIdInt;
  // });
  const [answer, setAnswer] = useState("");
  const str = problem.content;
  const regex = /\$%&123/g;
  const result = str.split(regex);
  const anw = result[5].trim();
  const [resultText, setResultText] = useState("");
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");

  //수정된 제목
  const [modifiedTitle, setModifiedTitle] = useState(result[0]);
  // 수정된 정답
  const [modifiedAnswer, setModifiedAnswer] = useState(anw);
  //수정된 문제설명
  const [modifiedProblem, setModifiedProblem] = useState(
    result[0] + "???" + result[2]
  );

  // 수정된 content
  const [modifiedContent, setModifiedContent] = useState();

  // - url: '/problems/{problemId}'
  // - method: GET
  // - 설명: 선택한 문제 1개 조회.

  const [problem, setProblem] = useState();
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

  // - 명칭 update Solvable
  // - url: '/users/{userId}'
  // - url 예시: 'http://localhost:8080/users/3'
  // - method: PUT
  // - 내용: 회원의 문제풀이가능잔여횟수 수정(조정).
  // - 토큰 담긴 헤더 필수 유무: O

  // - 입력해야할 json 예시:
  // {
  //     "solvableCount": -1
  // }

  const decreaseSolvableCount = () => {
    if (userInfo.solvableCount < 0) {
      ZeroSolvableAlert();
      console.log("There are no solvable count");
      return userInfo.solvableCount;
    } else {
      return userInfo.solvableCount - 1;
    }
  };

  // 문제 풀이권 업데이트
  async function updateSolvableCount() {
    await axios
      .put(`/users/${userInfo.id}`, { solvableCount: decreaseSolvableCount() })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 문제 풀이권 0개 이하일 때 Alert
  const ZeroSolvableAlert = () => {
    Alert.alert(
      "알림",
      "문제 풀이권이 0개 이하입니다.",
      [{ text: "확인", onPress: () => {}, style: "defalut" }],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  // - 명칭 update Problem
  // - url: '/problems/{problemId}'
  // - url 예시: 'http://localhost:8080/problems/1'
  // - method: PUT
  // - 내용: 선택한 문제 1개 제목과 내용 수정.
  // - 토큰 담긴 헤더 필수 유무: O

  // - 입력해야할 json 예시:
  // {
  //     "title": "수정된 문서 제목이지요",
  //     "content": "수정일$12수정이$12수정삼"
  // }

  async function updateProblem() {
    await axios
      .put(`/problems/${problemId}`, {
        title: modifiedTitle,
        content: modifiedContent,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // - 명칭: find User By Id
  // - url: '/users/{userId}'
  // - url 예시: 'http://localhost:8080/users/3'
  // - method: GET
  // - 내용: userId로 1명의 회원정보 조회
  // - 토큰 담긴 헤더 필수 유무: O
  // - 반환되는 json 예시:
  // {
  //     "id": 3,
  //     "loginId": "테스트아디3",
  //     "username": "테스트이름3",
  //     "solvableCount": 5
  // }

  const [userInfo, setUserInfo] = useState();
  async function findUserById() {
    await axios
      .get(`/users/${userInfo.id}`)
      .then((response) => {
        setUserInfo(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAnswerSubmit() {
    if (answerWithoutSpace === anwWithoutSpace) {
      setResultText("정답입니다!");
    } else {
      setResultText("틀렸습니다.");
    }
  }
  const [showAnswer, setShowAnswer] = useState(false);
  const Result = styled.h4`
    margin: 16px 0;
    font-size: 20px;
  `;
  const [buttonTitle, setButtonTitle] = useState("정답 보기");
  const [isEditMode, setIsEditMode] = useState(false);
  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  const handleTextChange = (index, value) => {
    const newValues = [...texts];
    newValues[index] = value;
    setTexts(newValues);
  };

  function toggleShowAnswer() {
    setShowAnswer(!showAnswer);
    setButtonTitle(showAnswer ? "정답 보기" : "정답 숨기기");
  }

  const title = problem.title;
  const [texts, setTexts] = useState([
    result[1],
    result[2],
    result[3],
    result[4],
  ]);

  // const [re_write, setReWrite] = useState(result[0]);
  // const [re_title, setReTitle] = useState(post.title);
  // const [re_answer, setReAnswer] = useState(result[5]);

  const handleRadioButtonChange = (event) => {
    const selectedAnswer = event.target.value;
    const selectedAnswerIndex = result.indexOf(selectedAnswer);
    setAnswer(selectedAnswerIndex.toString());
  };

  const [good, setGood] = useState(post.recommendCount);
  const userid = 2;
  const isRecommended = post.recommendUsers.includes(userid);
  const handleGoodClick = (e) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파 방지
    if (!isRecommended) {
      setGood(good + 1);
      // 백엔드 업데이트 또는 추천으로 표시하는 요청 전송
      // 예: sendRecommendation(commentId);
    }
  };


  return (
    <Wrapper>
      <Container>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(-1);
            // navigate(`/categories/${post.category.id}/problems`);
          }}
        />
        <Buttons
          title="댓글보기"
          onClick={() => navigate(`/problems/${problemId}/comments`)}
        />
        <h4>
          <span
            onClick={handleGoodClick}
            style={{ cursor: isRecommended ? "not-allowed" : "pointer" }}
          >
            👍
          </span>
          {good}
        </h4>

        <br />
        <Buttons title="삭제" />
        <hr />
        {isEditMode ? (
          <>
            <h2>수정 문제 제목</h2>
            <input
              style={{ width: "100%", height: "50px" }}
              value={modifiedTitle}
              onChange={(event) => {
                setModifiedTitle(event.target.value);
              }}
            />
            <h2>수정 문제 내용</h2>
            <textarea
              style={{ width: "100%", height: "100px" }}
              value={modifiedProblem}
              placeholder="정답부분을$%&123사이에 넣어주세요 ex) 2002년 월드컵의 마스코트는 $%&123정답부분$%&123이다."
              onChange={(event) => {
                setModifiedProblem(event.target.value);
              }}
            />
            <h2>수정 문제 정답 예시</h2>
            {true &&
              texts.map((text, index) => (
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
              value={modifiedAnswer}
              onChange={(event) => {
                setModifiedAnswer(event.target.value);
              }}
            />
            <br />
            <Buttons
              title="저장"
              onClick={() => {
                setModifiedContent(
                  modifiedProblem[0] +
                    "$%&123" +
                    texts[0] +
                    "$%&123" +
                    texts[1] +
                    "$%&123" +
                    texts[2] +
                    "$%&123" +
                    texts[3] +
                    "$%&123"
                );
                updateProblem();
                toggleEditMode();
              }}
            />
            <hr />
          </>
        ) : (
          <Buttons title="수정" onClick={toggleEditMode()} />
        )}

        <TitleText>{problem.title}</TitleText>
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
        <hr></hr>
        <Buttons
          title="정답 제출"
          onClick={() => {
            updateSolvableCount();
            handleAnswerSubmit();
          }}
        />
        <h4>result: {resultText}</h4>
        <Buttons
          title={buttonTitle}
          onClick={() => {
            updateSolvableCount();
            toggleShowAnswer();
          }}
        />
        {showAnswer && <Result>정답은 {anw} 입니다!</Result>}
        <hr />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage3;
