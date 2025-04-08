import { useAtom } from 'jotai';
import styled from 'styled-components';
import { compareState, popupTextState, productsState } from '../../atoms/useIndexState';
import { MdClose } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import SelectListPopup from './selectListPopup';

function CompareProduct() {
    const [compareList, setCompareList] = useAtom(compareState);
    const [product] = useAtom(productsState);
    const [, setPopupText] = useAtom(popupTextState);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupIndex, setPopupIndex] = useState(null);

    const compareProducts = product.filter((item) => compareList.includes(String(item.productNum)));

    const handleRemove = (productNum) => {
        setCompareList((prev) => prev.filter((num) => num !== String(productNum)));

        setPopupText('');
        setTimeout(() => {
            setPopupText('비교 상품이 제거되었습니다.');
        }, 10);
    };

    // 최대 4개 고정 배열 생성
    const paddedList = Array(4)
        .fill(null)
        .map((_, idx) => compareProducts[idx] ?? null);

    return (
        <CompareList className="flex-center">
            {paddedList.map((item, index) => (
                <CompareItemCard key={index} className="flex-center column">
                    {item ? (
                        <MainInfo>
                            <ItemImage className="flex-center">
                                <RemoveBtn
                                    onClick={() => handleRemove(item.productNum)}
                                    className="delete-icon flex-center">
                                    <MdClose />
                                </RemoveBtn>
                                <img
                                    src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${item.spec.image[0]}`}
                                    alt={item.title}
                                />
                            </ItemImage>

                            <MainInfo>
                                <div className="title-box flex-center column">
                                    <h1>{item.title}</h1>
                                    <em>{item.subtitle}</em>
                                </div>
                            </MainInfo>

                            <DetailedInfo></DetailedInfo>
                        </MainInfo>
                    ) : (
                        <ItemImage
                            className="flex-center column pointer"
                            onClick={() => {
                                setPopupIndex(index);
                                setIsPopupOpen(true);
                            }}>
                            <AiOutlinePlus className="plus-icon" />
                            <span className="plus-text">비교할 제품을 선택해 주세요</span>
                        </ItemImage>
                    )}
                </CompareItemCard>
            ))}
            {isPopupOpen && (
                <SelectListPopup
                    onClose={() => setIsPopupOpen(false)}
                    compareList={compareList}
                    setCompareList={setCompareList}
                    setPopupText={setPopupText}
                />
            )}
        </CompareList>
    );
}

export default CompareProduct;

const CompareList = styled.ul`
    width: 100%;
    overflow-x: scroll;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const CompareItemCard = styled.li`
    width: calc(100% / 4);
    min-width: 220px;
    padding: 1px;
    height: 100%;
    background: #fff;

    &:last-child {
        border-right: none;
    }
`;

// 이미지 박스 섹션----------------------------------------------------------------//

const ItemImage = styled.div`
    background: linear-gradient(rgba(67, 86, 92, 0.1), rgba(255, 255, 255, 0));
    text-align: center;
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
    gap: 10px;

    img {
        width: 100%;
    }

    .plus-icon {
        font-size: clamp(90px, 2vw, 120px);
        animation: opacity 2s ease-in-out infinite;
    }

    .plus-text {
        font-size: 18px;
        opacity: 0.2;
    }

    .pointer {
        cursor: pointer;
    }

    @keyframes opacity {
        0% {
            opacity: 0.1;
        }

        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 0.1;
        }
    }
`;

const RemoveBtn = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;

    background-color: #fff;
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 600;
    border-radius: 50px;
    color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border: none;

    gap: 5px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;

    &:hover {
        transform: rotate(180deg);
        color: #000000;
        box-shadow: 0px 0px 10px rgba(43, 8, 8, 0.2);
    }

    @media (max-width: 1500px) {
        top: 10px;
        right: 10px;
        padding: 6px;
    }
`;

// 메인 정보 섹션----------------------------------------------------------------//

const MainInfo = styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;

    .title-box {
        * {
            text-align: center;
            font-family: '42dot Sans';
        }

        gap: 5px;

        h1 {
            font-size: clamp(16px, 2vw, 24px);
            font-weight: 600;
        }

        em {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;

// 디테일 정보 섹션----------------------------------------------------------------//

const DetailedInfo = styled.div`
    font-size: 14px;
`;
