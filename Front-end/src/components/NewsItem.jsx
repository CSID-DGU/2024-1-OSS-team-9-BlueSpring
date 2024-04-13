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
        h3{
            color: black;
            margin: 0;
            a{
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

function NewsItem({article}){
    // article을 prop로 받아온다.
    // article에는 'title', 'description', 'url', 'urlToImage'의 정보가 들어있음
    const { title, description, url, urlToImage} = article;
    const navigate = useNavigate();
    
    let truncatedDescription="";
    if(description!=null){
        truncatedDescription = description.length > 100? `${description.slice(0, 120)}...` : description;
    }
    //구조 분해를 이용해서 article.title → title로 할당하기
    const handleClick = () => {
        navigate('/newspage', { state: { article } });
      };
    return (
        <NewsItemBlock onClick={handleClick}>
            {/* urlToImage가 있는 경우: 썸네일 요소 형성 */}
            {urlToImage && (
                <div className="thumbnail">
                    <img src={urlToImage} alt="thumbnail" />
                </div>
            )}
            {/* 컨텐츠 영역 */}
            <div className="contents">
                {/* 제목 */}
                <h3>
                    {title}
                </h3>
                {/* 설명 */}
                <p>{truncatedDescription}</p>
            </div>
            
        </NewsItemBlock>

        
    )
}

export default NewsItem;