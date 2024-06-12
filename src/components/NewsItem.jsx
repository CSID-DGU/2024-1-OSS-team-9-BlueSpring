import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h3 {
      color: black;
      margin: 0;
      a {
        color: black;
        text-decoration-line: none;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const EmotionTag = styled.span`
  display: inline-block;
  background-color: ${(props) => {
    switch (props.emotion) {
      case 'fear_sadness':
        return '#FF6B6B';
      case 'surprise_happiness':
        return '#FFD700';  // Changed color to gold
      case 'anger_disgust':
        return '#FF9244';
      case 'neutral':
        return '#A0A0A0';
      default:
        return '#FFFFFF';
    }
  }};
  color: black;  // Set text color to black for better readability
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`;

function NewsItem({ article }) {
  const { Title, Content, URL, ImageUrls, emotion } = article;
  const navigate = useNavigate();

  const emotionKorean = {
    'fear_sadness': '공포/슬픔',
    'surprise_happiness': '놀람/행복',
    'anger_disgust': '분노/혐오',
    'neutral': '중립'
  };

  // 본문 내용이 100자를 초과하는 경우, 일부만 표시하고 "..."을 추가
  const truncatedContent = Content && Content.length > 100 ? `${Content.slice(0, 100)}...` : Content;

  const handleClick = () => {
    navigate('/newspage', { state: { article } });
  };

  return (
    <NewsItemBlock onClick={handleClick}>
      {ImageUrls && (
        <div className="thumbnail">
          <img src={ImageUrls} alt="thumbnail" />
        </div>
      )}
      <div className="contents">
        <h3>
          {Title}
        </h3>
        <p>{truncatedContent}</p>
        {emotion && <EmotionTag emotion={emotion}>{emotionKorean[emotion]}</EmotionTag>}
      </div>
    </NewsItemBlock>
  );
}

export default NewsItem;
