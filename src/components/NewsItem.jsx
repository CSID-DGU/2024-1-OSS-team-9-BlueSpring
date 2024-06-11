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

function NewsItem({ article }) {
  const { Title, Content, URL, ImageUrls } = article;
  const navigate = useNavigate();

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
      </div>
    </NewsItemBlock>
  );
}

export default NewsItem;
