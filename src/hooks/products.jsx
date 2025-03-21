import styled from 'styled-components';
import { TbShoppingCartShare } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { scrollXState } from '../atoms/useIndexState';
import { useEffect, useState } from 'react';

function Products({ products }) {
    const [scrollX] = useAtom(scrollXState);
    const [slice, setSlice] = useState(10);

    useEffect(() => {
        setSlice(scrollX > 1500 || scrollX <= 860 ? 10 : 9);
    }, [scrollX]);

    return (
        <ItemBox className="flex-center">
            {products.slice(0, slice).map((item, index) => (
                <Item key={index}>
                    <div className="prodoct-image">
                        <img
                            src={process.env.REACT_APP_PUBLIC_URL + `/asset/` + item.option?.img?.mainImg}
                            alt={item.script}
                        />
                    </div>
                    <ul className="prodoct-script flex-v-center column">
                        <li className="product-name">
                            <h4>{item.title}</h4>
                            <p>₩ {item.option.price}</p>
                        </li>
                        <li className="product-options">
                            <div className="text-column">
                                <strong className="bold">- 배터리</strong>
                                <span>
                                    {' '}
                                    최대 {item.battery.smartwatch} / {item.battery.gpsOnly}
                                </span>
                            </div>
                            <div className="text-column">
                                <strong className="bold">- 디스플레이</strong>
                                <span> {item.option.display.type}</span>
                            </div>
                            <div className="text-column">
                                <strong className="bold">- GPS방식 </strong>
                                <span> {item.spec.gps}</span>
                            </div>
                        </li>
                        <button className="product-btn">제품 상세보기</button>
                    </ul>
                </Item>
            ))}
        </ItemBox>
    );
}

export default Products;

const ItemBox = styled.div`
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    /* border: 1px solid red; */

    @media (max-width: 860px) {
        gap: 6px;
    }
`;

const Item = styled.div`
    flex: 0 1 calc(100% / 5 - 10px);
    overflow: hidden;
    transition: all ease-in-out 0.5s;

    @media (max-width: 1500px) {
        flex: 0 1 calc(100% / 3 - 10px);
    }

    @media (max-width: 860px) {
        flex: 0 1 calc(100% / 2 - 10px); /* 2개 */
    }

    /* <-------------------------- Swiper 이미지지 섹션 -------------------------------> */

    .prodoct-image {
        aspect-ratio: 1/1;
        background-color: #f8f8f8;

        cursor: pointer;
        /* border-radius: 20px; */

        img {
            width: 100%;
        }

        @media (max-width: 860px) {
            aspect-ratio: 4/5;
        }
    }
    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        padding: 20px;
        margin: 0px 0px;
        display: flex;
        background-color: #f8f8f8;

        h4 {
            font-family: '42dot Sans';
            font-size: clamp(16px, 2vw, 18px);
            font-weight: 500;
        }

        p {
            font-family: '42dot Sans';
            font-size: clamp(14px, 2vw, 16px);
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
            margin-top: 5px;
        }

        @media (max-width: 860px) {
            padding: 10px;
        }
    }

    .text-column {
        @media (max-width: 860px) {
            display: flex;
            justify-content: left;
            flex-direction: column;

            .bold {
                margin-bottom: 7px;
            }
        }
    }
    .product-name {
        padding: 15px 0px;
    }

    .product-options {
        padding: 20px 0px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);

        margin-top: 10px;
        font-size: clamp(12px, 2vw, 14px);
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
    }

    .product-options span {
        font-family: '42dot Sans';
    }

    .product-options > * {
        margin: 10px 0px;
    }

    .product-options .bold {
        font-weight: 600;
    }

    .product-btn {
        background-color: #141414;
        color: #f2f3f6;
        border: 1px solid #141414;
        font-weight: 400;
        transition: all ease-in-out 0.3s;
        cursor: pointer;
        @media (max-width: 860px) {
            font-size: 14px;
        }
    }

    .product-btn:hover {
        background-color: #ffffff;
        color: #141414;
        border: 1px solid #141414;
    }
`;
