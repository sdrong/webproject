import React, {useState, useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from "./component/page/MainPage";
import PostPage from "./component/page/PostPage";
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import axios from 'axios';

const MainTitleText = styled(NavLink)`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: block;
`;

function App(props) {
    const baseUrl = "http://localhost:3000";
  const categories = "categories";
  const problem = "problem";

  const [title, setTitle] = useState();
  const [post, setPost] = useState();
  const [category, setCategory] = useState();

  // spring과 통신하는 부분
  useEffect(() => {
    getPost();
  }, []);

  async function getPost(){
    await axios
      .get(baseUrl)
      .then((response) => {
        // 카테고리 들어가는 요청
        axios
          .get(baseUrl + "/" + categories)
          .then((response) => {
            setCategory(response.data);
            // 카테고리에 들어가서 글 목록 보는 요청
            axios
              .get(baseUrl + "/" + category.title)
              .then((response) => {
                setPost(response.data);
              })
          })
      })
      .catch((error)=>{
          console.log(error);
      })
  }
    return (
        <BrowserRouter>
            <MainTitleText to="/">문제만들기 사이트</MainTitleText>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="categories" element={<MainPage />} />
                <Route path="categories/:mainId/problems" element={<PostPage />} />
                <Route path="post-write/:writeId" element={<PostWritePage />} />
                <Route path="problems/:problemId" element={<PostViewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
