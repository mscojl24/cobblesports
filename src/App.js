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
    const [productData, setProductData] = useAtom(productsState); // ✅ 제품 데이터 상태

    console.log('현재 저장된 제품 데이터:', productData);

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

    useEffect(() => {
        const fetchExcelFile = async () => {
            try {
                const response = await fetch(`https://mscojl24.github.io/cobblesports/data/products.xlsx`);

                console.log('응답 상태 코드:', response.status);
                console.log('응답 헤더:', response.headers.get('Content-Type'));

                if (!response.ok) {
                    throw new Error(`서버 응답 오류: ${response.status} ${response.statusText}`);
                }

                if (!response.headers.get('Content-Type')?.includes('spreadsheet')) {
                    throw new Error('올바른 엑셀 파일이 아닙니다.');
                }

                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });

                console.log('워크북 데이터:', workbook);
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                setProductData(jsonData);
            } catch (error) {
                console.error('엑셀 파일 로드 오류:', error);
            }
        };

        fetchExcelFile();
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
