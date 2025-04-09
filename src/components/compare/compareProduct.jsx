import { useAtom } from 'jotai';
import styled from 'styled-components';
import { compareState, popupTextState, productsState } from '../../atoms/useIndexState';
import { useState } from 'react';
import SelectListPopup from './selectListPopup';
import ItemMainInfo from './itemMainInfo';
import ItemDetailedInfo from './itemDetailedInfo';
import ItemImageBox from './itemImageBox';

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
    const paddedList = Array(4)
        .fill(null)
        .map((_, idx) => compareProducts[idx] ?? null);

    return (
        <CompareList className="flex-center">
            {paddedList.map((item, index) => {
                return (
                    <CompareItemCard key={index} className="flex-center column">
                        <ItemImageBox
                            item={item}
                            index={index}
                            imageIndex={compareColorIndex[item.productNum] ?? 0}
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
                        {item && (
                            <>
                                <ItemMainInfo item={item} />
                                <ItemDetailedInfo item={item} />
                            </>
                        )}
                    </CompareItemCard>
                );
            })}
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

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    gap: 3px;

    @media (max-width: 1500px) {
        width: 100%;
    }
`;

const CompareItemCard = styled.li`
    width: calc(100% / 4);
    min-width: 220px;
    height: 100%;
    background: #fff;

    &:last-child {
        border-right: none;
    }
`;
