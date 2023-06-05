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
import PostWritePage1 from './component/page/PostWritePage1';
import PostWritePage2 from './component/page/PostWritePage2';
import PostWritePage3 from './component/page/PostWritePage3';
import PostViewPage from './component/page/PostViewPage';
import PostViewPage2 from "./component/page/PostViewPage2";
import CommentPage from "./component/page/CommentPage";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainTitleText = styled(NavLink)`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: block;
`;

function App(props) {
  const baseUrl = "http://localhost:8000";
  const categories = "categories";
  const problem = "problem";

  const [title, setTitle] = useState();
  const [post, setPost] = useState();
  const [category, setCategory] = useState();
  const [postNumber, setPostNumber] = useState();
  
  // spring과 통신하는 부분
  useEffect(() => {
    getPost();
  }, []);

  return (
      <BrowserRouter>
        <MainTitleText to="/">문제만들기 사이트</MainTitleText>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="categories" element={<MainPage />} />
          <Route path="categories/:mainId/problems" element={<PostPage />} />
          <Route path="post-write1/:writeId" element={<PostWritePage1 />} />
          <Route path="post-write2/:writeId" element={<PostWritePage2 />} />
          <Route path="post-write3/:writeId" element={<PostWritePage3 />} />
          <Route path="problems/:problemId" element={<PostViewPage />} />
          <Route path="problems2/:problemId" element={<PostViewPage2 />} />
          <Route path="/comments/:commentId" element = {<CommentPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
