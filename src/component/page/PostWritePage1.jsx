import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import data from "../../data.json";

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

const TitleInput = styled.input`
  height: 50px;
  width: 80%;
`;

const ResultInput = styled.input`
  width: 200px;
  height: 50px;
`;

const SecretInput = styled.input`
  width: 200px;
  height: 50px;
`;

const MyBlock = styled.div`
  width: 80%;
`;

const IntroduceContent = styled.div`
  position: relative;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

const BottomMargin = styled.div`
  margin-bottom: 8px;
`;

function TestEditorForm(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const navigate = useNavigate();
  const { writeId } = useParams();
  const problemIdInt = parseInt(writeId, 10);
  const [answer, setAnswer] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");
  const str = editorToHtml;
  const result = str.split("???");
  const content = result[0] + "$%&123" + answer + "$%&123" + result[1];
  const categories = "categories";
  const problem = "problem";

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  async function saveProblem() {
    try {
      const response = await axios.post(``, {
        type: parseInt(writeId, 10),
        title: title,
        content: content,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <MyBlock>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(-1);
          }}
        />

        <BottomMargin />
        <h2>문제 제목(단답형)</h2>
        <TitleInput
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <h2>문제내용</h2>
        <Mkproblem
          placeholder="정답부분을???로 표기하여 주세요 ex) 2002년 월드컵의 마스코트는 ???이다."
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <h3>답</h3>
        <TextInput
          height={40}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
        {/* <h3>비밀번호</h3>
        <SecretInput
          height={40}
          value={secret}
          onChange={(event) => {
            setSecret(event.target.value);
          }}
        /> */}
        <hr />
        <Buttons
        title="문제 작성하기"
        onClick={async () => {
          await saveProblem();
          navigate(-1);
        }}
      />
        {/* dangerouslySetInnerHTML: https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
        <IntroduceContent dangerouslySetInnerHTML={{ __html: editorToHtml }} />
      </MyBlock>
    </Wrapper>
  );
}

export default TestEditorForm;

// function PostWritePage1(props) {

//

//   return (
//     <Wrapper>
//       <Container onSubmit={handleSubmit}>
//         {/* TODO: 뒤로가기 버튼 category/{categoryNumber}/problems으로 넘어가게 만들어야 함  */}
//
//         <h2>문제 제목(단답형)</h2>
//         <TitleInput
//           value={title}
//           onChange={(event) => {
//             setTitle(event.target.value);
//           }}
//         />
//         <h2>문제내용</h2>
//         <Mkproblem
//           placeholder="정답부분을???로 표기하여 주세요 ex) 2002년 월드컵의 마스코트는 ???이다."
//           value={text}
//           onChange={(event) => {
//             setText(event.target.value);
//           }}
//         />
//         <h3>답</h3>
//         <TextInput
//           height={40}
//           value={answer}
//           onChange={(event) => {
//             setAnswer(event.target.value);
//           }}
//         />
//         <h3>비밀번호</h3>
//         <SecretInput
//           height={40}
//           value={secret}
//           onChange={(event) => {
//             setSecret(event.target.value);
//           }}
//         />
//         <hr />
//         <Buttons
//           onSubmit={handleSubmit}
//           title="문제 작성하기"
//           onClick={() => {
//             navigate("/");
//           }}
//         />
//         <input value={content}></input>
//       </Container>
//     </Wrapper>
//   );
// }

// export default PostWritePage1;
