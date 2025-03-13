import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { TfiArrowRight } from 'react-icons/tfi';

import { swiperMainData } from '../data/swiperMainData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

function SwiperMain() {
    const [progress, setProgress] = useState(0);
    const slideDuration = 6000; // 6초
    const requestRef = useRef(null);
    const startTimeRef = useRef(null);

    const animateProgress = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const newProgress = Math.min((elapsed / slideDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
            requestRef.current = requestAnimationFrame(animateProgress);
        }
    };

    function formattedTitle(title) {
        return title.split('/').map((word, index) => (
            <React.Fragment key={index}>
                {word}
                <br />
            </React.Fragment>
        ));
    }

    useEffect(() => {
        startTimeRef.current = null;
        requestRef.current = requestAnimationFrame(animateProgress);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            loop={true}
            autoplay={{
                delay: slideDuration,
                disableOnInteraction: false,
            }}
            modules={[EffectFade, Autoplay]}
            className="mySwiper"
            onSlideChange={() => {
                setProgress(0);
                startTimeRef.current = null;
                requestRef.current = requestAnimationFrame(animateProgress);
            }}>
            {swiperMainData.map((data, index) => (
                <SwiperSlide key={index}>
                    <MainBanner $bgimg={data.image} className="flex-center">
                        <div className="background"></div>
                        <div className="text-box">
                            <TitleText className="flex-v-center column">
                                <div className="title">
                                    <h1>{formattedTitle(data.title)}</h1>
                                </div>
                                <div className="sub-title">
                                    <p>{data.subtitle}</p>{' '}
                                </div>
                                <div className="sub-script">
                                    <p>{data.description}</p>
                                </div>
                            </TitleText>
                            <ActButton>
                                <button className="store-btn flex-center">
                                    <span className="btn-text">{data.linkBtn.text}</span>
                                    <TfiArrowRight />
                                </button>
                            </ActButton>
                        </div>
                        <ProgressBar>
                            <div className="progress" style={{ width: `${progress}%` }}></div>
                        </ProgressBar>
                    </MainBanner>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

const MainBanner = styled.article`
    position: relative;
    height: calc(100vh - 70px);
    overflow: hidden;
    text-align: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .background {
        position: absolute;
        transition: all ease-in-out 1s;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(30deg, #000000, rgba(0, 0, 0, 0) 60%),
            url(${process.env.PUBLIC_URL}${(props) => props.$bgimg});
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        animation: bgmove 20s ease-in-out infinite;
    }

    .background-color {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(23, 23, 29, 0.5), #000000);
    }

    .text-box {
        display: flex;
        justify-content: space-between;
        align-items: end;
        position: absolute;
        margin: 0px 100px;
        bottom: 100px;
        left: 0px;
    }

    @keyframes bgmove {
        50% {
            transform: scale(1.1);
        }
    }

    @media (max-width: 1500px) {
        height: calc(100vh - 50px);

        .text-box {
            bottom: 0px;
            margin: 0px;
            position: relative;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }

    @media (max-width: 860px) {
        height: calc(70vh - 50px);
    }
`;

const TitleText = styled.div`
    text-align: left;
    color: #ffffff;
    transition: all ease-in-out 1s;

    /* 메인타이틀 CSS */
    .title {
        padding: 10px 0px;
        overflow: hidden;
        h1 {
            font-family: Anton;
            font-size: clamp(40px, 8vw, 80px);
            line-height: 100%;
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: text-show 1s forwards 0s;
            transition: all ease-in-out 0.3s;
        }
    }

    /* 서브 타이틀 CSS */
    .sub-title {
        margin-top: 20px;
        overflow: hidden;
        p {
            font-size: clamp(16px, 3vw, 32px);
            font-weight: 300;
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: text-show 1s forwards 0.2s;
            transition: all ease-in-out 0.3s;
        }
    }

    /* 설명문 CSS */
    .sub-script {
        margin-top: 40px;
        overflow: hidden;
        p {
            width: 50%;
            font-size: 13px;
            font-weight: 300;
            line-height: 150%;
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: text-show 1s forwards 0.4s;
            transition: all ease-in-out 1s;
        }
    }

    @keyframes text-show {
        100% {
            transform: translateY(0);
        }
    }

    @media (max-width: 1500px) {
        text-align: center;

        .sub-script {
            display: flex;
            justify-content: center;
        }
    }

    @media (max-width: 860px) {
        text-align: center;

        .sub-script {
            display: none;
        }
    }
`;

const ActButton = styled.div`
    .store-btn {
        padding: 0px 40px;
        width: 250px;
        height: 65px;
        border-radius: 10px;
        border: 1px solid #fff;
        justify-content: space-between;
        cursor: pointer;

        /* 버튼 텍스트 디자인 */
        color: #fff;
        font-size: 18px;
        transition: all ease-in-out 0.5s;
    }

    .store-btn:active {
        transform: scale(0.9);
    }

    .store-btn:hover {
        background: #fff;
        color: #1a1a1a;
        font-weight: 600;
    }

    @media (max-width: 1500px) {
        margin-top: 30px;
        .store-btn {
            font-size: 14px;
            width: 160px;
            height: 40px;
            padding: 0px 20px;
            border-radius: 5px;
        }
    }
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    overflow: hidden;

    .progress {
        height: 100%;
        background: #000000;
        transition: width linear;
    }
`;

export default SwiperMain;
