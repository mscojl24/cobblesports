import './css/App.css';
import Navi from './navigation/navi';
import MainSection from './main/mainSection';
import LoderPage from './loderPage';
// import * as XLSX from 'xlsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useAtom } from 'jotai';
import { scrollYState } from './atoms/useIndexState';
import { useEffect } from 'react';

function App() {
    const [, setScrollY] = useAtom(scrollYState);

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
