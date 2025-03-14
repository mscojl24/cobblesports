import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain.jsx';
import Recommended from './about/recommended.jsx';
import SNSList from './about/snsList.jsx';
import Footer from './footer.jsx';
import FindCategory from './about/findCategory.jsx';
import TopPicks from './about/topPicks.jsx';
import NewArrival from './about/newArrival.jsx';
import PromotionCard from '../swiper/promotionCard.jsx';
import FullRange from './about/fullRange.jsx';

function MainSection() {
    return (
        <MainBox>
            <SwiperMain />
            <Recommended />
            <SNSList />
            <FindCategory />
            <TopPicks />
            <NewArrival />
            <FullRange />
            <PromotionCard />
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
