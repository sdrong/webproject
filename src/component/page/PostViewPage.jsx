import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";
import { Card } from "react-bootstrap";
import axios from "axios";
import { CheckToken } from "../utils";

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
  const [answer, setAnswer] = useState(""); //text area의 anwser 가져오는거
  const str = post.content; //글을 가져오고
  const regex = /\$%&123/g; //파싱을 조건
  const result = str.split(regex); // 컨텐츠 분할
  const anw = result[1].trim(); // 답 저장
  const [resultText, setResultText] = useState(""); //정답유무
  const answerWithoutSpace = answer.replace(/\s+/g, "");
  const anwWithoutSpace = anw.replace(/\s+/g, "");
  const [categoryName, setCategoryName] = useState();

  //   - url: '/problems/{problemId}'
  // - method: GET
  // - 설명: 선택한 문제 1개 조회.

  // async function getPost() {
  //   await axios
  //     .get("/" + "problems")
  //     .then((response) => {
  //       console.log(response.data);
  //       setCategoryName(response.data.PostData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // TODO: comment 부분 가져와서 axios랑 합치기
  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): save Comment
  // - url: '/problems/{problemId}/comments'
  // - url 예시: 'http://localhost:8080/problems/1/comments'
  // - method: POST
  // - 내용: 댓글 작성.
  // - 토큰 담긴 헤더 필수 유무: O
  // - 입력해야할 json 예시:
  // {
  //     "content": "댓글 내용입니다~!ㄱㄴㄷ4"
  // }

  // async function saveComment() {
  //   await axios.post(
  //     `/problems/${problemId}/comments`,
  //     {
  //       content: comment,
  //     }
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   );
  // }

  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): problem Load Comments
  // - url: '/problems/{problemId}/comments'
  // - url 예시: 'http://localhost:8080/problems/1/comments'
  // - method: GET
  // - 내용: 선택한 문제가 가진 모든 댓글들 목록을 최신 생성순으로 정렬하여 조회.
  // - 토큰 담긴 헤더 필수 유무: O
  // - 반환되는 json 예시:
  // [
  //     {
  //         "id": 4,
  //         "content": "댓글 내용입니다~!ㄱㄴㄷ4",
  //         "recommendCount": 0,
  //         "recommendUsers": []
  //     },

  // const [comment, setComment] = useState();
  // async function getComment() {
  //   await axios.get(`/problems/${problemId}/comments`).then((response) => {
  //     setComment(response.data);
  //     console.log(response.data);
  //   });
  // }

  // TODO: PostViewPage에 로그인 안되어있는 상태에서 접근하면 CheckToken()을 사용해서 팅겨내기

  useEffect(() => {
    CheckToken();
  }, []);

  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): find User By Id
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
  async function findUserId() {
    await axios
      .get(`http://localhost:8080/users/${userinfo.id}`)
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
      console.log("풀이권이 없습니다!");
    } else {
      return userInfo.solvableCount - 1;
    }
  };

  async function updateSolvable() {
    await axios
      .put(`/users/${userInfo.id}`, { solvableCount: decreaseSolvableCount() })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <Wrapper>
      <Container>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(`/categories/${post.category.id}/problems`);
          }}
        />

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
        <Card border="primary">
          <Card.Header>{post.title}</Card.Header>
          <Card.Body>
            <Card.Title />
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
          </Card.Body>
        </Card>
        <AnswerList>answers = {post.answers}</AnswerList>
        <hr></hr>
        <Buttons title="정답 제출" onClick={handleAnswerSubmit} />
        <h4>result: {resultText}</h4>

        <Buttons title={buttonTitle} onClick={toggleShowAnswer} />
        {showAnswer && <Result>정답은 [{anw}] 입니다!</Result>}
        <Buttons
          title="댓글보기"
          onClick={() => navigate(`/problems/${problemId}/comments`)}
        />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;
