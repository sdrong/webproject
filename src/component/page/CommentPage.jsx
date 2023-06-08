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
  const {problemId} = useParams();
  const [text, setText] = useState("");
  const cmmList = cmmdata;
  
  return (
    <Wrapper>
      <Container>
        <Buttons title="뒤로 가기" onClick={() => navigate(-1)} />
        {/* 수정된 부분: cmmList를 전달 */}
        <CommentList comments={cmmList} />
        <Mkproblem
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <Buttons title="댓글 작성하기" />
      </Container>
    </Wrapper>
  );
}

export default CommentPage;
