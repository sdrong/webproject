import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";
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

function levenshteinDistance(strA, strB) {
  const distanceMatrix = Array(strB.length + 1)
    .fill(null)
    .map(() => Array(strA.length + 1).fill(null));

  for (let i = 0; i <= strA.length; i += 1) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= strB.length; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= strB.length; j += 1) {
    for (let i = 1; i <= strA.length; i += 1) {
      const substitutionCost = strA[i - 1] === strB[j - 1] ? 0 : 1;

      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return distanceMatrix[strB.length][strA.length];
}

function PostViewPage2(props) {
  useEffect(() => {
    getProblem();
  }, []);

  // 주관식
  const navigate = useNavigate();
  const { problemId } = useParams(); //데이터 받는거
  console.log(problemId);
  const problemIdInt = parseInt(problemId, 10);
  // const post = data.find((item) => {
  //   //쓸 데이터id 찾기
  //   return item.id === problemIdInt;
  // });
  const [answer, setAnswer] = useState(""); //text area의 anwser 가져오는거
  const str = problem.content; //글을 가져오고
  const regex = /\$%&123/g; //파싱을 조건
  const result = str.split(regex); // 컨텐츠 분할
  const anw = result[1].trim(); // 답 저장
  const [resultText, setResultText] = useState(""); //정답유무
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");
  const distance = levenshteinDistance(answerWithoutSpace, anwWithoutSpace);
  const maxLength = Math.max(answerWithoutSpace.length, anwWithoutSpace.length);
  const similarity = (1 - distance / maxLength) * 100;
  const per = similarity.toFixed(2);

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

  // const title = post.title;
  // const [re_write, setReWrite] = useState(result[0]); //수정한 답
  // const [re_title, setReTitle] = useState(post.title); //수정할 제목
  // const [re_answer, setReAnswer] = useState(result[1]);

  return (
    <Wrapper>
      <Container>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(`/categories/${problem.category.id}/problems`);
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
              value={modifiedTitle}
              onChange={(event) => {
                setModifiedTitle(event.target.value);
              }}
            />

            <h2>수정 문제 내용</h2>
            <textarea
              style={{ width: "100%", height: "200px" }}
              value={modifiedProblem}
              onChange={(event) => {
                setModifiedProblem(event.target.value);
              }}
            />
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
                const splitedProblem = modifiedProblem.split("???");
                setModifiedContent(
                  splitedProblem[0] +
                    "$%&123" +
                    modifiedAnswer +
                    "$%&123" +
                    splitedProblem[1]
                );
                updateProblem();
                toggleEditMode;
              }}
            />
            <hr />
          </>
        ) : (
          <Buttons title="수정" onClick={toggleEditMode} />
        )}
        <TitleText>{problem.title}</TitleText>
        <PostContainer>
          <ContentText>{result[0]}</ContentText>
        </PostContainer>
        <hr></hr>
        <TextInput
          height={40}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
        {/* <Buttons title="정답 제출" onClick={handleAnswerSubmit} /> */}
        <h4>result: {resultText}</h4>

        <Buttons
          title={buttonTitle}
          onClick={() => {
            updateSolvableCount();
            toggleShowAnswer;
          }}
        />
        {showAnswer && <Result>정답은 {anw} 입니다!</Result>}
      </Container>
    </Wrapper>
  );
}

export default PostViewPage2;
