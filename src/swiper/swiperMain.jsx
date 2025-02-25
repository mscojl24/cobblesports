import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

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
                {/* {videoURL && (
                    <iframe
                        className="video"
                        src={`${videoURL}?autoplay=1&mute=1&playsinline=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&fs=0`}
                        title="garmin YouTube video player"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
                        allowFullScreen></iframe>
                )} */}
                <div className={`${video ? 'background-color' : 'background'}`}></div>
                <TitleText className="flex-center column">
                    <h1 className="title">{formattedTitle}</h1>
                    <span className="sub-title">{subtitle}</span>
                    <span className="sub-script">{description}</span>
                    <ActButton>
                        <button className="store-btn flex-center">
                            <span className="btn-text">{linkBtn.text}</span>
                            {linkBtn.icon}
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
        height: 100%;
        background: linear-gradient(rgba(23, 23, 29, 0.5), #000000);
    }

    .video {
        position: absolute;
        object-fit: cover;
        top: -80px;
        left: 0px;
        width: 100%;
        height: 110%;
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
        text-shadow: 0px 0px 5px #000;
    }

    /* 서브 타이틀 CSS */
    .sub-title {
        font-size: 24px;
        font-weight: 300;
        margin-top: 40px;
        text-shadow: 0px 0px 5px #000;
    }

    /* 설명문 CSS */
    .sub-script {
        width: 45%;
        font-size: 13px;
        font-weight: 300;
        margin-top: 40px;
        line-height: 150%;
        text-shadow: 0px 0px 5px #000;
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

    .btn-text {
        margin-right: 10px;
    }
`;

export default SwiperMain;
