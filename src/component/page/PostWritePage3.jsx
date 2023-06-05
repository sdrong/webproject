import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import Editor from "../ui/Editor";
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

const TitleInput = styled.input`
  height: 50px;
  width: 70%;
`;
const SecretInput = styled.input`
  width: 200px;
  height: 50px;
`;

function PostWritePage3(props) {
  const navigate = useNavigate();
  const { writeId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState(""); //비밀번호
  const [texts, setTexts] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(""); //답
  const [detail, setDetail] = useState("");
  const [categoryName, setCategoryName] = useState(); //카테고리 이름
  const handleTextChange = (index, value) => {
    const newValues = [...texts];
    newValues[index] = value;
    setTexts(newValues);
  };
  const content = detail + texts.join("$%&123") + "$%&123" + answer;
  const baseUrl = "http://localhost:3000";
  const categories = "categories";
  const problem = "problem";

  const handleSubmit = async (e) => {
    e.preventDefalut();

    await axios
      .post(baseUrl + "/" + categoryName + "problem", {
        title: title,
        content: content,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <Buttons
          title="뒤로 가기"
          onClick={() => navigate(`/categories`)}
        />
      <Container>
        <h2>문제 제목</h2>
        <TitleInput
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <h2>문제내용</h2>
        <Mkdetail
          value={detail}
          onChange={(event) => {
            handleTextChange(event.target.value);
          }}
        />
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
        <h3>답</h3>
        <TextInput
          height={40}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
        <h3>비밀번호</h3>
        <SecretInput
          height={40}
          value={secret}
          onChange={(event) => {
            setSecret(event.target.value);
          }}
        />
        <hr />
        <Buttons
          onSubmit={handleSubmit}
          title="문제 작성하기"
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostWritePage3;
