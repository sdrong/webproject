import React from "react";
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

const MainTitleText = styled(NavLink)`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: block;
`;

function App(props) {
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
