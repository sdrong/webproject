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
    display: flex;
    flex-wrap: wrap;
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
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
    const [answer, setAnswer] = useState(""); //text area의 anwser 가져오는거
    const str = post.content; //글을 가져오고
    const regex = /\$%&123/g;  //파싱을 조건
    const result = str.split(regex); // 컨텐츠 분할
    const anw = result[1]; // 답 저장
    const [resultText, setResultText] = useState("");  //정답유무
    const handleAnswerSubmit = () => {
        if (answer === anw) {
          setResultText("정답입니다!");
        } else {
          setResultText("틀렸습니다.");
        }
      };
      const [showAnswer, setShowAnswer] = useState(false); 
    const Result = styled.h4`
    margin: 16px 0;
    font-size: 20px;
    `;
    const [buttonTitle, setButtonTitle] = useState("정답 보기");
const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    setButtonTitle(showAnswer ? "정답 보기" : "정답 숨기기");
};
    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate(`/categories/${post.category.id}/problems`);
                    }}
                />
                <TitleText>{post.title}</TitleText>
                <PostContainer>
                    <ContentText>{result[0]}</ContentText>
                    <TextInput
                    height={40}
                    value={answer}
                    onChange={(event) => {
                    setAnswer(event.target.value);
                 }}
                />
                <ContentText>{result[2]}</ContentText>
                </PostContainer>
                <AnswerList>answers = {post.answers}</AnswerList>
                <hr></hr>
                <Button title="정답 제출" onClick={handleAnswerSubmit} />
                <h4>result: {resultText}</h4>
                
                <Button title={buttonTitle} onClick={toggleShowAnswer} />
                {showAnswer && <Result>정답은 {anw} 입니다!</Result>}
                
                </Container>
        </Wrapper>
    );
}

export default PostViewPage;