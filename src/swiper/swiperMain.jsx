import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { GiPauseButton } from 'react-icons/gi';
import { ImYoutube2 } from 'react-icons/im';

function SwiperMain(data) {
    const { title, image, subtitle, index, linkBtn, video, videoURL, description } = data.data;

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    const formattedTitle = title.split('/').map((word, index) => (
        <p key={index}>
            {word}
            <br />
        </p>
    ));

    return (
        <>
            <MainBanner bgimg={image} className="flex-center">
                <div className={`${video ? 'background-color' : 'background'}`}></div>
                {video && <video ref={videoRef} src={videoURL} muted autoPlay playsInline loop />}
                <TitleText className="flex-center column">
                    <h1 className="title">{formattedTitle}</h1>
                    <span className="sub-title">{subtitle}</span>
                    <span className="sub-script">{description}</span>
                    <ActButton>
                        <button className="store-btn flex-center">
                            <span>{linkBtn.text}</span>　{linkBtn.icon}
                        </button>
                    </ActButton>
                </TitleText>
            </MainBanner>
        </>
    );
}

const MainBanner = styled.article`
    position: relative;
    height: 115vh;
    overflow: hidden;
    text-align: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .background {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-image: url(${(props) => props.bgimg});
        background-size: cover;
        animation: bgmove 20s ease-in-out infinite;
    }

    .background-color {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background: linear-gradient(rgba(23, 23, 29, 1), rgba(76, 76, 97, 1));
    }

    video {
        position: absolute;
        object-fit: cover;
        top: 0px;
        left: 0px;
        height: 100%;
        opacity: 0.2;
        background-color: #000;
    }
    @keyframes bgmove {
        50% {
            transform: scale(1.1);
        }
    }
`;

const TitleText = styled.div`
    position: relative;
    height: 100%;
    margin: 0px 150px;
    color: var(--color-main-001);

    /* 메인타이틀 CSS */
    .title {
        font-weight: 700;
        font-size: 86px;
    }

    /* 서브 타이틀 CSS */
    .sub-title {
        font-size: 24px;
        font-weight: 300;
        margin-top: 40px;
    }

    /* 설명문 CSS */
    .sub-script {
        width: 45%;
        font-size: 13px;
        font-weight: 300;
        margin-top: 40px;
        line-height: 150%;
    }
`;

const ActButton = styled.div`
    margin-top: 100px;

    /** URL 이동버튼 */

    .store-btn {
        margin-left: 25px;
        padding: 0px 40px;
        width: 250px;
        height: 65px;
        border-radius: 100px;
        background: rgba(255, 255, 255, 1);
        border: none;

        /* 버튼 텍스트 디자인 */
        color: #292929;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 600;
        transition: all ease-in-out 0.1s;
    }

    .store-btn:active {
        transform: scale(0.9);
    }

    .store-btn:hover {
        background: #292929;
        color: #ffffff;
    }
`;

export default SwiperMain;
