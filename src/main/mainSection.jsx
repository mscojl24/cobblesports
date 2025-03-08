import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain';
import CategoryCard from './categoryCard.jsx';
import ProdouctCard from '../swiper/prodoctCard.jsx';
import Recommended from './recommended.jsx';
import { prodouctData } from '../data/prodouctsData.jsx';
import CategoryList from './categoryList.jsx';
import Highlights from '../swiper/highlights.jsx';
import Footer from './footer.jsx';
import ProdouctList from './prodouctList.jsx';
import FindCategory from './findCategory.jsx';
import { useEffect, useState } from 'react';
import TopPicks from './topPicks.jsx';

// function useCustomScroll(scrollAmount = 200, multiplier = 1, delay = 200) {
//     const [isScrolling, setIsScrolling] = useState(false);

//     useEffect(() => {
//         const handleWheel = (event) => {
//             if (isScrolling) return; // 현재 스크롤 중이면 무시
//             setIsScrolling(true);

//             event.preventDefault(); // 기본 스크롤 동작 방지
//             window.scrollBy({
//                 top: scrollAmount * multiplier * (event.deltaY > 0 ? 1 : -1),
//                 behavior: 'smooth',
//             });

//             setTimeout(() => setIsScrolling(false), delay); // 일정 시간 동안 추가 입력 방지
//         };

//         window.addEventListener('wheel', handleWheel, { passive: false });

//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//         };
//     }, [scrollAmount, multiplier, delay, isScrolling]);

//     return null;
// }

function MainSection() {
    // useCustomScroll(200, 2, 1000); // 속도 조절: 200px씩 이동, 400ms 지연
    return (
        <MainBox>
            <SwiperMain />
            <CategoryList />
            <FindCategory />
            <TopPicks />
            {/* <ProdouctList /> */}
            <Recommended />
            <Footer />
        </MainBox>
    );
}

const MainBox = styled.section`
    /* 기본 네비게이션 버튼 오버라이드
    .swiper-button-prev,
    .swiper-button-next {
        &::after {
            font-family: cursive;
            color: #fff;
            width: 60px;
            height: 60px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background-color: rgba(255, 255, 255, 0.05);
            font-size: 20px;
            margin: 50px;
            border-radius: 100px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all ease-in-out 0.2s;
        }
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        &::after {
            border: 1px solid rgba(0, 0, 0, 0.6);
            background-color: rgba(0, 0, 0, 0.3);
            color: #7c7c7c;
            scale: calc(0.85);
        }
    }

    .swiper-button-prev::after {
        content: '<'; 
        left: 0px;
    }

    .swiper-button-next::after {
        content: '>'; 
        right: 0px;
    } */
`;

export default MainSection;
