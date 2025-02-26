import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

import styled from 'styled-components';

function PromotionCard() {
    const promotion = [
        {
            title: '프라이스 파이터 할인 최대 38%',
            subtitle: '가민 인기 제품을 합리적인 가격으로 만나보세요',
            image: '/promotion/card-image-01.png',
        },
        {
            title: '가민 챌린저스 운동인증 EVENT',
            subtitle: '하루하루를 더욱 건강하게',
            image: '/promotion/card-image-01.png',
        },
        {
            title: '우리, 오늘부터 친구할래?',
            subtitle: '코블스포츠 카카오톡 채널 친구추가 이벤트',
            image: '/promotion/card-image-01.png',
        },
    ];
    return (
        <Section>
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper">
                {promotion.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Promotion className="flex-v-center column">
                            <p className="promotion-sub">{item.subtitle}</p>
                            <h1 className="promotion-title">{item.title}</h1>
                            <img
                                className="promotion-image"
                                src={`${process.env.PUBLIC_URL}${item.image}`}
                                alt="promotion image"
                            />
                        </Promotion>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
}

const Section = styled.section`
    position: relative;
    transform: translateY(-30px);
`;

const Promotion = styled.article`
    position: relative;
    width: 100%;
    height: 230px;
    border-radius: 20px;
    background-color: #dde6ee;
    margin: 60px 0px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    & > * {
        margin: 7px 50px;
        color: #ffffff;
    }

    .promotion-sub {
        font-size: 22px;
        font-weight: 300;
    }

    .promotion-title {
        font-size: 36px;
        font-weight: 600;
    }

    .promotion-image {
        position: absolute;
        border: 1px solid red;
        right: 0px;
        width: 500px;
        height: 280px;
        margin-bottom: 60px;
    }
`;

export default PromotionCard;
