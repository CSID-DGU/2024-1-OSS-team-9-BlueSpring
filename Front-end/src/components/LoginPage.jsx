import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { isLoggedIn, setIsLoggedIn, userId, setUserId, userPw, setUserPw, userDepartment, setUserDepartment } = useAuth();

  const handleTabClick = (tab) => {
    setIsSignup(tab === 'signup');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const fetchUserProfile = useCallback(async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/mypage/${userId}`);
    const data = await response.json();
    return data;
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const id = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`,
    });

    if (response.ok) {
      const data = await response.text();
      localStorage.setItem('token', data);
      setIsLoggedIn(true);
      setUserId(id);
      setUserPw(password);
      const user = await fetchUserProfile(id);
      setUserDepartment(user.major); // 사용자의 학과 정보를 상태 변수에 저장

      navigate('/');
    } else {
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
        alert('회원가입이 완료되었습니다.');
        setIsSignup(false);
      } else {
        alert('아이디가 이미 존재하여 회원가입에 실패했습니다.');
      }
    } catch (error) {
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
            <input type="text" name="id" placeholder="아이디" />
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
