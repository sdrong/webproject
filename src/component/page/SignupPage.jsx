import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [username, setUsername] = useState();

  async function postSignUp() {
    await axios
      .post("/signup", {
        loginId: userId,
        loginPw: userPw,
        username: username,
      })
      .then((response) => {
        console.log(response.data);
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
          id="userPassword"
          type="text"
          class="form-control"
          placeholder="password"
          aria-label="password"
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
