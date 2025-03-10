import React, { useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
import { bestSellersData } from '../data/bestSellersData';

function BestSeller() {
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
        <BestSellerBox>
            <TitleBox>
                <h1>Top Picks</h1>
                <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
            </TitleBox>
            <ItemBox>
                <Swiper
                    autoplay={{
                        delay: 2000,
                    }}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
                    {bestSellersData.map((data, index) => (
                        <SwiperSlide key={index + 1}>
                            <BestItem $bgimg={data.image}>
                                <dl>
                                    <dt className="flex-v-center column">
                                        <span className="item-number flex-center">{index + 1}</span>
                                        <span className="item-title">{formattedTitle(data.subtitle)}</span>
                                    </dt>
                                    <dd className="item-name">{data.title}</dd>
                                </dl>
                                <div className={activeIndex === index ? 'active-slide item-image' : 'item-image'}>
                                    {data.discount && (
                                        <div className="item-discount flex-center">
                                            {data.discount}
                                            <small>%</small>
                                        </div>
                                    )}
                                </div>
                            </BestItem>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ItemBox>
        </BestSellerBox>
    );
}

const BestSellerBox = styled.section`
    width: 100%;
`;

const TitleBox = styled.article`
    margin: 200px 100px 150px 100px;

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

const ItemBox = styled.article`
    padding-left: 20%;
    width: 100%;
`;

const BestItem = styled.div`
    width: 100%;
    color: #242424;
    cursor: pointer;

    .item-number {
        width: 40px;
        height: 40px;
        border-radius: 30px;
        background-color: #dddddd;
        color: #fff;
        font-family: '42dot Sans';
        transition: all ease-in-out 0.3s;
    }

    .item-title {
        font-size: 32px;
        font-weight: 600;
        margin: 20px 0px;
        line-height: 120%;
    }

    .item-name {
        font-size: 18px;
        font-family: '42dot Sans';
    }

    .item-image {
        position: relative;
        margin-top: 50px;
        width: 100%;
        max-width: 350px;
        height: auto;
        aspect-ratio: 4 / 5;
        object-fit: cover;
        background-size: cover;
        background-position: center;
        background-image: url(${process.env.PUBLIC_URL}${(props) => props.$bgimg});
        border-radius: 0px;
        transition: all ease-in-out 0.3s;
    }

    .item-discount {
        position: absolute;
        padding: 20px;
        background: #f35129;
        aspect-ratio: 1 / 1;
        right: 0px;
        font-size: 35px;
        font-weight: 600;
        color: #fff;
        small {
            font-size: 30px;
        }
    }

    .active-slide {
        border-radius: 300px;
        transition: all 1s ease-in-out;
    }

    &:hover .item-number {
        background-color: #232323;
    }
`;

export default BestSeller;
