import styled from 'styled-components';
import { LuCirclePlus } from 'react-icons/lu';

import { useAtom } from 'jotai';
import { compareMax, compareState, scrollXState } from '../atoms/useIndexState';
import { useEffect, useState } from 'react';
import { formatPrice } from './useFormatPrice';

function Products({ products }) {
    const [scrollX] = useAtom(scrollXState);
    const [slice, setSlice] = useState(10);

    useEffect(() => {
        setSlice(scrollX > 1500 || scrollX <= 860 ? 10 : 9);
    }, [scrollX]);

    const [compareList, setCompareList] = useAtom(compareState);
    const [, setCompareMax] = useAtom(compareMax);

    const handleCompareClick = (productNum) => {
        if (compareList.includes(productNum)) {
            setCompareMax(false);
            setTimeout(() => setCompareMax(true), 10);
            alert('같은 상품은 비교할 수 없습니다. 리스트를 확인해주세요.');
            return;
        }

        if (compareList.length >= 4) {
            setCompareMax(false);
            setTimeout(() => setCompareMax(true), 10);
            return;
        }

        setCompareList([...compareList, productNum]);
    };

    return (
        <ItemBox className="flex-center">
            {products.slice(0, slice).map((item, index) => (
                <Item key={index}>
                    <div className="prodoct-image">
                        <img
                            src={process.env.REACT_APP_PUBLIC_URL + `/asset/` + item.spec?.image[0]}
                            alt={item.script}
                        />
                    </div>
                    <ul className="prodoct-script flex-v-center column">
                        <li className="product-name">
                            <h4>
                                {item.title}, {item.spec.size}
                            </h4>
                            <p>₩ {formatPrice(item.spec.price)}</p>
                        </li>
                        <li className="product-options">
                            <div className="text-column">
                                <strong className="bold">- 배터리</strong>
                                <span>
                                    {' '}
                                    최대 {item.battery.smartwatch}일 / {item.battery.gpsOnly}시간
                                </span>
                            </div>
                            <div className="text-column">
                                <strong className="bold">- 디스플레이</strong>
                                <span> {item.spec.display.type}</span>
                            </div>
                            <div className="text-column">
                                <strong className="bold">- GPS방식 </strong>
                                <span> {item.spec.gps}</span>
                            </div>
                        </li>
                        <button className="product-btn flex-center" onClick={() => handleCompareClick(item.productNum)}>
                            <LuCirclePlus /> 제품 비교하기
                        </button>
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
        gap: 5px;
        border-radius: 100px;
        background-color: #141414;
        color: #f2f3f6;
        border: 1px solid #141414;
        font-weight: 600;
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
