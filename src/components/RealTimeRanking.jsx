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
  const keywords = ['부안서 4.8 지진', '푸바오 공개', '영탁 막걸리 분쟁', '사단장 탄원서', '송승헌 플레이어2', '단일지도체제 유지 압축', '북한군', '이재명 기소 제3자뇌물', '엔비디아 주가 분할', '하마스 휴전안'];

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