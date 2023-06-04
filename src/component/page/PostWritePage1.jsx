import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Buttons from "../ui/Buttons";
// import Editor from "../ui/Editor";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

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
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  .editor {
    height: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
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
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(""); //답
  const [text, setText] = useState(""); //문제내용
  const { categoryId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
  const [title, setTitle] = useState(""); // 제목
  const [secret, setSecret] = useState(""); //비밀번호
  const [categoryName, setCategoryName] = useState(); //카테고리 이름
  const str = editorToHtml; //글을 가져오고
  const result = str.split("???"); // 컨텐츠 분할
  const content = result[0] + "$%&123" + answer + "$%&123" + result[1]; // 문제내용과 답을 파싱하기위해 합쳐놓은 전체
  const baseUrl = "http://localhost:3000";
  const categories = "categories";
  const problem = "problem";

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefalut();

    await axios
      .post("/categories/" + { categoryId } + "/problems", {
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

  const getCategoryNumber = (categoryName) => {
    if (categoryName == "운영체제") return 1;
    else return 2;
  };

  return (
    <Wrapper>
      <MyBlock>
        <Buttons
          title="뒤로 가기"
          onClick={() => {
            navigate(`/categories/`);
          }}
        />
        <BottomMargin />
        <Editor
          // 에디터와 툴바 모두에 적용되는 클래스
          wrapperClassName="wrapper-class"
          // 에디터 주변에 적용된 클래스
          editorClassName="editor"
          // 툴바 주위에 적용된 클래스
          toolbarClassName="toolbar-class"
          // 툴바 설정
          toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder="정답부분을???로 표기하여 주세요 ex) 2002년 월드컵의 마스코트는 ???이다."
          // 한국어 설정
          localization={{
            locale: "ko",
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
        />
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
