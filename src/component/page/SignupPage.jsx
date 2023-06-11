import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";

function SignupPage() {
  /*
      - 명칭 signUp
      - url: '/signUp'
      - url 예시: 'http://localhost:8080/signup'
      - method: POST
      - 내용: 회원가입
      - 토큰 담긴 헤더 필수 유무: X
  
      - 입력해야할 json 예시:
      {
          "loginId": "테스트아디3",
          "loginPw": "테스트비번3",
          "username": "테스트이름3"
      }
  
      - 반환되는 json 예시:
      {
          "id": 3,
          "loginId": "테스트아디3",
          "username": "테스트이름3",
          "solvableCount": 5
      }
    */
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [username, setUsername] = useState();

  const [tokenUserId, setTokenUserId] = useState();

  async function postSignUp() {
    await axios
      .post("/signup", {
        loginId: userId,
        loginPw: userPw,
        username: username,
      })
      .then((response) => {
        Alert.alert("회원가입 성공", " 로그인 페이지로 이동합니다.", [
          { text: "확인", onPress: () => console.log("alert closed") },
        ]);
        // 여기다가 회원가입 성공 알림 띄워주고 로그인 페이지로 이동 시킨다고 명시해서 알려줘.
        navigate("/login");
        console.log(response);
      })
      .catch((error) => {
        Alert.alert("회원가입 실패", [
          { text: "확인", onPress: () => console.log("alert closed") },
        ]);
        // 여기다가 회원가입 실패 알림 띄워줘.
        // 그 이유는 예시로 해당 아이디의 계정이 이미 존재한다거나 하는 에러 등등 다 만들어놔서 에러 반환되면 회원가입 실패임. 다른거 입력해야함.
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
          onChange={() => {
            setUserId();
          }}
          id="userId"
          type="text"
          class="form-control"
          placeholder="id"
          aria-label="id"
        />
      </div>
      <div class="col">
        <input
          onChange={() => {
            setUserPw();
          }}
          id="userPassword"
          type="text"
          class="form-control"
          placeholder="password"
          aria-label="password"
        />
      </div>
      <div class="col">
        <input
          onChange={() => {
            setUsername();
          }}
          id="username"
          type="text"
          class="form-control"
          placeholder="username"
          aria-label="username"
        />
      </div>
      <button
        type="button"
        class="btn btn-info"
        onClick={() => {
          postSignUp();
          navigate(-1);
        }}
      >
        회원가입
      </button>
    </div>
  );
}

export default SignupPage;
