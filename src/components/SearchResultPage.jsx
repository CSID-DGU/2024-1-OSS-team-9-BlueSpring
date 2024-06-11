import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import RealTimeRanking from './RealTimeRanking';
import { useLocation } from 'react-router-dom';

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

const NewsList = ({ category, query }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryQuery = category === 'all' ? '' : `&category=${category}`;
        const searchQuery = query ? `&q=${query}` : '';
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${categoryQuery}${searchQuery}&apiKey=a0ba251738f34defbb9bfe8af6e34866`
        );
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [category, query]);

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
        <h2>검색 결과</h2>
        <NewsListBlock>
          {articles.length > 0 ? (
            articles.map((article) => (
              <p key={article.url}>
                <NewsItem article={article} />
                <hr />
              </p>
            ))
          ) : (
            <p>"{query}"에 대한 검색 결과가 없습니다.</p>
          )}
        </NewsListBlock>
      </NewsListWrapper>
      <RankingWrapper>
        <MenuArea />
        <RealTimeRanking />
      </RankingWrapper>
    </Container>
  );
};

const SearchResultPage = ({ category }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  return <NewsList category={category} query={query} />;
};

export default SearchResultPage;
