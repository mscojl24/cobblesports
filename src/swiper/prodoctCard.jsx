import styled from 'styled-components';
import { TfiArrowRight, TfiShoppingCartFull } from 'react-icons/tfi';
import { TbShoppingCartShare } from 'react-icons/tb';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { scrollXState } from '../atoms/useIndexState';

function ProdouctCard({ products }) {
    const [scrollX] = useAtom(scrollXState);
    const [slidesPerView, setSlidesPerView] = useState(5);

    useEffect(() => {
        setSlidesPerView(scrollX > 1500 ? 5 : scrollX > 860 ? 3 : 2);
    }, [scrollX]);

    return (
        <NPItem>
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                slidesPerView={slidesPerView}
                spaceBetween={10}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper">
                {products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ProductsImg className="flex-center">
                            <img
                                src={process.env.REACT_APP_PUBLIC_URL + `/asset/` + item.option?.img?.mainImg}
                                alt={item.script}></img>
                        </ProductsImg>
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
    padding: 100px 10px;

    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        display: flex;
        justify-content: space-between;

        h4 {
            font-family: '42dot Sans';
            font-size: clamp(14px, 2vw, 18px);
            font-weight: 500;
            margin-bottom: 7px;
        }

        p {
            font-family: '42dot Sans';
            font-size: clamp(14px, 2vw, 16px);
            font-weight: 300;
            color: rgba(0, 0, 0, 0.7);
        }

        button {
            cursor: pointer;
            height: 100%;
            padding: 10px;
            aspect-ratio: 1/1;
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

const ProductsImg = styled.div`
    /* <-------------------------- Swiper 이미지지 섹션 -------------------------------> */
    width: 100%;
    aspect-ratio: 1/1.1;
    cursor: pointer;

    img {
        width: 100%;
        object-fit: cover;
    }
    background-color: #f5f5f5;
`;

/* <-------------------------- Swiper 컬러 아이콘 섹션 -------------------------------> */

const ColorIcon = styled.li`
    width: 10px;
    height: 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.color};
    margin: 30px 5px;

    @media (max-width: 860px) {
        margin: 20px 5px;
    }
`;

export default ProdouctCard;
