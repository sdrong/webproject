import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json";
import AnswerList from "../list/AnswerList";

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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { problemId } = useParams(); //데이터 받는거
    console.log(problemId);
    const problemIdInt = parseInt(problemId, 10);
    const post = data.find((item) => { //쓸 데이터id 찾기
        return item.id === problemIdInt;
      });
    const [answer, setAnswer] = useState("");
    const str = post.content;
    const regex = /\$%&/g;
    const result = str.split(regex); // 컨텐츠 분할
    const anw = result[1]; // 답 저장
    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate(`/main/${post.category.id}`);
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{result[0]+"???"+result[2]}</ContentText>
                </PostContainer>
                <CommentLabel>정답 맞춰보기</CommentLabel>
                <AnswerList>answers = {post.answers}</AnswerList>

                <TextInput
                    height={40}
                    value={answer}
                    onChange={(event) => {
                    setAnswer(event.target.value);
                }}
                />

                <Button
                title="정답 제출"
                onClick={() => {
                navigate("/");
                }}
                />
                <h4>result:</h4> 
                
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
