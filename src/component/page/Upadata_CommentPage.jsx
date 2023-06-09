import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
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

function Update_CommentPage(props) {
  const navigate = useNavigate();
  const { commentId } = useParams();
  const datas = cmmdata.filter((item) => item.id === parseInt(commentId));

  const contentdata = datas[0]?.content;
  const [text, setText] = useState(contentdata);

  const [comment, setComment] = useState();

  // - 명칭(내가 붙인 이름이니까 신경안쓰고 참고만 하면됨): update Comment
  // - url: '/comments/{commentId}'
  // - url 예시: 'http://localhost:8080/comments/2'
  // - method: PUT
  // - 내용: 댓글 수정.
  // - 토큰 담긴 헤더 필수 유무: O

  // - 입력해야할 json 예시:
  // {
  //     "content": "수정한 댓글 내용임."
  // }

  async function updateComment() {
    await axios
      .put(`/comments/${commentId}`, {
        content: text,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(-1)} />
        <hr />
        <Mkproblem
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <hr />
        <Buttons
          title="댓글 수정하기"
          onClick={() => {
            updateComment();
            navigate(-1);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default Update_CommentPage;
