import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from "./component/page/MainPage";
import PostPage from "./component/page/PostPage";
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    return (
        <BrowserRouter>
            <MainTitleText>문제만들기 사이트</MainTitleText>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="main/:mainId" element={<PostPage />} />
                <Route path="post-write/:writeId" element={<PostWritePage />} />
                <Route path="post/:problemId" element={<PostViewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
