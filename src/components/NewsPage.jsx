import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import likeImage from '../images/like.png';
import dislikeImage from '../images/dislike.png';

const NewsPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem 2rem 2rem;
  font-size: 18px;

  .thumbnail {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;

    img {
      max-width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: contain;
    }
  }

  .content {
    max-width: 800px;
    width: 100%;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 3rem;
    text-align: left;
    margin-top: 5rem;
  }

  .article {
    line-height: 1.5;
    margin-bottom: 1rem;
    white-space: pre-wrap; /* 텍스트 개행을 유지하기 위해 추가 */
  }

  .paragraph {
    margin-bottom: 1rem; /* 단락 사이 여백 */
  }

  hr {
    border-top: 2px solid black;
  }

  .like-dislike {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .like-button,
  .dislike-button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background-color: #f2f2f2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e6e6e6;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }
  }

  .like-button {
    margin-right: 1rem;
  }
`;

const NewsPage = () => {
  const location = useLocation();
  const { article } = location.state || {};

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  if (!article) {
    return <p>No article data available.</p>;
  }

  const content = article.Content || ''; // Content가 없으면 빈 문자열 사용
  const truncatedContent = content.length > 150 ? content.slice(0, 150) + '...' : content;

  return (
    <NewsPageBlock>
      <div className="content">
        <h1 className="title">{article.Title}</h1>
        <hr />
        {article.ImageUrls && (
          <div className="thumbnail">
            <img src={article.ImageUrls} alt="article thumbnail" />
          </div>
        )}
        <div className="article">
          {showFullContent ? content : truncatedContent}
        </div>
        {!showFullContent && content.length > 150 && (
          <button onClick={() => setShowFullContent(true)}>더 보기</button>
        )}
        <p>Media: {article.Media}</p>
        <a
          href={article.URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', marginTop: '1rem' }}
        >
          Read More
        </a>
      </div>
      <div className="like-dislike">
        <button className="like-button" onClick={handleLike}>
          <img src={likeImage} alt="like" /> {likes}
        </button>
        <button className="dislike-button" onClick={handleDislike}>
          <img src={dislikeImage} alt="dislike" /> {dislikes}
        </button>
      </div>
    </NewsPageBlock>
  );
};

export default NewsPage;
