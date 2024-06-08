import styled, { css } from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Mainheader = styled.div`
    background-color: #13264e;
    width: 100%;
    height: 60px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    top: 0;
    position: fixed;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    background-color: grey;
    padding: 5px 10px;
    border-radius: 3px;
    border: none;
    margin-right: 10px;
`;

const categories = [
    {
        name: 'all',
        text: '전체보기',
    },
    {
        name: 'politics',
        text: '정치',
    },
    {
        name: 'economy',
        text: '경제',
    },
    {
        name: 'society',
        text: '사회',
    },
    {
        name: 'lifeculture',
        text: '생활/문화',
    },
    {
        name: 'world',
        text: '세계',
    },
    {
        name: 'itScience',
        text: 'IT/과학',
    },
    {
        name: 'entertainment',
        text: '연예',
    },
    {
        name: 'sports',
        text: '스포츠',
    },
];

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 1100px;
`;

const Category = styled.div`
    font-size: 1rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        background-color: #495057;
        transition: 0.2s linear;
    }

    ${(props) =>
        props.activate &&
        css`
            font-weight: 600;
            border-bottom: 2px solid white;
            color: #22b8cf;
            &:hover {
                color: #3c9db;
            }
        `}
    & + & {
        margin-left: 1rem;
    }
`;

const UserButton = styled.div`
    font-size: 1rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;
    :hover {
        background-color: #495057;
        transition: 0.2s linear;
    }
`;

const Menu = ({ onSelect, category }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleTitleClick = () => {
        onSelect('all');
        navigate('/');
    };

    const handleMypageClick = () => {
        navigate('/mypage');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/searchresultpage?query=${searchQuery}`);
        }
    };

    return (
        <Mainheader>
            <HeaderLeft onClick={handleTitleClick}>
                <h2>SentiNews</h2>
            </HeaderLeft>
            <CategoriesBlock>
                {categories.map((c) => (
                    <Category
                        key={c.name}
                        activate={category === c.name}
                        onClick={() => {
                            onSelect(c.name);
                            navigate('/');
                        }}
                    >
                        {c.text}
                    </Category>
                ))}
            </CategoriesBlock>
            <HeaderRight>
                <SearchInput
                    type="text"
                    placeholder="검색"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeyPress}
                />
                {isLoggedIn ? (
                    <UserButton onClick={handleMypageClick}>마이페이지</UserButton>
                ) : (
                    <UserButton onClick={handleLoginClick}>로그인</UserButton>
                )}
            </HeaderRight>
        </Mainheader>
    );
};

export default Menu;
