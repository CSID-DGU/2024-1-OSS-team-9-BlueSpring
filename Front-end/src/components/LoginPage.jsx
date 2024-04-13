import React, { useState } from 'react';
import "../style.css";


const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleTabClick = (tab) => {
    setIsSignup(tab === 'signup');
  };


  return (
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
          <input type="email" placeholder="Email" />
        </div>
        <div className="input__block">
          <input type="password" placeholder="Password" />
        </div>
        {isSignup && (
          <div className="input__block">
            <input type="password" placeholder="Repeat password" />
          </div>
        )}
        <button className="signin__btn">
          {isSignup ? '회원가입' : '로그인'}
        </button>
      </form>
      <div className="separator">
        <p>OR</p>
      </div>
      <button className="google__btn">
        Sign in with Google
      </button>
      <button className="naver__btn">
        Sign in with Naver
      </button>
    </div>
  );
};

export default LoginPage;