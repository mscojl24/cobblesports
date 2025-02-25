import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain';
import { useState } from 'react';

import { swiperMainData } from '../data/swiperMainData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import CompanyIntro from './companyIntro.jsx';

function MainSection() {
    const [swiperData] = useState(swiperMainData);

    // const handleSlideChange = () => {
    //     //슬라이드가 변경될 때마다 애니메이션 초기화
    //     const slides = document.querySelectorAll('h1');
    //     slides.forEach((slide) => {
    //         slide.classList.remove('ani'); // 기존 애니메이션 제거
    //         setTimeout(() => slide.classList.add('ani'), 10); // 10ms 후 애니메이션 다시 추가
    //     });

    //     const slides2 = document.querySelectorAll('div');
    //     slides2.forEach((slide2) => {
    //         slide2.classList.remove('ani2');
    //         setTimeout(() => slide2.classList.add('ani2'), 10);
    //     });
    // };

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
            <div className="main-contents">
                <CompanyIntro />
            </div>
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
