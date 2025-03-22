import { useAtom } from 'jotai';
import styled from 'styled-components';
import { productsState, sortProductsState } from '../../atoms/useIndexState';
import { formatPrice } from '../../hooks/useFormatPrice';
import useFilterAndSortProducts from '../../hooks/useSortProductsState';

function ProductList() {
    const [products] = useAtom(sortProductsState); // ✅ 필터링된 리스트 사용
    useFilterAndSortProducts();

    const excelDateToJSDate = (excelDate) => {
        if (!excelDate || isNaN(excelDate)) return null;
        return new Date(1900, 0, excelDate - 1);
    };

    return (
        <ProductListBox className="flex-center column">
            <ProductsCardBox className="flex-v-center">
                {products.length > 0 ? (
                    products.map((item, index) => {
                        const releaseDate = excelDateToJSDate(item.option?.release);
                        const currentDate = new Date();
                        const fourMonthsAgo = new Date();
                        fourMonthsAgo.setMonth(currentDate.getMonth() - 4);

                        const isNew = releaseDate && releaseDate > fourMonthsAgo;
                        const discount = item.option.discount;
                        const price = item.option.price;

                        return (
                            <ProductCard key={index}>
                                <TitleBox>
                                    {isNew && <NewBadge>NEW</NewBadge>}
                                    <p className="pro-script">{isNew}</p>
                                    <p className="pro-script">{item.script}</p>
                                    <h1 className="pro-title">
                                        {item.title}
                                        <span> · {item.option.display.type} 디스플레이</span>
                                        <span> · {item.option.size}</span>
                                        <span> · {item.option.weight}</span>
                                    </h1>
                                </TitleBox>

                                <div className="product-image">
                                    <img
                                        src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${item.option?.img?.mainImg[1]}`}
                                        alt={item.title}
                                    />
                                </div>

                                <ul className="product-color flex-center">
                                    {item.option.colorName.map((color, idx) => (
                                        <ColorIcon key={idx}>{color}</ColorIcon>
                                    ))}
                                </ul>

                                <PriceBox className="flex-center column">
                                    <div className="pro-price flex-justfit">
                                        <div className="price-text">구매가</div>
                                        <div className="price-num flex-center">
                                            {discount ? (
                                                <>
                                                    <em>{formatPrice(price)}원</em>
                                                    <strong>{formatPrice(discount)}원</strong>
                                                </>
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
`;

/* ✅ NEW 배지 스타일 */
const NewBadge = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #e65c5c;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
`;

/* ✅ 컬러 아이콘 스타일 */
const ColorIcon = styled.li`
    padding: 5px 15px;
    border-radius: 100px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 12px;
    background-color: #fff;
    background-color: ${(props) => props.color};
    margin: 5px 3px;
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(49, 80, 255, 0.2);
        color: #2f67ff;
    }

    @media (max-width: 860px) {
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
`;

/* ✅ 제품 제목 & 설명 */
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px 0px;

    gap: 10px;

    .pro-script {
        font-size: 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.3);
    }
    .pro-title {
        font-family: '42dot Sans';
        font-size: clamp(13px, 4vw, 20px);
        font-weight: 600;
        line-height: 1.5;

        span {
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
