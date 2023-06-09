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

  // - 명칭: save Problem
  // - url: '/categories/{categoryId}/problems'
  // - url 예시: 'http://localhost:8080/categories/3/problems'
  // - method: POST
  // - 내용: 선택한 카테고리에서 신규 문제 생성.
  // - 토큰 담긴 헤더 필수 유무: O
  // - 참고: 제대로 생성되는지 확인용으로 반환값을 만들어두었지만, 이는 프론트단에서는 딱히 쓸모가없을것임.

  // - 입력해야할 json 예시:
  // {
  //     "type": 2,
  //     "title": "문제 제목이지요",
  //     "content": "가나다라$%&123마바$%&123사아자차"
  // }

  // - 반환되는 json 예시:
  // {
  //     "id": 2,
  //     "type": 2,
  //     "title": "문제 제목이지요",
  //     "content": "가독성을 위해 문제내용은 생략하여 응답함.",
  //     "user": {
  //         "solvableCount": 5,
  //         "id": 2,
  //         "loginId": "테스트아디2",
  //         "loginPw": null,
  //         "username": "테스트이름2",
  //         "authority": null
  //     },
  //     "category": {
  //         "id": 3,
  //         "name": "빅데이터",
  //         "image": "ARER"
  //     }
  // }

  async function saveProblem() {
    await axios
      .post(`/categories/${writeId}/problems`, {
        type: writeId,
        title: title,
        content:
          texts[0] +
          "$%&123" +
          texts[1] +
          "$%&123" +
          texts[2] +
          "$%&123" +
          texts[3] +
          "$%&123",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log((error) => {
          console.log(error);
        });
      });
  }

  return (
    <Wrapper>
      <Buttons title="뒤로 가기" onClick={() => navigate(-1)} />
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
          onSubmit={saveProblem}
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
