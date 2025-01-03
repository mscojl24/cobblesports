import styled from 'styled-components';
import SwiperMain from '../swiper/swiperMain';
import { useState } from 'react';

import { swiperMainData } from '../data/swiperMainData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import MainIntro from './mainIntro';
import MainBusiness from './mainBusiness';

function MainSection() {
    const [swiperData, setSwiperData] = useState(swiperMainData);

    const handleSlideChange = () => {
        //슬라이드가 변경될 때마다 애니메이션 초기화
        const slides = document.querySelectorAll('h1');
        slides.forEach((slide) => {
            slide.classList.remove('ani'); // 기존 애니메이션 제거
            setTimeout(() => slide.classList.add('ani'), 10); // 10ms 후 애니메이션 다시 추가
        });

        const slides2 = document.querySelectorAll('div');
        slides2.forEach((slide2) => {
            slide2.classList.remove('ani2');
            setTimeout(() => slide2.classList.add('ani2'), 10);
        });
    };

    return (
        <MainBox>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className="mySwiper"
                onSlideChange={handleSlideChange}>
                {swiperData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <SwiperMain data={data} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <MainIntro />
            <MainBusiness />
        </MainBox>
    );
}

const MainBox = styled.section`
    width: 100%;
    height: 200vh;
`;

export default MainSection;
