import React, { useState, useEffect, useCallback } from 'react';
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
  const { userId, userPw, userDepartment, setUserDepartment } = useAuth();

  const [inputPassword, setInputPassword] = useState('');
  const [inputDepartment, setInputDepartment] = useState(userDepartment);

  const [user, setUser] = useState(null);

  const fetchUserProfile = useCallback(async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/mypage/${userId}`);
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserProfile(userId);
      setUser(user);
      setUserDepartment(user.major);
    };
    fetchUser();
  }, [userId, fetchUserProfile]);

  /*(userId) => {
return fetch(`http://localhost:8080/api/users/mypage/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // 파싱된 JSON 객체가 반환
    })
    .then(user => {
      setUser(user);
      setUserDepartment(user.major);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
    */


  /* 컴포넌트가 마운트될 때 사용자 정보를 가져옴
  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId, fetchUserProfile]);
*/
  const handleEditProfile = () => {
    //수정한 비밀번호가 일치하지 않으면 무시
    if (!user) {
      alert('사용자 정보를 불러오는 데 실패했습니다.');
      return;
    }
    if (inputPassword !== userPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 수정된 사용자 정보를 서버에 전송
    fetch(`http://localhost:8080/api/users/mypage/update/${user.userId}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: inputPassword,
        major: inputDepartment,
        // 기타 필요한 필드
      }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(updatedUser => {
          // 서버에서 반환된 업데이트된 사용자 정보를 state에 저장
          setUser(updatedUser);
          setUserDepartment(inputDepartment);
        })
        .catch(error => {
          console.error('Error updating user data:', error);
        });
    /*setUserDepartment(inputDepartment);
    console.log('아이디:', userId);
    console.log('비밀번호:', userPw);
    console.log('학과:', userDepartment);
    */
    
    alert('수정되었습니다.');
    //수정하기 버튼 클릭 시 DB에 반영하는 로직 추가해야함
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
              <span><Label>아이디:</Label> {userId}</span>
              <span><Label>비밀번호:</Label> <Input type="password" onChange={(e) => setInputPassword(e.target.value)} /></span>
              <span><Label>학과:</Label> <Input type="text" value={inputDepartment} onChange={(e) => setInputDepartment(e.target.value)} /></span>
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
