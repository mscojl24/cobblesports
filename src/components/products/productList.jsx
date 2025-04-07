import { useAtom } from 'jotai';
import styled from 'styled-components';
import { productsState, sortProductsState, compareState, compareMax, popupTextState } from '../../atoms/useIndexState';
import { formatPrice } from '../../hooks/useFormatPrice';
import useFilterAndSortProducts from '../../hooks/useSortProductsState';
import { useState } from 'react';
import NotData from './notData';
import { RiArrowDownSLine } from 'react-icons/ri';
import { LuCirclePlus } from 'react-icons/lu';

function ProductList() {
    const [selectedImageIndexes, setSelectedImageIndexes] = useState({});
    const [imageLoading, setImageLoading] = useState({});
    const [products] = useAtom(sortProductsState);
    const [, setPopupText] = useAtom(popupTextState);
    useFilterAndSortProducts();

    const [compareList, setCompareList] = useAtom(compareState);
    const [, setCompareMax] = useAtom(compareMax);

    const handleBuyClick = (productNum) => {
        const url = `https://smartstore.naver.com/cobblesports/products/${productNum}`;
        window.open(url, '_blank');
    };

    const handleCompareClick = (productNum) => {
        if (compareList.includes(productNum)) {
            setCompareMax(false);
            setTimeout(() => setCompareMax(true), 10);
            setPopupText('같은 상품은 비교할 수 없습니다. 리스트를 확인해주세요.');
            return;
        }

        if (compareList.length >= 4) {
            setCompareMax(false);
            setTimeout(() => setCompareMax(true), 10);
            setPopupText('비교 상품은 총 4개까지 선택이 가능합니다.');
            return;
        }

        setCompareList([...compareList, productNum]);
    };

    const handleColorClick = (productIndex, colorIndex) => {
        setSelectedImageIndexes((prev) => ({
            ...prev,
            [productIndex]: colorIndex,
        }));

        setImageLoading((prev) => ({
            ...prev,
            [productIndex]: true,
        }));
    };

    const handleImageLoad = (productIndex) => {
        setImageLoading((prev) => ({
            ...prev,
            [productIndex]: false,
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
                                <div className="flex-center column">
                                    <div className="product-image">
                                        <div className="badge-box">
                                            {isNew && <NewBadge>NEW 2025</NewBadge>}
                                            {discount && <SaleBadge>ON SALE</SaleBadge>}
                                            <PointBadge>네이버 적립5%</PointBadge>
                                        </div>
                                        <div className="image-wrapper">
                                            {imageLoading[index] && (
                                                <ImagePlaceholder className="flex-center">Loging...</ImagePlaceholder>
                                            )}
                                            <img
                                                src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${selectedImage}`}
                                                alt={item.title}
                                                onLoad={() => handleImageLoad(index)}
                                                style={{ opacity: imageLoading[index] ? 0 : 1 }}
                                            />
                                        </div>
                                    </div>

                                    <ul className="product-color flex-center">
                                        <RiArrowDownSLine className="select-icon" />
                                        <ColorIcon
                                            value={selectedIndex}
                                            onChange={(e) => handleColorClick(index, Number(e.target.value))}>
                                            {item.spec.color.map((color, idx) => (
                                                <option key={idx} value={idx}>
                                                    {color.colorName}
                                                </option>
                                            ))}
                                        </ColorIcon>
                                    </ul>

                                    <TitleBox className="flex-center">
                                        <h1 className="pro-title">
                                            {item.title}, {item.spec.size}
                                        </h1>
                                        <em className="pro-script">{item.script}</em>
                                    </TitleBox>

                                    <PriceBox className="flex-center column">
                                        <div className="price-text">
                                            <span className="price-tag">최종가</span>
                                            <strong>
                                                {formatPrice(discount ?? price)}원{' '}
                                                {discount && (
                                                    <em className="discount-text">
                                                        -{Math.round(((price - discount) / price) * 100)}% 할인
                                                    </em>
                                                )}
                                            </strong>
                                        </div>
                                    </PriceBox>
                                </div>

                                <BtnBox className="flex-center column">
                                    <button onClick={() => handleBuyClick(item.productNum)}>구매하기</button>
                                    <button
                                        className="compare flex-center"
                                        onClick={() => handleCompareClick(item.productNum)}>
                                        <LuCirclePlus />
                                        비교하기
                                    </button>
                                </BtnBox>
                            </ProductCard>
                        );
                    })
                ) : (
                    <NotData />
                )}
            </ProductsCardBox>
        </ProductListBox>
    );
}

export default ProductList;

const ImagePlaceholder = styled.div`
    position: absolute;
    display: flex;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;

    border-radius: 10px;
    font-family: 'Big Shoulders';
    color: rgba(0, 0, 0, 0.3);
    font-weight: bold;
    font-size: 20px;
`;

/* ✅ 리스트 컨테이너 스타일 */
const ProductListBox = styled.ul`
    width: 100%;
    height: 100%;
    padding: 20px;

    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    align-items: end;

    @media (max-width: 860px) {
        padding: 0px;
    }
`;

const ProductsCardBox = styled.section`
    justify-content: left;
    flex-wrap: wrap;
    transition: all ease-in-out 0.3s;
    margin: 20px;

    border: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: 860px) {
        margin: 0px;
        border: none;
    }
`;

/* ✅ 제품 카드 스타일 */
const ProductCard = styled.li`
    position: relative;
    width: calc(100% / 3);
    background: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
    padding: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .image-wrapper {
        position: relative;
        width: 100%;
        text-align: center;

        img {
            width: 80%;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 10px;
            transition: opacity 0.3s ease-in-out;
        }
    }

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
        position: relative;
        flex-wrap: wrap;
        max-width: 130px;
        width: 100%;

        .select-icon {
            position: absolute;
            right: 5px;
            color: rgba(0, 0, 0, 0.3);
        }
    }

    @media (max-width: 1500px) {
        width: calc(100% / 2);
        .product-image img {
            width: 100%;
        }
    }

    .badge-box {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 5;
    }

    @media (max-width: 860px) {
        .badge-box {
            display: flex;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 5;
            gap: 5px;
        }
        padding: 10px;
    }
`;

/* ✅ NEW 배지 스타일 -------------------------------------------------*/
const NewBadge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: hsl(213.96825396825398, 100%, 62.94117647058823%);
    color: white;
    font-size: 12px;
    font-weight: 600;
    font-family: '42dot Sans';
    border-radius: 50px;
    margin: 5px 0px;
    padding: 7px;

    @media (max-width: 860px) {
        font-size: 10px;
        width: auto;
        padding: 5px 10px;
        border-radius: 0px;
        height: 30px;
    }
`;

const SaleBadge = styled(NewBadge)`
    background: #f3703c;
`;

const PointBadge = styled(NewBadge)`
    background: #212221;

    @media (max-width: 860px) {
        background: #f7f7f7;
        color: #000;
    }
`;

const ColorCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

/* ✅ 컬러 아이콘 스타일 -------------------------------------------------*/
const ColorIcon = styled.select`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    font-family: '42dot Sans';
    font-size: 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-radius: 50px;
    cursor: pointer;
    text-align: center;
    appearance: none;

    &:hover {
        background-color: #f6f6f6;
    }

    option {
        padding: 8px;
    }
`;

/* ✅ 제품 제목 & 설명 -------------------------------------------------*/
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 20px 0px;

    .pro-script {
        display: inline-block; /* ✅ 텍스트 길이에 따라 너비 조절 */
        /* align-self: flex-start; */
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        background-color: #fafafa;
        font-family: '42dot Sans';
        line-height: 1.3;
        font-size: 13px;
        padding: 5px 10px;
        color: rgba(0, 0, 0, 0.5);
    }
    .pro-title {
        font-family: '42dot Sans';
        font-size: clamp(13px, 4vw, 20px);
        font-weight: 600;
        margin: 5px 0px;
        text-align: center;
    }

    .pro-spec {
        span {
            font-size: 14px;
            font-weight: 400;
            font-family: '42dot Sans';
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;

/* ✅ 가격 표기 -------------------------------------------------*/

const PriceBox = styled.div`
    width: 100%;

    .price-text {
        width: 100%;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span {
            font-size: 13px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 5px 10px;
            border-radius: 30px;
            color: rgba(0, 0, 0, 0.8);
            background-color: #f8f8f8;
        }

        strong {
            font-family: '42dot Sans';
            font-size: 22px;
            font-weight: bold;

            @media (max-width: 1500px) {
                font-size: 18px;
            }
        }
    }

    .discount-text {
        width: 100%;
        font-family: '42dot Sans';
        font-size: 14px;
        font-weight: bold;
        color: #cc3e3e;
    }

    .flex-justfit {
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 1500px) {
        .price-tag {
            display: none;
        }
    }
`;

const SpecBox = styled.div`
    width: 100%;
    margin: 10px 0px;
    text-align: center;

    span {
        font-family: '42dot Sans';
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
    }
`;

const BtnBox = styled.div`
    width: 100%;
    margin: 20px 0px;
    button {
        width: 100%;
        border-radius: 10px;
        margin: 7px;
        font-weight: 600;
        cursor: pointer;
    }

    button:hover {
        border: 1px solid #000;
    }

    .compare {
        gap: 8px;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.9);
        color: #fff;
    }

    .compare:hover {
        border: 1px solid rgba(0, 0, 0, 0.5);
        background: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 860px) {
        button {
            border-radius: 0px;
            margin: 3px;
            font-size: 14px;
        }
    }
`;
