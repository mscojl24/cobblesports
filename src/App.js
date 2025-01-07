import './css/App.css';
import Navi from './navigation/navi';
import MainSection from './main/mainSection';
import LoderPage from './loderPage';
// import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAtom } from 'jotai';
import { scrollYState } from './atoms/useIndexState';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [scrollY, setScrollY] = useAtom(scrollYState);
    const [products, setProducts] = useState([]);

    // products가 변경될 때 한 번만 실행
    useEffect(() => {
        if (products.length > 0) {
            console.log(products); // products가 갱신된 후 한 번만 호출됨
        }
    }, [products]); // products가 업데이트 될 때만 실행

    // Axios로 GET 요청 보내기
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/products`, {
                    headers: {
                        apikey: process.env.REACT_APP_SUPABASE_API_KEY,
                        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_API_KEY}`,
                    },
                });
                setProducts(response.data); // 데이터 받아오기
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []); // 이 useEffect는 한 번만 실행되도록 빈 배열([])을 의존성으로 사용

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // 스크롤 이벤트는 한 번만 설정

    return (
        <Router>
            <Navi />
            <Routes>
                <Route path="/" element={<MainSection />} />
            </Routes>
            <LoderPage />
        </Router>
    );
}

export default App;
