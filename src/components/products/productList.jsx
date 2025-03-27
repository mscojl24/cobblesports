import { useAtom } from 'jotai';
import styled from 'styled-components';
import { productsState, sortProductsState } from '../../atoms/useIndexState';
import { formatPrice } from '../../hooks/useFormatPrice';
import useFilterAndSortProducts from '../../hooks/useSortProductsState';
import { useState } from 'react'; // ✅ 추가

function ProductList() {
    const [selectedImageIndexes, setSelectedImageIndexes] = useState({}); // 각 카드 인덱스 추적 state
    const [products] = useAtom(sortProductsState);
    useFilterAndSortProducts();

    const handleColorClick = (productIndex, colorIndex) => {
        setSelectedImageIndexes((prev) => ({
            ...prev,
            [productIndex]: colorIndex,
        }));
    };

    return (
        <ProductListBox className="flex-center column">
            <ProductsCardBox className="flex-v-center">
                {products.length > 0 ? (
                    products.map((item, index) => {
                        const discount = item.spec.discount;
                        const price = item.spec.price;

                        const selectedIndex = selectedImageIndexes[index] ?? 0;
                        const selectedImage = item.spec?.image[selectedIndex];

                        const isNew = (() => {
                            if (!item.spec.release) return false;
                            const releaseDate = new Date(item.spec.release);
                            const now = new Date();
                            const fourMonthsAgo = new Date();
                            fourMonthsAgo.setMonth(now.getMonth() - 4);
                            return releaseDate >= fourMonthsAgo;
                        })();

                        return (
                            <ProductCard key={index}>
                                <div className="product-image">
                                    <div className="badge-box">
                                        {isNew && (
                                            <NewBadge>
                                                NEW
                                                <br />
                                                2025
                                            </NewBadge>
                                        )}
                                        {discount && (
                                            <SaleBadge>
                                                ON
                                                <br />
                                                SALE
                                            </SaleBadge>
                                        )}
                                        <PointBadge>
                                            네이버
                                            <br />
                                            적립5%
                                        </PointBadge>
                                    </div>
                                    <img
                                        src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${selectedImage}`}
                                        alt={item.title}
                                    />
                                </div>

                                <ul className="product-color flex-center">
                                    {item.spec.color.map((color, idx) => (
                                        <ColorIcon
                                            className="flex-center"
                                            key={idx}
                                            onClick={() => handleColorClick(index, idx)}
                                            isSelected={selectedIndex === idx}>
                                            <ColorCircle style={{ backgroundColor: color.colorCode }} />
                                            {color.colorName}
                                        </ColorIcon>
                                    ))}
                                </ul>

                                <TitleBox>
                                    <span className="pro-script">{item.script}</span>
                                    <h1 className="pro-title">
                                        {item.title}, {item.spec.size}
                                        <span>
                                            {' '}
                                            · {item.spec.display.color} {item.spec.display.type} 디스플레이
                                        </span>
                                        {/* <span> · {item.option.bezelmaterial}</span> */}
                                        <span> · {item.spec.band} 밴드</span>
                                        <span> · {item.spec.weight}</span>
                                    </h1>
                                </TitleBox>

                                <PriceBox className="flex-center column">
                                    <div className="pro-price flex-justfit">
                                        <div className="price-text">
                                            {discount && <em>{formatPrice(price)}원</em>} <br />
                                            <span>최종가</span>{' '}
                                            {discount ? (
                                                <strong>{formatPrice(discount)}원</strong>
                                            ) : (
                                                <strong>{formatPrice(price)}원</strong>
                                            )}
                                        </div>
                                    </div>
                                </PriceBox>
                            </ProductCard>
                        );
                    })
                ) : (
                    <p>❌ 연관된 제품 데이터를 찾을 수 없습니다</p>
                )}
            </ProductsCardBox>
        </ProductListBox>
    );
}

export default ProductList;

/* ✅ 리스트 컨테이너 스타일 */
const ProductListBox = styled.ul`
    width: 100%;
    height: 100%;
    padding: 20px;

    overflow-y: auto;
    display: flex;
    justify-content: center;

    @media (max-width: 860px) {
        background-color: #f7f7f7;
    }
`;

const ProductsCardBox = styled.section`
    justify-content: left;
    flex-wrap: wrap;
    gap: 10px;
    transition: all ease-in-out 0.3s;
    margin: 20px;

    @media (max-width: 860px) {
        margin: 0px;
    }
`;

/* ✅ 제품 카드 스타일 */
const ProductCard = styled.li`
    position: relative;
    width: calc(100% / 3 - 10px);
    background: #fff;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .product-image {
        position: relative;
        text-align: center;
        width: 100%;
        img {
            aspect-ratio: 1/1;
            width: 80%;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    .product-color {
        flex-wrap: wrap;
    }
    @media (max-width: 1500px) {
        width: calc(100% / 3 - 20px);
        .product-image img {
            width: 90%;
        }
    }

    @media (max-width: 860px) {
        width: calc(100% / 2 - 20px);
        background-color: #fff;

        .product-image img {
            width: 100%;
        }
    }

    .badge-box {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

/* ✅ NEW 배지 스타일 */
const NewBadge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: #ff9900;
    color: white;
    font-size: 12px;
    font-weight: 600;
    font-family: '42dot Sans';
    border-radius: 60px;
    margin: 5px 0px;
`;

const SaleBadge = styled(NewBadge)`
    background: #ff5512;
`;

const PointBadge = styled(NewBadge)`
    background: linear-gradient(-45deg, #747dff, #1dee9e);
`;

const ColorCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

/* ✅ 컬러 아이콘 스타일 */
const ColorIcon = styled.li`
    padding: 5px 15px;
    border-radius: 100px;
    border: 1px solid ${({ isSelected }) => (isSelected ? 'rgba(0,0,0,0.7)' : ' rgba(0,0,0,0.1)')};
    font-size: 12px;
    background-color: #fff;
    color: ${({ isSelected }) => (isSelected ? '#000' : ' #000')};
    margin: 5px 3px;
    cursor: pointer;
    gap: 5px;

    &:hover {
        background-color: #f6f6f7;
    }

    @media (max-width: 860px) {
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
`;

/* ✅ 제품 제목 & 설명 */
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 30px 0px;

    .pro-script {
        display: inline-block; /* ✅ 텍스트 길이에 따라 너비 조절 */
        align-self: flex-start; /* ✅ 부모 column flex 안에서 왼쪽 정렬 */
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        background-color: #fafafa;
        font-family: '42dot Sans';
        line-height: 1.5;
        font-size: 14px;
        font-weight: 500;
        padding: 5px 10px;
        color: rgba(0, 0, 0, 0.7);
    }
    .pro-title {
        font-family: '42dot Sans';
        font-size: clamp(13px, 4vw, 20px);
        font-weight: 600;
        line-height: 1.5;

        span {
            font-size: 16px;
            font-weight: 400;
            font-family: '42dot Sans';
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;

const PriceBox = styled.div`
    width: 100%;
    padding: 30px 0px;

    .pro-price {
        width: 100%;

        em {
            text-decoration: line-through;
            font-family: '42dot Sans';
            color: rgba(0, 0, 0, 0.5);
        }

        strong {
            font-size: 20px;
            font-weight: 800;
            font-family: '42dot Sans';
        }
    }
    .price-num {
        gap: 5px;
    }

    .pro-price,
    .price-num {
        display: flex;
    }

    .price-text {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        border-radius: 5px;
        font-size: 14px;
    }

    .flex-justfit {
        display: flex;
        justify-content: space-between;
    }
`;
