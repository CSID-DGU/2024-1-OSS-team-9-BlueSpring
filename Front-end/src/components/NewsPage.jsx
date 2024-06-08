import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import likeImage from '../images/like.png';
import dislikeImage from '../images/dislike.png';
import axios from "axios";

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
  }
  hr{
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
  const { article } = location.state;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchArticleDetail = async () => {
            try {
                // 백엔드의 /api/news/{articleId} 엔드포인트 호출
                const response = await axios.get(`api/news/${article.id}`);
                //setArticleDetail(response.data); // 백엔드에서 받은 상세 기사 데이터 설정 오류발생
            }catch(error){
                console.log(error);
            }
        };
        fetchArticleDetail();
    }, [article.id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <NewsPageBlock>
      <div className="content">
        <h1 className="title">{article.title}</h1>
        <hr/>
        {article.urlToImage && (
        <div className="thumbnail">
          <img src={article.urlToImage} alt="article thumbnail" />
        </div>
        )}
        <p className="article">{article.description}</p>
        
      <a
          href={article.url}
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