import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '/Users/cmj/Desktop/Workspace/OSS/sentinews_v0.2/src/firebase-config.js'; // 상대 경로로 수정
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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
    top: 0;
    position: fixed;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // 회원가입 모드 상태
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Mainheader>
        <HeaderLeft onClick={() => navigate('/')}>
          <h2>MyApp</h2>
        </HeaderLeft>
      </Mainheader>
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <h1>{isSignup ? '회원가입' : '로그인'}</h1>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="input__block">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
            />
          </div>
          <div className="input__block">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>
          <button type="submit">{isSignup ? '회원가입' : '로그인'}</button>
        </form>
        <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: '20px' }}>
          {isSignup ? '로그인으로 전환' : '회원가입으로 전환'}
        </button>
      </div>
    </>
  );
};

export default LoginPage;
