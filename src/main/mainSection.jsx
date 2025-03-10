import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain';
import SpecialOffer from '../swiper/specialOffer';
import Recommended from './recommended.jsx';
import CategoryList from './categoryList.jsx';
import Footer from './footer.jsx';
import FindCategory from './findCategory.jsx';
import TopPicks from './topPicks.jsx';
import NewArrival from './newArrival.jsx';
import PromotionCard from '../swiper/promotionCard.jsx';
import FullRange from './fullRange.jsx';

function MainSection() {
    return (
        <MainBox>
            <SwiperMain />
            <Recommended />
            <FindCategory />
            <TopPicks />
            <NewArrival />
            <CategoryList />
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
