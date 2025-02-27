import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain';
import { useState } from 'react';

import { swiperMainData } from '../data/swiperMainData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import CompanyIntro from './companyIntro.jsx';
import CategoryCard from './categoryCard.jsx';
import ProdouctCard from '../swiper/prodoctCard.jsx';
import { prodouctData } from '../data/prodouctsData.jsx';
import Recommended from './recommended.jsx';

function MainSection() {
    const [swiperData] = useState(swiperMainData);

    const newProdouct = [
        {
            title: 'NEW ARRIVALS',
            subtitle: '가민의 신제품과 함께 더 빠르게, 더 강하게, 더 멀리!',
            link: '/',
            prodouct: prodouctData,
        },
    ];

    const highlights = [
        {
            title: 'BEST SELLRES',
            subtitle: '컨슈머들이 선택한 가민의 인기 제품을 만나보세요!',
            link: '/',
            prodouct: prodouctData,
        },
    ];

    return (
        <MainBox>
            <div className="main-swiper">
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    loop={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[EffectFade, Autoplay, Navigation]}
                    className="mySwiper">
                    {swiperData.map((data, index) => (
                        <SwiperSlide key={index}>
                            <SwiperMain data={data} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Recommended />
            <CompanyIntro />
            <CategoryCard />
            <ProdouctCard data={newProdouct} />
            <ProdouctCard data={highlights} />
        </MainBox>
    );
}

const MainBox = styled.section`
    /* 기본 네비게이션 버튼 오버라이드 */
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
        content: '<'; /* 왼쪽 화살표 (예시) */
        left: 0px;
    }

    .swiper-button-next::after {
        content: '>'; /* 오른쪽 화살표 (예시) */
        right: 0px;
    }

    .main-swiper {
        overflow: hidden;
    }
`;

export default MainSection;
