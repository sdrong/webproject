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
    width: 70%;
`;
const SecretInput = styled.input`
    width: 200px;
    height: 50px;
`;

function PostWritePage2(props) {
    const navigate = useNavigate();

    const { writeId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [secret, setSecret] = useState(""); //비밀번호
    const [text,setText] = useState("");
    const [answer, setAnswer] = useState("");//답
    return (
        <Wrapper>
            <Container>
                <h2>문제 제목</h2>
                <TitleInput
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <h2>문제내용</h2>
                <Mkproblem
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
            </Container>
        </Wrapper>
    );
}

export default PostWritePage2;
