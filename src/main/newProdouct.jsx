import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import styled from 'styled-components';
import { TfiArrowRight } from 'react-icons/tfi';

import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { prodouctData } from '../data/prodouctsData';

function NewProdouct() {
    const [item] = useState(prodouctData);

    return (
        <NewProdouctSection>
            <NPTextBox>
                <h1>
                    New <br />
                    Prodouct
                </h1>
                <p>
                    {' '}
                    최신 기술과 트렌드를 반영한 신상품이 입고되었습니다. 러닝, 사이클, 수영, 피트니스 등 다양한 종목에
                    맞춘 최적의 제품을 지금 바로 확인해보세요.
                </p>
                <button>
                    <span>더 많은 제품</span>
                    <TfiArrowRight />
                </button>
            </NPTextBox>
            <NPItem>
                <Swiper
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {item.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="prodoct-image"></div>
                            <ul className="prodoct-color flex-center">
                                {item.option.colorCode.map((color, idx) => (
                                    <Color color={color} key={idx}></Color>
                                ))}
                            </ul>
                            <ul className="prodoct-script">
                                <li>
                                    <h4>{item.title}</h4>
                                    <p>{item.script}</p>
                                </li>
                                <li>
                                    <button> 제품 보러가기 </button>
                                </li>
                            </ul>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </NPItem>
        </NewProdouctSection>
    );
}

const NewProdouctSection = styled.section`
    display: flex;
    margin: 250px 0px;
`;
/* <-------------------------- BOX 텍스트 섹션 -------------------------------> */

const NPTextBox = styled.aside`
    width: 500px;
    margin: 0px 120px 0px 200px;
    color: #343434;

    h1 {
        font-size: 64px;
        font-weight: 700;
    }

    p {
        margin: 40px 0px;
        line-height: 200%;
    }

    button {
        width: 90%;
        height: 70px;
        border-radius: 100px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: rgba(0, 0, 0, 0);
        font-size: 20px;
        font-weight: 400;
        padding: 0px 40px;

        transition: all ease-in-out 0.3s;
        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;
    }

    button:hover {
        width: 100%;
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
        width: 100%;
        height: 480px;
        background-color: #f2f3f6;
        border-radius: 20px;
    }
    /* <-------------------------- Swiper 컬러 아이콘콘 섹션 -------------------------------> */

    .prodoct-color {
    }
    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        display: flex;
        justify-content: space-between;

        h4 {
            font-family: '42dot Sans';
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 15px;
        }

        p {
            font-size: 14px;
            font-weight: 300;
            color: #909090;
        }

        button {
            height: 100%;
            width: 150px;
            font-size: 16px;
            font-weight: 400;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
    }
`;

const Color = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: ${(props) => props.color};
    margin: 40px 5px;
`;

export default NewProdouct;
