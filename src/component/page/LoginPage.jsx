import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function LoginPage() {
  // - url: '/login'
  // - url 예시: 'http://localhost:8080/login'
  // - method: POST
  // - 내용: 로그인
  // - 토큰 담긴 헤더 필수 유무: X

  // - 입력해야할 json 예시:
  // {
  //     "loginId": "테스트아디3",
  //     "loginPw": "테스트비번3"
  // }

  // - 반환되는 json 예시:
  // {
  //     "grantType": "bearer",
  //     "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4NTU0ODQzNH0.9Mj34eGkpM-xMYzLi74wMRZ_mQfMCWkThzWGKhIRoigYxGASE3FbwgWwPlJOHxR8XeYYeB-R_zsb1dB3vKwzvw",
  //     "tokenExpiresIn": 1685548434981
  // }

  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  async function postUsreInfo() {
    await axios
      .post(`http://localhost:8080/login`, {
        loginId: userId,
        loginPw: userPw,
      })
      .then((response) => {
        // setUser(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    // <- input값으로 text 변경 함수
    this.setState({
      text: e.target.value,
    });
  };

  return (
    <div class="row">
      <div class="col">
        <input
          onChange={this.handleChange}
          id="userId"
          type="text"
          class="form-control"
          placeholder="id"
          aria-label="id"
        />
      </div>
      <div class="col">
        <input
          onChange={this.handleChange}
          id="userPw"
          type="text"
          class="form-control"
          placeholder="password"
          aria-label="password"
        />
      </div>
      <button type="button" class="btn btn-info" onClick={postUsreInfo()}>
        제출
      </button>
    </div>
  );
}

export default LoginPage;
