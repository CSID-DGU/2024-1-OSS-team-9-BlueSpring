// src/components/Menu.jsx

import styled, { css } from 'styled-components';
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
  padding: 0 20px; // 패딩을 좌우로 조금 줄입니다.
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
  margin-right: 10px; // 오른쪽 여백을 추가하여 내용이 잘리지 않도록 조정합니다.
`;

const SearchInput = styled.input`
  background-color: grey;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  margin-right: 10px;
`;

const categories = [
  { name: 'all', text: '전체보기' },
  { name: 'business', text: '비즈니스' },
  { name: 'entertainment', text: '연예' },
  { name: 'health', text: '건강' },
  { name: 'science', text: '과학' },
  { name: 'sports', text: '스포츠' },
  { name: 'technology', text: '기술' },
];

// 미디어 쿼리를 사용하여 화면 크기가 작을 때 스타일을 조정합니다.
const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: auto; // 너비를 자동으로 조정하게 설정합니다.
  flex-wrap: wrap; // 필요시 내용을 다음 줄로 넘깁니다.

  @media (max-width: 768px) {
    justify-content: space-around; // 모바일 화면에서는 각 카테고리가 공간을 균등하게 차지하도록 합니다.
  }
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
  padding: 8px 16px; // 버튼의 크기를 조금 더 크게 조정하여 클릭하기 쉽게 합니다.
  cursor: pointer;
  white-space: nowrap; // 텍스트가 줄바꿈 되지 않도록 설정합니다.
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #495057;
    transition: all 0.2s ease-in-out;
  }
`;

const Menu = ({ onSelect, category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleTitleClick = () => {
    onSelect('all');
    navigate('/');
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
        {currentUser ? (
          <UserButton onClick={() => navigate('/mypage')}>마이페이지</UserButton>
        ) : (
          <UserButton onClick={() => navigate('/login')}>로그인</UserButton>
        )}
      </HeaderRight>
    </Mainheader>
  );
};

export default Menu;
