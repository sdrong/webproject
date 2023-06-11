import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";

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
  const { post, handleClick } = props;
  const str = post.content;
  const regex = /\$%&123/g;
  const result = str.split(regex); //
  const [good, setGood] = useState(post.recommendCount);
  const userid = 2;
  const isRecommended = post.recommendUsers.includes(userid);
  const handleGoodClick = (e) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파 방지
    if (!isRecommended) {
      setGood(good + 1);
      // 백엔드 업데이트 또는 추천으로 표시하는 요청 전송
      // 예: sendRecommendation(commentId);
    }
  };
  return (
    <Card bg="gray" text="black" className="mb-2">
      <Card.Header onClick={(e) => e.stopPropagation()}>
        <h4>
          <span
            onClick={handleGoodClick}
            style={{ cursor: isRecommended ? "not-allowed" : "pointer" }}
          >
            👍
          </span>
          {good}
        </h4>
      </Card.Header>
      <Card.Body onClick={handleClick}>
        <Card.Text>{post.title}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostListItem;
