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

function CommentPage(props) {
  const navigate = useNavigate();
  const { commentId } = useParams();
  const datas = cmmdata.filter((item) => item.id === parseInt(commentId));

  const contentdata = datas[0]?.content;
  const [text, setText] = useState(contentdata);

  const [comment, setComment] = useState(null);

  return (
    <Wrapper>
      <Container>
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
            navigate("/");
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default CommentPage;
