import React, { useState } from 'react';

import styled from 'styled-components';
import { GiPauseButton } from 'react-icons/gi';
import { BsGrid3X3GapFill } from 'react-icons/bs';

function SwiperMain(data) {
    const { title, image, subtitle, index, linkBtn } = data.data;

    const formattedTitle = title.split(' ').map((word, index) => (
        <>
            {word}
            <br />
        </>
    ));

    return (
        <>
            <MainBanner bgimg={image}>
                <div className="background"></div>
                <TitleText className="flex-v-center column">
                    <h1 className="ani">{formattedTitle}</h1>
                    <div className="sub-text ani2">
                        {index === 1 && <img src="../asset/Garmin_B-white.png" alt="garmin-logo" height="20px" />}
                        <span>{subtitle}</span>
                    </div>
                    <ActButton>
                        <button className="stop-btn flex-center">
                            <GiPauseButton size="24px" />
                        </button>
                        <button className="store-btn flex-center">
                            {linkBtn.icon}
                            <span>{linkBtn.text}</span>
                        </button>
                    </ActButton>
                </TitleText>
            </MainBanner>
        </>
    );
}

const MainBanner = styled.article`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(rgba(23, 23, 29, 0.8), rgba(76, 76, 97, 0.8)), url(${(props) => props.bgimg});
        background-size: cover;
        animation: bgmove 30s ease-in-out infinite;
    }

    @keyframes bgmove {
        50% {
            transform: scale(1.3);
        }
    }
`;

const TitleText = styled.div`
    position: relative;
    height: 100vh;
    margin: 0px 200px;
    color: var(--color-main-001);
    font-size: 22px;

    h1 {
        font-family: 'Raleway', 'Noto Sans KR';
        font-weight: 900;
        text-transform: uppercase;
        font-size: 83px;
        opacity: 0;
        transform: translateX(-50px);
    }

    .ani {
        animation: moveleft 0.5s ease-in-out 0.2s forwards;
    }

    .ani2 {
        animation: moveleft2 0.5s ease-in-out 0.5s forwards;
    }

    .sub-text {
        margin-top: 40px;
        opacity: 0;
        transform: translateX(-50px);
        font-weight: 300;

        span {
            margin-left: 10px;
        }
    }

    @keyframes moveleft {
        100% {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    @keyframes moveleft2 {
        100% {
            opacity: 1;
            transform: translateX(0px);
        }
    }
`;

const ActButton = styled.div`
    display: flex;
    margin-top: 80px;

    /** 슬라이드 정지버튼 */

    .stop-btn {
        width: 70px;
        height: 70px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: var(--color-main-001);
        border-radius: 100px;
        background: rgba(255, 255, 255, 0.1);
        transition: all ease-in-out 0.1s;
    }

    .stop-btn:active {
        transform: scale(0.85);
    }

    .stop-btn:hover {
        background: rgba(255, 255, 255, 1);
        color: #1b1b1b;
        font-weight: 400;
    }

    .stop-btn:nth-of-type(1):hover {
        color: #1b1b1b;
    }

    /** URL 이동버튼 */

    .store-btn {
        margin-left: 25px;
        padding: 0px 40px;
        height: 70px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 100px;
        background: rgba(255, 255, 255, 0);
        color: var(--color-main-001);
        font-size: 20px;
        font-weight: 300;
        transition: all ease-in-out 0.1s;

        span {
            margin-left: 10px;
        }
    }

    .store-btn:active {
        transform: scale(0.9);
    }

    .store-btn:hover {
        background: rgba(255, 255, 255, 1);
        color: #1b1b1b;
        font-weight: 400;
    }

    .store-btn:nth-of-type(1):hover {
        color: #1b1b1b;
    }
`;

export default SwiperMain;
