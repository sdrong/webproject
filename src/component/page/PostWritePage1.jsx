import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Editor from "../ui/Editor";

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
    border: 1px solid #D6D6D6;
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


function PostWritePage1(props) {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");//답
    const [text,setText] = useState("") //문제내용
    const { writeId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
    const [title, setTitle] = useState(""); // 제목
    const [secret, setSecret] = useState(""); //비밀번호
    const str = text; //글을 가져오고
    const result = str.split("???"); // 컨텐츠 분할
    const content = result[0]+"$%&123"+answer+"$%&123"+result[1];// 문제내용과 답을 파싱하기위해 합쳐놓은 전체
    return (
        <Wrapper>
            <Container>
                <h2>문제 제목(주관식)</h2>
                <TitleInput
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <h2>문제내용</h2>
                <Mkproblem
                    placeholder="문제내용???문제내용 과 같은 형식으로 정답부분을???로 표기하여 주세요"
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
                <h3>비밀번호</h3>
                <SecretInput
                    height={40}
                    value={secret}
                    onChange={(event) => {
                    setSecret(event.target.value);
                }}
                />
                <hr/>
                <Button
                    title="문제 작성하기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <input value={content}></input>
            </Container>
        </Wrapper>
    );
}

export default PostWritePage1;
