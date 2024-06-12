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

const EmotionButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const EmotionButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
  & + & {
    margin-left: 0.5rem;
  }
`;

const DescriptionBlock = styled.div`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  text-align: left;
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emotionDescription, setEmotionDescription] = useState('');

  const emotionCategoryDescriptions = {
    'fear_sadness': {
      politics: '정치인의 부정부패, 정치인의 사망, 국가 위기 상황, 국민 생활고',
      economy: '경제 위기, 주가 폭락, 대량 실업, 장기 불황, 서민 경제 어려움, 기업 파산',
      society: '강력 범죄, 사회 불안 요소, 안타까운 사건, 사회적 약자의 고통, 재난 상황',
      lifeculture: '질병 및 사고, 안전 문제, 건강 위협 요소, 서민 생활고, 고령화 사회 문제, 전염병',
      world: '전쟁, 테러, 국제 분쟁, 국제적 재난, 난민 문제',
      itScience: '사이버 범죄, 개인 정보 유출, 디지털 격차, 기술 소외 계층, 환경 파괴, 연구 실패, 치명적인 바이러스, AI기술의 발달로 인류 위협',
      entertainment: '스토커, 연예인 자살, 연예인 사망, 은퇴, 스캔들, 팬덤 갈등',
      sports: '은퇴 경기, 패배 선수 부상, 폭력 사태, 은퇴 경기, 패배',
    },
    'surprise_happiness': {
      politics: '정책 변화, 이로운 정책 시행, 정치적 화합',
      economy: '급격한 환율 변동, 예상치 못한 경제 지표, 경기 회복, 국민 소득 증대, 고용 안정, 경제 성장',
      society: '사건 사고, 사회적 화합, 봉사와 나눔, 사회적 이슈',
      lifeculture: '의학 기술의 발전, 생활 꿀팁, 새로운 트렌드, 행복한 가정, 여가 문화 발달',
      world: '예상치 못한 국제 사건, 새로운 외교 관계, 국제 협력, 평화 정착',
      itScience: '획기적인 신기술, 혁신적인 제품 출시, 기술의 발전, 편리한 디지털 생활, 과학적 혁신/발견, 획기적인 연구 결과, 과학으로 삶의 질 향상',
      entertainment: '스캔들, 결혼 발표, 연예인의 선행, 스타 성장',
      sports: '새로운 기록 달성, 예상치 못한 팀의 승리, 우승, 감동적인 선수 스토리',
    },
    'anger_disgust': {
      politics: '정치인의 무능력, 국민 요구 무시, 정치인의 비윤리적 행위, 극단적 정치 성향, 정부 부패, 정치 비리',
      economy: '기업의 불공정 행위, 소비자 권리 침해, 부정부패',
      society: '부조리한 사회 문제, 불평등, 차별, 특정 집단에 대한 차별, 극단주의, 혐오범죄',
      lifeculture: '소비자 피해, 부당한 요금 인상, 비위생적인 환경, 물가 상승, 역차별',
      world: '인권 유린, 국가 간 갈등, 특정 국가나 민족에 대한 차별, 문화갈등',
      itScience: ' IT 기업의 독점, 서비스 장애, 비윤리적인 연구, 과학 기술 오남용, 생명 경시 문제',
      entertainment: '연예인 막말 논란, 팬 괴롭힘, 사생활 침해, 팬덤 갈등',
      sports: '과도한 상업화, 스포츠 팀(팬) 간의 갈등, 승부 조작, 불공정 판정',
    },
    'neutral': {
      politics: '일상적인 정치 뉴스, 의회 일정',
      economy: '일상적인 경제 뉴스, 정부 경제 정책',
      society: '일상적인 사회 뉴스',
      lifeculture: '일상적인 생활 정보, 날씨 예보, 건강 정보',
      world: '국제 정세, 외교 동향',
      itScience: 'IT 제품 정보, 업계 동향, 과학 연구 성과, 학술 행사',
      entertainment: '연예인 근황, 새 작품 소식',
      sports: '경기 결과',
    },
  };

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
        // 감정 정보가 있는 기사들만 필터링
        const filteredArticles = articlesList.filter(article => article.emotion);
        setArticles(filteredArticles);
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
        <EmotionButtonsBlock>
          <EmotionButton
            onMouseEnter={() => setEmotionDescription(emotionCategoryDescriptions.fear_sadness[category])}
            onMouseLeave={() => setEmotionDescription('')}
          >
            공포/슬픔
          </EmotionButton>

          <EmotionButton
            onMouseEnter={() => setEmotionDescription(emotionCategoryDescriptions.surprise_happiness[category])}
            onMouseLeave={() => setEmotionDescription('')}
          >
            놀람/행복
          </EmotionButton>

          <EmotionButton
            onMouseEnter={() => setEmotionDescription(emotionCategoryDescriptions.anger_disgust[category])}
            onMouseLeave={() => setEmotionDescription('')}
          >
            분노/혐오
          </EmotionButton>

          <EmotionButton
            onMouseEnter={() => setEmotionDescription(emotionCategoryDescriptions.neutral[category])}
            onMouseLeave={() => setEmotionDescription('')}
          >
            중립
          </EmotionButton>

        </EmotionButtonsBlock>
        {emotionDescription && <DescriptionBlock>{emotionDescription}</DescriptionBlock>}
      
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
