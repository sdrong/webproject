import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;
const SomeContent = styled.p`
    font-size: 13px;np
    font-weight: 300;
`;

function PostListItem(props) {
    const { post, onClick } = props;
    const str = post.content;
    const regex = /\$%&/g;
    const result = str.split(regex); // 
    return (
        <Wrapper onClick={onClick}>
            <TitleText>{post.title}</TitleText>
            <SomeContent>{result[0]+"???"+result[2]}</SomeContent>
        </Wrapper>
    );
}

export default PostListItem;
