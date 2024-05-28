
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabClick = (tab) => {
    setIsSignup(tab === 'signup');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const id = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: `id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`,
    });


    if (response.ok) {

      //const { token } = await response.json();

      const data = await response.text();
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', data);
      // 로그인 상태를 업데이트
      setIsLoggedIn(true);
      // 로그인 성공 후 리다이렉트 -> 마이페이지가 보이는 메인화면
      //navigate('');
    } else {
      // 에러 처리
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const id = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    const major = event.target.elements[2].value;

    try {
    const response = await fetch(`http://localhost:8080/api/users/resister?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}&major=${encodeURIComponent(major)}`, {
      method: 'POST',
    });

    if (response.ok) {
      // Handle successful signup...
      alert('회원가입이 완료되었습니다.');
      setIsSignup(false);  // Switch to login tab
    } else {
      // Handle error...
      alert('아이디가 이미 존재하여 회원가입에 실패했습니다.');
    }
    } catch (error) {
      // 네트워크 에러 처리...
      alert('네트워크 에러가 발생했습니다.');
    }

  };

  return (
    <>
    <Mainheader>
        <HeaderLeft onClick={handleTitleClick}>
            <h2>SentiNews</h2>
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

      <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}>
        <div className="input__block">
          <input type="email" name="id" placeholder="이메일" />
        </div>
        <div className="input__block">
          <input type="password" name="password" placeholder="비밀번호" />
        </div>
        {isSignup && (
          <div className="input__block">
            <input type="text" name="major" placeholder="학과" />
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
/*

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
            <h2>SentiNews</h2>
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

          <form action={isSignup ? "http://localhost:8080/api/users/resister" : "http://localhost:8080/api/users/login"} method="post">
            <div className="input__block">
              <input type="email" name="id" placeholder="이메일" />
            </div>
            <div className="input__block">
              <input type="password" name="password" placeholder="비밀번호" />
            </div>
            {isSignup && (
                <div className="input__block">
                  <input type="text" name="major" placeholder="학과" />
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
*/
