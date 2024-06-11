import React from 'react';
import styled from 'styled-components';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 20px 5px 20px;
`;

const RankingTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RankingItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 18px;
`;

const RankingNumber = styled.span`
  font-weight: bold;
  margin-right: 8px;
  width: 24px;
`;

const RankingKeyword = styled.span`
  flex: 1;
`;

const RealTimeRanking = () => {
  const keywords = ['코로나', '날씨', '뉴스', '영화', '음식', '여행', '스포츠', '연예', '게임', '쇼핑'];

  return (
    <RankingContainer>
      <RankingTitle>실시간 검색어 랭킹</RankingTitle>
      <RankingList>
        {keywords.map((keyword, index) => (
          <RankingItem key={index}>
            <RankingNumber>{index + 1}</RankingNumber>
            <RankingKeyword>{keyword}</RankingKeyword>
          </RankingItem>
        ))}
      </RankingList>
    </RankingContainer>
  );
};

export default RealTimeRanking;