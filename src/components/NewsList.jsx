import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useEffect, useState } from 'react';
import { db } from '/Users/cmj/Desktop/Workspace/OSS/sentinews_v0.2/src/firebase-config.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import RealTimeRanking from './RealTimeRanking'; // 실시간 검색어 랭킹 컴포넌트 가져오기

const NewsListBlock = styled.div`
  :hover {
    background-color: lightgrey;
  }
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const RecentNews = styled.div`
  width: 768px;
  margin: 0 auto;
`;

const MenuArea = styled.div`
  width: 100%;
  height: 50px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsListWrapper = styled.div`
  width: 768px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const RankingWrapper = styled.div`
  width: 300px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Firestore에서 데이터 가져오기
        const articlesCollection = collection(db, 'articles');
        let q;
        if (category === 'all') {
          q = query(articlesCollection);
        } else {
          q = query(articlesCollection, where('category', '==', category));
        }
        const querySnapshot = await getDocs(q);
        const articlesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(articlesList);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <>
        <MenuArea />
        <NewsListBlock>대기중...</NewsListBlock>
      </>
    );
  }

  if (!articles) {
    return null;
  }

  return (
    <Container>
      <NewsListWrapper>
        <MenuArea />
        <h2>최신기사</h2>
        <NewsListBlock>
          {articles.map((article) => (
            <div key={article.id}>
              <NewsItem article={article} />
              <hr />
            </div>
          ))}
        </NewsListBlock>
      </NewsListWrapper>
      <RankingWrapper>
        <MenuArea />
        <RealTimeRanking/>
      </RankingWrapper>
    </Container>
  );
};

export default NewsList;
