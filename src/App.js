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

    const fetchExcelData = async () => {
        try {
            console.log('📂 엑셀 파일 로드 시작...');

            // 🔹 `fetch` 요청 실행
            const response = await fetch(process.env.PUBLIC_URL + '/assets/cobble-products.xlsx');
            if (!response.ok) throw new Error(`파일을 불러오지 못함: HTTP 상태 코드 ${response.status}`);

            // 🔹 응답이 HTML인지 확인 (MIME 타입 검사)
            const contentType = response.headers.get('content-type');
            if (
                !contentType ||
                !contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ) {
                throw new Error('📄 응답이 엑셀 파일이 아니라 HTML 페이지일 가능성이 높음!');
            }

            console.log('📥 파일 다운로드 성공, 변환 시작...');

            // 🔹 엑셀 데이터를 ArrayBuffer로 변환
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            // 🔹 첫 번째 시트 확인
            const sheetName = workbook.SheetNames[0];
            if (!sheetName) throw new Error('📄 엑셀 파일에 시트가 없음!');

            console.log(`📄 선택된 시트: ${sheetName}`);

            // 🔹 JSON 변환
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (!jsonData.length) throw new Error('❌ 변환된 데이터가 없음!');

            // 🔹 데이터 가공
            const headers = jsonData[0]; // 첫 번째 행을 헤더로 사용
            const data = jsonData.slice(1).map((row) => Object.fromEntries(row.map((cell, i) => [headers[i], cell])));

            console.log('✅ 엑셀 데이터 로딩 성공:', data);
            setProductData(data);
        } catch (error) {
            console.error('❌ 엑셀 데이터 로딩 오류:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
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
