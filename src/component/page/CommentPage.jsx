import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import Buttons from "../ui/Buttons";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import cmmdata from "../../commentdata.json";

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

const Mkproblem = styled.textarea`
  padding: 16px 24px;
  width: 80%;
  height: 200px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
`;

function CommentPage(props) {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [comment, setComment] = useState("");
  const cmmList = cmmdata;

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

  async function saveComment() {
    await axios.post(
      `/problems/${problemId}/comments`,
      {
        // 댓글 내용
        content: comment,
      }
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

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

  async function getComment() {
    await axios
      .get(`/problems/${problemId}/comments`)
      .then((response) => {
        setComment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(-1)} />
        {/* 수정된 부분: cmmList를 전달 */}
        <CommentList comments={cmmList} />
        <Mkproblem
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Buttons title="댓글 작성하기" onClick={updateComment} />
      </Container>
    </Wrapper>
  );
}

export default CommentPage;
