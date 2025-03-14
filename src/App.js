import './css/App.css';
import styled from 'styled-components';
import Navi from './navigation/navi';
import MainSection from './components/mainSection';
import LoderPage from './components/loderPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loderPageState, scrollXState, scrollYState, productsState } from './atoms/useIndexState';
import { useEffect } from 'react';
import ProductSection from './components/productSection';
import * as XLSX from 'xlsx';

function App() {
    const [, setScrollY] = useAtom(scrollYState);
    const [, setScrollX] = useAtom(scrollXState);
    const [loderPage] = useAtom(loderPageState);
    const [productData, setProductData] = useAtom(productsState); // ✅ 제품 데이터 상태 추가

    console.log(productData);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    const handleResize = () => {
        setScrollX(window.innerWidth);
    };

    // ✅ 엑셀 데이터 가져오는 함수
    const fetchExcelData = async () => {
        try {
            const response = await fetch('/data/products.xlsx'); // 엑셀 파일 경로
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // 데이터 가공
            const headers = jsonData[0]; // 첫 번째 행 (헤더)
            const data = jsonData.slice(1).map((row) => Object.fromEntries(row.map((cell, i) => [headers[i], cell])));

            setProductData(data); // ✅ 전역 상태에 저장
        } catch (error) {
            console.error('엑셀 데이터 로딩 오류:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // 초기값 설정
        setScrollX(window.innerWidth);

        // ✅ 엑셀 데이터 불러오기
        fetchExcelData();

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
                    <Route path="/products" element={<ProductSection />} />
                    <Route path="/compare" element={<MainSection />} />
                </Routes>
            </BoxMargin>
            {loderPage && <LoderPage />}
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
