import styled from 'styled-components';
import { TbShoppingCartShare } from 'react-icons/tb';

function Products({ products }) {
    return (
        <ItemBox className="flex-h-center">
            {products.slice(0, 10).map((item, index) => (
                <Item key={index}>
                    <div className="prodoct-image"></div>
                    <ul className="prodoct-script flex-v-center column">
                        <li className="product-name">
                            <h4>{item.title}</h4>
                            <p>₩ {item.option.price}</p>
                        </li>
                        <li className="product-options">
                            <p>- {item.spec.band} 호환가능</p>
                            <div>
                                <strong className="bold">- 배터리사양</strong>
                                <span>
                                    {' '}
                                    최대{item.battery.smartwatch} / {item.battery.gpsOnly}
                                </span>
                            </div>
                            <div>
                                <strong className="bold">- 디스플레이</strong>
                                <span> {item.option.display.type}</span>
                            </div>
                            <div>
                                <strong className="bold">- GPS방식</strong>
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
    gap: 20px;
    flex-wrap: wrap;
    /* border: 1px solid red; */
`;

const Item = styled.div`
    flex: 0 1 calc(100% / 5 - 20px);
    overflow: hidden;
    /* <-------------------------- Swiper 이미지지 섹션 -------------------------------> */

    .prodoct-image {
        aspect-ratio: 1/1;
        background-color: #f8f8f8;
        border-radius: 10px;
        cursor: pointer;
        /* border-radius: 20px; */
    }
    /* <-------------------------- Swiper 스크립트 섹션 -------------------------------> */
    .prodoct-script {
        padding: 20px;
        margin: 20px 0px;
        display: flex;
        background-color: #f8f8f8;
        border-radius: 10px;

        h4 {
            font-family: '42dot Sans';
            font-size: 18px;
            font-weight: 500;
            margin: 10px 0px;
        }

        p {
            font-family: '42dot Sans';
            /* font-size: 14px; */
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
        }
    }

    .product-name {
        margin: 10px 0px;
    }

    .product-options {
        padding: 20px 0px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);

        margin-top: 10px;
        font-size: 14px;
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
    }

    .product-btn:hover {
        background-color: #ffffff;
        color: #141414;
        border: 1px solid #141414;
    }
`;
