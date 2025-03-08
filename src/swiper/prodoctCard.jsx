import styled from 'styled-components';
import { TfiArrowRight, TfiShoppingCartFull } from 'react-icons/tfi';
import { TbShoppingCartShare } from 'react-icons/tb';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';
import { useState } from 'react';

function ProdouctCard({ products }) {
    return (
        <NPItem>
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                slidesPerView={5}
                spaceBetween={20}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {products.map((item, index) => (
                    <SwiperSlide key={index}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </NPItem>
    );
}

const NPItem = styled.aside`
    width: 100%;
    overflow: hidden;
    padding: 100px 0px;
    /* <-------------------------- Swiper 이미지지 섹션 -------------------------------> */

    .prodoct-image {
        aspect-ratio: 4/5;

        background-color: #f2f3f6;
        cursor: pointer;
        /* border-radius: 20px; */
    }
    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        display: flex;
        justify-content: space-between;

        h4 {
            font-family: '42dot Sans';
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        p {
            font-family: '42dot Sans';
            font-weight: 300;
            color: rgba(0, 0, 0, 0.7);
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

export default ProdouctCard;
