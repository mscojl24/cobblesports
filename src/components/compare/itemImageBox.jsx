// components/ItemImageBox.jsx

import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useState } from 'react';

function ItemImageBox({ item, index, onRemove, onEmptyClick, imageIndex = 0, onColorSelect }) {
    const [openColorSelect, setOpenColorSelect] = useState(false);

    if (!item) {
        return (
            <ItemImage className="flex-center column pointer" onClick={() => onEmptyClick(index)}>
                <AiOutlinePlus className="plus-icon" />
                <span className="plus-text">비교할 제품을 선택해 주세요</span>
            </ItemImage>
        );
    }

    const handleColorClick = (colorIdx) => {
        onColorSelect(item.productNum, colorIdx);
        setOpenColorSelect(false);
    };

    const selectedColorName = item.spec.color?.[imageIndex]?.colorName ?? '컬러';
    const selectedColorCode = item.spec.color?.[imageIndex]?.colorCode ?? '컬러';

    return (
        <ItemImage className="flex-center">
            {/* 컬러 선택 셀렉트 버튼 */}
            <ColorSelectWrapper>
                <ColorSelectButton
                    $colorcode={selectedColorCode}
                    onClick={() => {
                        if (item.spec.color.length > 1) {
                            setOpenColorSelect((prev) => !prev);
                        }
                    }}>
                    <div className="color-code"></div>
                    {selectedColorName}
                    {item.spec.color.length <= 1 ? ' (단일)' : <RiArrowDownSLine />}
                </ColorSelectButton>

                {openColorSelect && item.spec.color.length > 1 && (
                    <ColorSelectList>
                        {item.spec.color.map((color, idx) => (
                            <li
                                key={idx}
                                className={imageIndex === idx ? 'selected' : ''}
                                onClick={() => handleColorClick(idx)}>
                                <ColorCode $code={color.colorCode} />
                                <span>{color.colorName}</span>
                            </li>
                        ))}
                    </ColorSelectList>
                )}
            </ColorSelectWrapper>

            <RemoveBtn onClick={() => onRemove(item.productNum)} className="delete-icon flex-center">
                <MdClose />
            </RemoveBtn>
            <img src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${item.spec.image[imageIndex]}`} alt={item.title} />
        </ItemImage>
    );
}

export default ItemImageBox;

//  이미지 섹션 ------------------------------------------

const ItemImage = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    background: #f8f8f8;
    border: 1px solid rgba(0, 0, 0, 0.03);
    aspect-ratio: 6/7;
    gap: 10px;
    transition: all ease-in-out 0.3s;

    &:hover {
        background: linear-gradient(#eeeeee, #f8f8f8);
    }

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

//  리무브 버튼 ------------------------------------------

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

        padding: 5px;
    }
`;

//  컬러 셀렉트 버튼 ------------------------------------------
const ColorSelectWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 10;

    transition: all ease-in-out 0.3s;

    @media (max-width: 1500px) {
        bottom: 10px;
        right: 10px;
    }
`;

const ColorSelectButton = styled.button`
    border: none;
    background-color: #fff;
    border-radius: 20px;
    padding: 10px 20px;
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.2); */

    font-size: 14px;
    color: #333;
    font-family: '42dot Sans';
    display: flex;
    align-items: center;
    gap: 5px;

    cursor: pointer;

    .color-code {
        width: 10px;
        height: 10px;
        border-radius: 10px;

        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: ${(props) => props.$colorcode};
    }

    @media (max-width: 1500px) {
        padding: 5px 10px;
        font-size: 12px;

        .color-code {
        }
    }
`;

const ColorSelectList = styled.ul`
    position: absolute;
    top: 40px;
    left: 0;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    list-style: none;
    padding: 5px;
    width: 100%;
    z-index: 100;

    li {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px;
        font-size: 13px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.8);

        &:hover {
            background-color: #f8f8f8;
        }

        &.selected {
            font-weight: bold;
            color: #000;
        }
    }

    @media (max-width: 1500px) {
        top: 30px;
    }
`;

const ColorCode = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.$code};

    @media (max-width: 1500px) {
        width: 8px;
        height: 8px;
    }
`;
