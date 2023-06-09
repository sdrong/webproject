import React, { useState } from "react";
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
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const navigate = useNavigate();

  const { writeId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
  console.log(writeId);
  const problemIdInt = parseInt(writeId, 10);

  // const pp = data.find((item) => {
  //   //쓸 데이터id 찾기
  //   return item.id === problemIdInt;
  // });
  // const st = pp.content; //글을 가져오고
  const regex = /\$%&123/g; //파싱을 조건
  // const results = st.split(regex); // 컨텐츠 분할

  const [answer, setAnswer] = useState(""); //답
  const [text, setText] = useState(""); //문제내용
  const [title, setTitle] = useState(""); // 제목
  const [secret, setSecret] = useState(""); //비밀번호
  const str = editorToHtml; //글을 가져오고
  const result = str.split("???"); // 컨텐츠 분할
  const content = result[0] + "$%&123" + answer + "$%&123" + result[1]; // 문제내용과 답을 파싱하기위해 합쳐놓은 전체
  // const baseUrl = "http://localhost:3000";
  const categories = "categories";
  const problem = "problem";

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  //카테고리 데이터
  const [categoryData, setCategoryData] = useState();

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
        content: content,
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
          onSubmit={handleSubmit}
          title="문제 작성하기"
          onClick={() => {
            saveProblem();
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
