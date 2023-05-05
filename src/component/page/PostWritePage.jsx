import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

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

const Mkproblem = styled.div`
    padding: 16px 24px;
    border: 1px solid #D6D6D6;
    border-radius: 4px;
`;


function PostWritePage(props) {
    const navigate = useNavigate();

    const { writeId } = useParams(); //저장할때 어느 과목에 저장할지 id받아옴
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <Wrapper>
            <Container>
                <h2>문제 제목</h2>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <Mkproblem>
                    <Mkproblem contenteditable="true"/>
                    <input></input>
                    <Mkproblem contenteditable="true"/>
                </Mkproblem>
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

export default PostWritePage;
