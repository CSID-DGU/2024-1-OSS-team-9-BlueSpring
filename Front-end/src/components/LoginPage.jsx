import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import "../style.css";

const Mainheader = styled.div`
    background-color: #13264e;
    width: 100%;
    height: 60px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    top:0;
    position: fixed;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setIsSignup(tab === 'signup');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <>
    <Mainheader>
        <HeaderLeft onClick={handleTitleClick}>
            <h2>BlueSpring</h2>
        </HeaderLeft>
    </Mainheader>
    <div className="container">
      <h1>{isSignup ? '회원가입' : '로그인'}</h1>
      
      <ul className="links">
        <li
          className={!isSignup ? 'active' : ''}
          onClick={() => handleTabClick('signin')}
        >
          로그인
        </li>
        <li
          className={isSignup ? 'active' : ''}
          onClick={() => handleTabClick('signup')}
        >
          회원가입
        </li>
      </ul>

      <form action="https://www.naver.com" method="post">
        <div className="input__block">
          <input type="email" placeholder="이메일" />
        </div>
        <div className="input__block">
          <input type="password" placeholder="비밀번호" />
        </div>
        {isSignup && (
          <div className="input__block">
            <input type="text" placeholder="학과" />
          </div>
        )}
        <button className="signin__btn">
          {isSignup ? '회원가입' : '로그인'}
        </button>
      </form>
    </div>
    </>
  );
};

export default LoginPage;