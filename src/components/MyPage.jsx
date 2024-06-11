import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InterestSettings from './InterestSettings';
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
    top:0;
    position: fixed;
`;


const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.h3`
  margin: 0 10px;
  cursor: pointer;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const EditButton = styled.button`
  background-color: #13264e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
`;

const ArticleItem = styled.div`
  margin-bottom: 10px;
`;

const ArticleDate = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const MoreButton = styled.button`
  background-color: #13264e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
`;

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const { userId } = useAuth();
  //로그인 시 ID는 userID에 저장됨, DB에서 SQL문을 이용해 비밀번호, 학과, 관심사를 가져오고 useState에 넣으면 됨.

  const [id, setId] = useState(userId);
  const [password, setPassword] = useState('12345678');
  const [confirmPassword, setConfirmPassword] = useState('12345678');
  const [department, setDepartment] = useState('컴퓨터공학전공');
  //DB에서 가져온 아이디, 비번, 학과를 useState의 따옴표 사이에 삽입

  const handleEditProfile = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    //수정한 비밀번호가 일치하지 않으면 무시

    console.log('아이디:', id);
    console.log('비밀번호:', password);
    console.log('학과:', department);
    //수정하기 버튼 클릭 시 로직 추가
  };

  const recentArticles = [
    {
      title: '미·일·필리핀 정상회담 "모든 남중국해 상호방위조약 적용"... 미, 이란 공격 우려 이스라엘 내 직원 여행 제한 - 한국어 방송 - VOA Korean',
      date: '2024.04.13'
    },
    {
      title: '\'채상병 사건 키맨\' 해병사령관 "말 못할 고뇌 가득" - KBC광주방송',
      date: '2024.04.12'
    },
    {
      title: '황선홍호, 도하 첫 적응훈련…"10회 연속 올림픽 진출권 꼭 따겠다" [9시 뉴스] / KBS 2024.04.12. - KBS News',
      date: '2024.04.12'
    }
  ];

  const navigate = useNavigate();
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
      <Container>
        <Title>마이페이지</Title>
        <TabContainer>
          <Tab
            isSelected={selectedTab === 'profile'}
            onClick={() => setSelectedTab('profile')}
          >
            개인 정보
          </Tab>
          <Tab
            isSelected={selectedTab === 'articles'}
            onClick={() => setSelectedTab('articles')}
          >
            최근에 읽은 기사
          </Tab>
        </TabContainer>
        {selectedTab === 'profile' && (
          <>
          <Box>
            <h2 style={{ fontSize: '24px' }}>프로필</h2>
            <ProfileInfo>
              <span><Label>아이디:</Label> {id}</span>
              <span><Label>비밀번호:</Label> <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></span>
              <span><Label>비밀번호 확인:</Label> <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></span>
              <span><Label>학과:</Label> <Input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} /></span>
            </ProfileInfo>
            <EditButton onClick={handleEditProfile}>수정하기</EditButton>
          </Box>
          <Box>
            <InterestSettings/>
          </Box>
          </>
        )}
        {selectedTab === 'articles' && (
          <Box>
            <h2 style={{ fontSize: '24px' }}>최근 읽은 기사</h2>
            {recentArticles.map((article, index) => (
              <ArticleItem key={index}>
                <h3 dangerouslySetInnerHTML={{ __html: article.title }}></h3>
                <ArticleDate>발행 날짜: {article.date}</ArticleDate>
                {index < recentArticles.length - 1 && <hr />}
              </ArticleItem>
            ))}
            <MoreButton>기사 더보기</MoreButton>
          </Box>
        )}
      </Container>
    </>
  );
};

export default MyPage;
