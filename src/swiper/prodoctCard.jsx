import styled from 'styled-components';
import { TfiArrowRight, TfiShoppingCartFull } from 'react-icons/tfi';
import { TbShoppingCartShare } from 'react-icons/tb';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';
import { useState } from 'react';

function ProdouctCard({ data }) {
    const [cardData] = useState(data[0]);
    const [item] = useState(cardData.prodouct);

    return (
        <NewProdouctSection>
            <NPTextBox>
                <h1>{cardData.title}</h1>
                <p>{cardData.subtitle}</p>
                <button>
                    <span>More</span>
                    <TfiArrowRight />
                </button>
            </NPTextBox>
            <NPItem>
                <Swiper
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    slidesPerView={4}
                    spaceBetween={20}
                    loop={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {item.map((item, index) => (
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
                            <a
                                href="https://orders.pay.naver.com/ordersheet/seller/dd174c33-318d-82e0-af84-a70d227795e0?backUrl=https%3A%2F%2Fsmartstore.naver.com%2Fcobblesports%2Fproducts%2F11520029652&nl-au=8eab022b74054d5c99c1c75e96ac39ee"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="https://ssl.pstatic.net/store/sell/static/images/btn_green_g.png"
                                    alt="N 구매하기"
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </NPItem>
        </NewProdouctSection>
    );
}

const NewProdouctSection = styled.section`
    display: flex;
    margin: 200px 100px;
`;
/* <-------------------------- BOX 텍스트 섹션 -------------------------------> */

const NPTextBox = styled.aside`
    width: 300px;
    margin-right: 30px;
    color: #343434;

    h1 {
        font-size: 50px;
        font-weight: 700;
    }

    p {
        margin: 40px 0px;
        line-height: 180%;
        font-family: '42dot Sans';
        min-width: 250px;
    }

    button {
        width: 200px;
        height: 70px;
        border-radius: 100px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: rgba(0, 0, 0, 0);
        font-size: 16px;
        font-weight: 600;
        padding: 0px 40px;

        transition: all ease-in-out 0.3s;
        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;
    }

    button:hover {
        width: 250px;
        border: 1px solid rgba(0, 0, 0, 0.5);

        > &:nth-child(2) {
            opacity: 0.3;
        }
    }

    button:active {
        scale: calc(0.9);
    }
`;

const NPItem = styled.aside`
    width: 100%;
    overflow: hidden;
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

export default ProdouctCard;
