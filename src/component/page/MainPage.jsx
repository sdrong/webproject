import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MainList from "../list/MainList";
import categoryData from "../../categoryData.json"
import Button from "../ui/Button";
import { Category } from "@mui/icons-material";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function MainPage(props) {
    const { postId } = useParams();
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Container>
                <MainList
                    posts={categoryData}
                    onClickItem={(item) => {
                        navigate(`/main/${item.id}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;
