import {useCallback, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from "./components/NewsList";
import Menu from "./components/Menu";
import LoginPage from './components/LoginPage';
import NewsPage from './components/NewsPage';
import SearchResultPage from './components/SearchResultPage';
import MyPage from "./components/MyPage";

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);
  
  return (

      <Routes>
        <Route path="/" element={
        <>
          <Menu category={category} onSelect={onSelect} />
          <NewsList category={category} />
        </>
        } />
        <Route path="/login" element={
          <>
            <LoginPage />
          </>
        } />

          <Route path="/mypage" element={
              <>
                  <MyPage />
              </>
          } />

        <Route path="/newspage" element={
        <>
          <Menu category={category} onSelect={onSelect} />
          <NewsPage />
        </>
        } />
        <Route path="/searchresultpage" element={
          <>
            <Menu category={category} onSelect={onSelect} />
            <SearchResultPage />
          </>
        } />
      </Routes>
  );
  
}

export default App;
