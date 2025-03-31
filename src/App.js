import './css/App.css';
import styled from 'styled-components';
import Navi from './navigation/navi';
import MainSection from './components/mainSection';
import LoderPage from './components/loderPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loderPageState, scrollXState, scrollYState, compareMax, popupTextState } from './atoms/useIndexState.jsx';
import { useEffect } from 'react';
import ProductSection from './components/productSection';
import useFetchExcelData from './hooks/useFetchExcelData';

function App() {
    const [, setScrollY] = useAtom(scrollYState);
    const [, setScrollX] = useAtom(scrollXState);
    const [loderPage] = useAtom(loderPageState);
    const [isCompareMax] = useAtom(compareMax);
    const [popupText] = useAtom(popupTextState);

    // ✅ 커스텀 훅 사용하여 데이터 불러오기
    useFetchExcelData(process.env.REACT_APP_PRODUCTS_DATA_URL);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    const handleResize = () => {
        setScrollX(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        setScrollX(window.innerWidth);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Router basename="/">
            <Navi />
            <BoxMargin>
                <Routes>
                    <Route path="/" element={<MainSection />} />
                    <Route path="/products" element={<ProductSection />} />
                    <Route path="/compare" element={<MainSection />} />
                </Routes>
            </BoxMargin>
            {loderPage && <LoderPage />}
            {isCompareMax && <BottomAlertBox>{popupText}</BottomAlertBox>}
        </Router>
    );
}

const BottomAlertBox = styled.div`
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    padding: 12px 30px;
    border-radius: 50px;
    border: 1px solid rgba(0, 0, 0, 1);
    z-index: 9999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    font-family: '42dot Sans';
    animation: fadeInOut 3s ease forwards;

    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        10%,
        90% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;

const BoxMargin = styled.section`
    margin-top: 70px;

    @media (max-width: 1500px) {
        margin-top: 50px;
    }
`;

export default App;
