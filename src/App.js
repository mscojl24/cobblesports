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
    const [scrollX, setScrollX] = useAtom(scrollXState);

    // const [pro, setProducts] = useAtom(productsState);
    // console.log(pro);

    // useEffect(() => {
    //     const fetchExcelFile = async () => {
    //         const response = await fetch(process.env.REACT_APP_PRODUCTS_DATA_URL); // 엑셀 파일 경로
    //         const arrayBuffer = await response.arrayBuffer();
    //         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    //         const sheet = workbook.Sheets[workbook.SheetNames[0]];
    //         const jsonData = XLSX.utils.sheet_to_json(sheet); // JSON으로 변환
    //         setProducts(jsonData);
    //     };

    //     fetchExcelFile();
    // }, []);

    const handleScroll = () => {
        setScrollY(window.scrollY);
        setScrollX(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollX]);

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
