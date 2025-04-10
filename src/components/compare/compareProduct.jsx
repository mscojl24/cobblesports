import { useAtom } from 'jotai';
import styled from 'styled-components';
import { compareState, popupTextState, productsState } from '../../atoms/useIndexState';
import { useState } from 'react';
import SelectListPopup from './selectListPopup';
import ItemMainInfo from './itemMainInfo';
import ItemDetailedInfo from './itemDetailedInfo';
import ItemImageBox from './itemImageBox';
import React from 'react';
import { LuGitCompareArrows } from 'react-icons/lu';
import { MdDisplaySettings, MdOutlineAspectRatio, MdOutlineSportsTennis } from 'react-icons/md';
import ItemSportsProfile from './itemSportsProfile';

function CompareProduct() {
    const [compareList, setCompareList] = useAtom(compareState);
    const [product] = useAtom(productsState);
    const [, setPopupText] = useAtom(popupTextState);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [, setPopupIndex] = useState(null);
    const [compareColorIndex, setCompareColorIndex] = useState({});

    // 비교 리스트 솔팅 (중복선택방지)
    const compareProducts = product.filter((item) => compareList.includes(String(item.productNum)));

    // 비교제품 삭제로직
    const handleRemove = (productNum) => {
        setCompareList((prev) => prev.filter((num) => num !== String(productNum)));

        setPopupText('');
        setTimeout(() => {
            setPopupText('비교 상품이 제거되었습니다.');
        }, 10);
    };

    // 최대 4개 고정 배열 생성
    const paddedList = Array(3)
        .fill(null)
        .map((_, idx) => compareProducts[idx] ?? null);

    return (
        <CompareList className="flex-center column">
            <div className="flex-box">
                {paddedList.map((item, index) => (
                    <CompareItemCard key={index}>
                        <ItemImageBox
                            item={item}
                            index={index}
                            imageIndex={item ? compareColorIndex[item.productNum] ?? 0 : 0}
                            onRemove={handleRemove}
                            onEmptyClick={(idx) => {
                                setPopupIndex(idx);
                                setIsPopupOpen(true);
                            }}
                            onColorSelect={(productNum, colorIdx) => {
                                setCompareColorIndex((prev) => ({
                                    ...prev,
                                    [productNum]: colorIdx,
                                }));
                            }}
                        />
                        {item && <ItemMainInfo item={item} />}
                    </CompareItemCard>
                ))}
            </div>

            <SpecBox>
                <div className="specbox-title flex-h-center">
                    <MdOutlineSportsTennis color="#ccc" />
                    운동 프로파일 (지원가능)
                </div>
                <div className="specbox-info flex-h-center">
                    {paddedList.map((item, index) => {
                        return <ItemSportsProfile key={index} item={item} />;
                    })}
                </div>
            </SpecBox>

            <SpecBox>
                <div className="specbox-title flex-h-center">
                    <MdDisplaySettings color="#ccc" />
                    제품 스펙 비교
                </div>
                <div className="specbox-info flex-h-center">
                    {paddedList.map((item, index) => {
                        return <ItemDetailedInfo key={index} item={item} />;
                    })}
                </div>
            </SpecBox>

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
    width: calc(100%);
    overflow-x: scroll;
    padding: 0px 300px;

    .flex-box {
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        gap: 30px;
    }

    @media (max-width: 1500px) {
        width: 100%;
        padding: 0px 100px;
        .flex-box {
            gap: 20px;
        }
    }

    @media (max-width: 860px) {
        width: 100%;
        padding: 0px;
        .flex-box {
            gap: 5px;
        }
    }
`;

const CompareItemCard = styled.li`
    width: calc(100% / 3);
    min-width: 200px;
    height: 100%;
    background: #fff;

    &:last-child {
        border-right: none;
    }
`;

//=================================================

const SpecBox = styled.div`
    width: 100%;
    margin-top: 100px;

    .specbox-title {
        gap: 10px;

        padding: 20px 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 1);

        font-size: clamp(14px, 5vw, 24px);
        font-weight: bold;
    }

    .specbox-info {
        gap: 30px;
    }

    @media (max-width: 1500px) {
        .specbox-info {
            gap: 20px;
        }
    }

    @media (max-width: 860px) {
        .specbox-info {
            gap: 5px;
        }
    }
`;
