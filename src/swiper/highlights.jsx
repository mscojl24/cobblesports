import React, { useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
import { bestSellersData } from '../data/bestSellersData';
import { prodouctData } from '../data/prodouctsData';
import { TbShoppingCartShare } from 'react-icons/tb';

function Highlights() {
    const [activeIndex, setActiveIndex] = useState(0);

    function formattedTitle(title) {
        return title.split('/').map((word, index) => (
            <p key={index}>
                {word}
                <br />
            </p>
        ));
    }
    return (
        <HighlightsBox>
            <HighlightTitleBox className="flex-center column">
                <h1>Full Collection</h1>
                <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
            </HighlightTitleBox>
            <HighlightItem className="flex-center">
                {prodouctData.map((item, index) => (
                    <div key={index} className="item-box">
                        <div className="prodoct-image"></div>
                        <ul className="prodoct-color flex-center">
                            {item.option.colorCode.map((color, idx) => (
                                <ColorIcon color={color} key={idx}></ColorIcon>
                            ))}
                        </ul>
                        <ul className="prodoct-script">
                            <li>
                                <h4>{item.title}</h4>
                                <p>₩ {item.option.price}</p>
                            </li>
                            <li>
                                <button className="flex-center">
                                    <TbShoppingCartShare />
                                </button>
                            </li>
                        </ul>
                    </div>
                ))}
            </HighlightItem>
        </HighlightsBox>
    );
}

const HighlightsBox = styled.section`
    width: 100%;
`;

const HighlightTitleBox = styled.article`
    margin: 400px 0px 200px 0px;
    h1 {
        font-family: Anton;
        font-size: 65px;
        color: #242424;
    }

    p {
        margin-top: 20px;
        font-size: 25px;
    }
`;

const HighlightItem = styled.aside`
    width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
    gap: 20px;

    .item-box {
        flex-basis: calc(23% - 100px);
    }
    /* <-------------------------- Swiper 이미지지 섹션 -------------------------------> */

    .prodoct-image {
        cursor: pointer;
        width: 100%;
        height: 400px;
        background-color: #f2f3f6;
        /* border-radius: 20px; */
    }
    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        display: flex;
        justify-content: space-between;

        h4 {
            font-family: '42dot Sans';
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        p {
            font-family: '42dot Sans';
            font-size: 16px;
            font-weight: 300;
            color: #909090;
        }

        button {
            cursor: pointer;
            height: 100%;
            width: 50px;
            padding: 0px;
            font-size: px;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #909090;
            transition: all ease-in-out 0.3s;
        }

        button:hover {
            background-color: #1f1f1f;
            color: #f1f1f1;
            border: 1px solid rgba(0, 0, 0, 0);
        }
    }
`;
/* <-------------------------- Swiper 컬러 아이콘콘 섹션 -------------------------------> */

const ColorIcon = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.color};
    margin: 30px 5px;
`;

export default Highlights;
