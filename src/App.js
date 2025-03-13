import './css/App.css';
import styled from 'styled-components';
import Navi from './navigation/navi';
import MainSection from './main/mainSection';
import LoderPage from './loderPage';
// import * as XLSX from 'xlsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useAtom } from 'jotai';
import { scrollXState, scrollYState } from './atoms/useIndexState';
import { useEffect } from 'react';

function App() {
    const [, setScrollY] = useAtom(scrollYState);
    const [ScrollX, setScrollX] = useAtom(scrollXState);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    const handleResize = () => {
        setScrollX(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // 초기값 설정
        setScrollX(window.innerWidth);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Router>
            <Navi />
            <BoxMargin>
                <Routes>
                    <Route path="/" element={<MainSection />} />
                </Routes>
            </BoxMargin>
            <LoderPage />
        </Router>
    );
}

const BoxMargin = styled.section`
    margin-top: 70px;

    @media (max-width: 1500px) {
        margin-top: 50px;
    }
`;

export default App;
