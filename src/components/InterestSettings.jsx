import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const InterestSettings = () => {
  const {userId, setUserId} = useAuth();
  //로그인된 사람의 아이디를 가져옴, 이후 SQL문에서 관심사 정보를 가져올 때 사용 가능

  const [interests, setInterests] = useState([
    { id: 1, name: '정치', selected: false },
    { id: 2, name: '경제', selected: false },
    { id: 3, name: '사회', selected: false },
    { id: 4, name: '생활/문화', selected: false },
    { id: 5, name: '세계', selected: false },
    { id: 6, name: 'IT/과학', selected: false },
    { id: 7, name: '연예', selected: false },
    { id: 8, name: '스포츠', selected: false },
  ]);

  const handleInterestChange = (id) => {
    setInterests(
      interests.map((interest) =>
        interest.id === id
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedInterests = interests.filter(interest => interest.selected);
    console.log(selectedInterests);
    //기본 관심사 관리 버튼 클릭 시 로직 추가
  };

  return (
    <Container>
      <Title>내 관심사</Title>
      <form action= "www.naver.com" onSubmit={handleSubmit}>
        <InterestList>
          {interests.map((interest) => (
            <InterestItem
              key={interest.id}
              selected={interest.selected}
              onClick={() => handleInterestChange(interest.id)}
            >
              <input
                type="checkbox"
                id={`interest-${interest.id}`}
                checked={interest.selected}
                onChange={() => handleInterestChange(interest.id)}
                style={{ display: 'none' }}
              />
              <label htmlFor={`interest-${interest.id}`}>
                {interest.name}
                
              </label>
            </InterestItem>
          ))}
        </InterestList>
        <br/>
        <ManageButton type="submit">기본 관심사 관리</ManageButton>
      </form>
    </Container>
  );
};

export default InterestSettings;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InterestList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const InterestItem = styled.div`
  background-color: ${(props) =>
    props.selected ? '#007bff' : '#f2f2f2'};
  color: ${(props) => (props.selected ? 'white' : 'inherit')};
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckIcon = styled.span`
  font-size: 16px;
`;

const ManageButton = styled.button`
  background-color: #13264e;
  margin-top: 20px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
`;
