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
import PostViewPage3 from "./component/page/PostViewPage3";
import CommentPage from "./component/page/CommentPage";
import Update_CommentPage from "./component/page/Upadata_CommentPage";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import LoginPage from "./component/page/LoginPage";
import SignupPage from "./component/page/SignupPage";

const MainTitleBox = styled.div`
    background-color: limegreen;
    padding: 10px;
`;

const MainTitleText = styled(NavLink)`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: block;
    color: white;
`;

const CustomTitleText = styled(MainTitleText)`
    font-size: 30px;
    color: blue;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f1f1;
  }
`;

function App(props) {
  // const baseUrl = "http://localhost:3000";
  // const categories = "categories";
  // const problem = "problem";

  // const [title, setTitle] = useState();
  // const [post, setPost] = useState();
  // const [category, setCategory] = useState();
  // const [postNumber, setPostNumber] = useState();
  
  // // // spring과 통신하는 부분

  return (
    
      <BrowserRouter>
      <MainTitleBox>
        <MainTitleText to="/">문제만들기 사이트</MainTitleText>
      </MainTitleBox>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/categories" element={<MainPage />} />
        <Route path="/categories/:mainId/problems" element={<PostPage />} />
        <Route path="/post-write1/:writeId" element={<PostWritePage1 />} />
        <Route path="/post-write2/:writeId" element={<PostWritePage2 />} />
        <Route path="/post-write3/:writeId" element={<PostWritePage3 />} />
        <Route path="/problems/:problemId" element={<PostViewPage />} />
        <Route path="/problems2/:problemId" element={<PostViewPage2 />} />
        <Route path="/problems3/:problemId" element={<PostViewPage3 />} />
        <Route path="/problems/:problemId/comments" element={<CommentPage />} />
        <Route path="/comments/:commentId" element = {<Update_CommentPage/>}/>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/signup" element = {<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
      );
}

export default App;
