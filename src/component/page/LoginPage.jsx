import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";

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
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  const [tokenUserId, setTokenUserId] = useState();

  async function postUsreInfo() {
    await axios
      .post(`/login`, {
        loginId: userId,
        loginPw: userPw,
      })
      .then((response) => {
        // setUser(response.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem(
          "expirationTime",
          String(response.data.tokenExpiresIn)
        );

        checkLogin();

        console.log(response);
      })
      .catch((error) => {
        Alert.alert("회원가입 실패", [
          { text: "확인", onPress: () => console.log("alert closed") },
        ]);
        // 여기다가 로그인 실패 알림 띄워줘.
        console.log(error);
      });
  }

  async function checkLogin() {
    // 로그인 상태 여부 확인하고 해당 사용자의 userId 반환
    await axios
      .get("/auth")
      .then((response) => {
        setTokenUserId(response.data.id);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    // <- input값으로 text 변경 함수
    this.setState({
      text: e.target.value,
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime") || "0";

    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      const remainingTime = storedExpirationDate - String(new Date().getTime());
      if (remainingTime <= "1000") {
        // 토큰 잔여만료시간이 1초 이하라면
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");

        navigate("/login");
      }

      checkLogin();
      if (tokenUserId) {
        navigate("/categories");
        // 로그인페이지 또는 회원가입페이지 접속시 이미 로그인이 되어있는 상태이면,
        // 기본홈페이지인 카테고리목록 페이지로 리다이렉트 시킴.
      }
    }
  }, [tokenUserId]);

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
