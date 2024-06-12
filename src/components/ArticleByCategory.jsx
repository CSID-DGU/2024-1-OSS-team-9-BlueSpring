// ArticlesByCategory.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '/Users/cmj/Desktop/Workspace/OSS/sentinews_v0.2/src/firebase-config.js';

const ArticlesByCategory = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const articlesRef = collection(db, 'articles');
      const q = categoryName === 'all' ?
        query(articlesRef) :
        query(articlesRef, where('category', '==', categoryName));

      const querySnapshot = await getDocs(q);
      const articlesData = querySnapshot.docs.map(doc => doc.data());
      setArticles(articlesMap);
      setLoading(false);
    }

    fetchArticles();
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesByCategory;
