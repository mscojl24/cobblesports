import { useAtom } from 'jotai';
import styled from 'styled-components';
import { productsState, sortProductsState } from '../../atoms/useIndexState';
import { formatPrice } from '../../hooks/useFormatPrice';
import useFilterAndSortProducts from '../../hooks/useSortProductsState';
import { useState } from 'react'; // ✅ 추가
import NotData from './notData';
import { VscChevronDown } from 'react-icons/vsc';
import { RiArrowDownSLine } from 'react-icons/ri';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { LuCirclePlus } from 'react-icons/lu';

function ProductList() {
    const [selectedImageIndexes, setSelectedImageIndexes] = useState({});
    const [imageLoading, setImageLoading] = useState({}); // ✅ 이미지 로딩 상태
    const [products] = useAtom(sortProductsState);
    useFilterAndSortProducts();

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
                                    {/* ✅ 로딩 중일 때 백그라운드 처리 */}
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
                                                <ColorCircle style={{ backgroundColor: color.colorCode }} />
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
                                    {/* <div className="pro-spec">
                                        <span>
                                            {item.spec.display.color} {item.spec.display.type} 디스플레이 ·{' '}
                                            {item.spec.band} 밴드 · {item.spec.weight}
                                        </span>
                                    </div> */}
                                </TitleBox>

                                <SpecBox>
                                    <span>
                                        {item.spec.display.touch && '터치형'} {item.spec.display.type}{' '}
                                        {item.spec.display.color} 디스플레이 | 배터리 최대 {item.battery.smartwatch}일
                                        지속 | 방수등급 {item.waterProof.waterRating} | 메모리 크기 {item.option.memory}{' '}
                                        | 디스플레이 크기 {item.spec.display.size}
                                    </span>
                                </SpecBox>
                                <PriceBox className="flex-center column">
                                    <div className="price-text">
                                        <span>최종가</span>
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

                                <BtnBox className="flex-center column">
                                    <button>구매하기</button>
                                    <button className="compare flex-center">
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
        z-index: 5;
    }
`;

/* ✅ NEW 배지 스타일 -------------------------------------------------*/
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
    margin: 10px 0px;

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
        border-radius: 100px;
        margin: 5px;
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
`;
