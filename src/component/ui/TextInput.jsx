import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  padding: 0px;
  font-size: 16px;
  line-height: 15px;
  box-sizing: border-box;
`;

function TextInput(props) {
  const { height, value, onChange } = props;
  const [width, setWidth] = useState('100');
  
  const handleWidthChange = (event) => {
    const length = event.target.value.length;
    // 최대 넓이 값 설정
    const maxWidth = 400;
    // 글자 수에 따라 넓이 계산
    const calculatedWidth = 40 + length * 13;
    // 최대 넓이보다 크면 최대 넓이로 설정
    const newWidth = calculatedWidth > maxWidth ? maxWidth : calculatedWidth;
    setWidth(newWidth);
  };
  
  return (
    <StyledInput
      width={width}
      height={height}
      value={value}
      onChange={(event) => {
        handleWidthChange(event);
        onChange(event);
      }}
    />
  );
}

export default TextInput;
