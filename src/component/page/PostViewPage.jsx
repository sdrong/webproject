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
import CheckToken from "../../utils/CheckToken";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";

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

const Result = styled.h4`
  margin: 16px 0;
  font-size: 20px;
`;

function PostViewPage(props) {
  useEffect(() => {
    getProblem();
    findUserById();
  }, []);

  const navigate = useNavigate();
  const { problemId } = useParams(); //데이터 받는거
  const problemIdInt = parseInt(problemId, 10);
  // const post = problem.find((item) => {
  //   //쓸 데이터id 찾기
  //   return item.id === problemIdInt;
  // });
  // const solvedusers = post.solveUsers; //푼사람 목록
  // const users = post.user;
  //text area의 anwser 가져오는거
  const [answer, setAnswer] = useState("");
  //백엔드에서 데이터를 가져온다.
  const str = problem.content;
  const regex = /\$%&123/g; //파싱 조건
  const result = str.split(regex); // 컨텐츠 분할
  const anw = result[1].trim(); // 답 저장
  const [resultText, setResultText] = useState(""); //정답유무
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");
  // const [categoryName, setCategoryName] = useState();

  const [showAnswer, setShowAnswer] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("정답 보기");
  const [isEditMode, setIsEditMode] = useState(false);
  function toggleShowAnswer() {
    setShowAnswer(!showAnswer);
    setButtonTitle(showAnswer ? "정답 보기" : "정답 숨기기");
  }
  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  const [problem, setProblem] = useState();
// 수정된 문제설명
const [modifiedProblem, setModifiedProblem] = useState(result[0] + "???" + result[2]);
// 수정된 제목
const [modifiedTitle, setModifiedTitle] = useState();
// 수정된 정답
const [modifiedAnswer, setModifiedAnswer] = useState(anw);
// 수정된 content
const [modifiedContent, setModifiedContent] = useState();

// - url: '/problems/{problemId}'
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
  if (problem) {
    setModifiedTitle(problem.title);
  }
}, [problem]);

// getProblem 함수 호출
getProblem();

  
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
  

  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): update Solvable
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

  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): update Problem
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

  // TODO: ViewPage2,3 에도 updateRecommand 뿌려줘야 함
  // - 명칭: update Recommend
  // - url: '/recommend-problem/{problemId}'
  // - url 예시: 'http://localhost:8080/recommend-problem/1'
  // - method: PUT
  // - 내용: 문제 추천 기능
  // - 토큰 담긴 헤더 필수 유무: O

  async function updateRecommand() {
    await axios
      .put(`/recommand-problem/${problemId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAnswerSubmit() {
    if (answerWithoutSpace === anwWithoutSpace) {
      setResultText("정답입니다!");
    } else {
      setResultText("틀렸습니다.");
    }
  }


  return (
    // 단답형 문제
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(-1)} />
        <Buttons
          title="댓글보기"
          onClick={() => navigate(`/problems/${problemId}/comments`)}
        />
        <br />
        <Buttons title="삭제" />
        <hr />
        {isEditMode ? (
          <>
            <h2>문제 제목</h2>
            <input
              style={{ width: "100%", height: "50px" }}
              value={modifiedTitle}
              onChange={(event) => {
                setModifiedTitle(event.target.value);
              }}
            />

            <h2>문제 내용</h2>
            <textarea
              style={{ width: "100%", height: "200px" }}
              value={modifiedProblem}
              placeholder="정답부분을???로 표기하여 주세요 ex) 2002년 월드컵의 마스코트는 ???이다."
              onChange={(event) => {
                setModifiedProblem(event.target.value);
              }}
            />
            <h2>수정된 정답</h2>
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
                const splitedProblem = modifiedProblem.split("???");
                setModifiedContent(
                  splitedProblem[0] +
                    "$%&123" +
                    modifiedAnswer +
                    "$%&123" +
                    splitedProblem[1]
                );
                updateProblem();
                toggleEditMode();
              }}
            />
            <hr />
          </>
        ) : (
          <Buttons title="수정" onClick={toggleEditMode} />
        )}
        {true &&
          ["Success"].map((variant) => (
            <Card bg="gray" text="black" className="mb-2">
  <Card.Header>{problem.title}</Card.Header>
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
        {showAnswer && <Result>정답은 [{anw}] 입니다!</Result>}
        <hr />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;
