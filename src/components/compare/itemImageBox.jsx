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

    return (
        <ItemImage className="flex-center">
            {/* 컬러 선택 셀렉트 버튼 */}
            <ColorSelectWrapper>
                <ColorSelectButton
                    onClick={() => {
                        if (item.spec.color.length > 1) {
                            setOpenColorSelect((prev) => !prev);
                        }
                    }}>
                    {selectedColorName}
                    {item.spec.color.length === 1 && ' (단일컬러)'}
                    {item.spec.color.length > 1 && <RiArrowDownSLine />}
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

// ---- styled components 그대로 복사 또는 재사용 ----

const ItemImage = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    background: #f8f8f8;
    border: 1px solid rgba(0, 0, 0, 0.02);
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
`;

const ColorSelectWrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
`;

const ColorSelectButton = styled.button`
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: #333;
    font-family: '42dot Sans';
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 0px;
    cursor: pointer;
`;

const ColorSelectList = styled.ul`
    position: absolute;
    top: 30px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    padding: 6px 0;
    width: max-content;
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
`;

const ColorCode = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.$code};
`;
