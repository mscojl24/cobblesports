import { useAtom } from 'jotai';
import styled from 'styled-components';
import {
    orderState,
    saleState,
    sizeState,
    sportsState,
    waterProofState,
    batterySMState,
    batteryGPSState,
    sortProductsState,
    sportsSorting,
    seriesSorting,
} from '../../atoms/useIndexState';

import PriceRange from './priceRange';
import { OptionList, SortingList, sportsSortingList } from '../../data/productOptionList';
import { useEffect, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useFilterClassState } from '../../hooks/useFilterClassList'; // ✅ 훅으로 분리된 필터 태그 관리

function Classification() {
    useFilterClassState(); // 필터 태그 업데이트 훅 사용

    const [selectedSports, setSelectedSports] = useAtom(sportsState);
    const [selectedSorting, setSelectedSorting] = useAtom(orderState);
    const [selectSale, setSelectSale] = useAtom(saleState);
    const [selectedSize, setSelectedSize] = useAtom(sizeState);
    const [selectedWaterProof, setSelectedWaterProof] = useAtom(waterProofState);
    const [selectBatterySM, setSelectBatterySM] = useAtom(batterySMState);
    const [selectBatteryGPS, setSelectBatteryGPS] = useAtom(batteryGPSState);
    const [selectSportsSort, setSelectSportsSort] = useAtom(sportsSorting);
    const [selectSeriesSort, setSelectSeriesSort] = useAtom(seriesSorting);
    const [products] = useAtom(sortProductsState);

    useEffect(() => {
        if (products.length > 0) {
            window.scrollTo({ top: 450, behavior: 'smooth' });
        }
    }, [products]);

    const [openSections, setOpenSections] = useState(() => sportsSortingList.map((section) => section.title));

    const toggleSection = (title) => {
        setOpenSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
    };

    const handleSelect = (name, value) => {
        if (name === 'sportsSorting') setSelectSportsSort(value);
        else if (name === 'seriesSorting') setSelectSeriesSort(value);
    };

    const handleSortingChange = (e) => {
        setSelectedSorting(e.target.value);
    };

    const toggleInArray = (arr, value) => (arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

    const handleOptionToggle = (name, value) => {
        switch (name) {
            case 'size':
                setSelectedSize((prev) => toggleInArray(prev, value));
                break;
            case 'waterproof':
                setSelectedWaterProof((prev) => toggleInArray(prev, value));
                break;
            case 'batterySM':
                setSelectBatterySM((prev) => toggleInArray(prev, value));
                break;
            case 'batteryGPS':
                setSelectBatteryGPS((prev) => toggleInArray(prev, value));
                break;
            case 'sports':
                setSelectedSports((prev) => toggleInArray(prev, value));
                break;
            default:
                break;
        }
    };

    return (
        <ClassificationBox className="flex-v-center column">
            <CFTitle>
                <h1>제품 카테고리</h1>
                <span>
                    총 <strong className="products-length">{products.length}</strong>개
                </span>
            </CFTitle>

            <OptionListBox>
                <h2>이벤트</h2>
                <div className="sports-checkbox-box flex-v-center column">
                    <label className="option-tag-box flex-h-center">
                        <input
                            type="checkbox"
                            className="tag-radio"
                            checked={selectSale}
                            onChange={() => setSelectSale(!selectSale)}
                        />
                        <em>할인 제품 우선</em>
                    </label>
                </div>
            </OptionListBox>

            {/* 정렬 */}
            {SortingList.map((list, index) => (
                <OptionListBox key={index}>
                    <h2>{list.title}</h2>
                    {list.tag.map((tag, tagIndex) => (
                        <div key={tagIndex} className="option-tag-box flex-h-center">
                            <input
                                type="radio"
                                value={tag.value}
                                name={list.name}
                                className="tag-radio"
                                checked={selectedSorting === tag.value}
                                onChange={handleSortingChange}
                            />
                            <em>{tag.name}</em>
                        </div>
                    ))}
                </OptionListBox>
            ))}

            {/* 기타 옵션 */}
            {OptionList.map((list, index) => (
                <OptionListBox key={index}>
                    <h2>{list.title}</h2>
                    {list.tag.map((tag, tagIndex) => (
                        <div key={tagIndex} className="option-tag-box flex-h-center">
                            <input
                                type="checkbox"
                                value={tag.value}
                                name={list.name}
                                className="tag-radio"
                                checked={(() => {
                                    const stateMap = {
                                        size: selectedSize,
                                        waterproof: selectedWaterProof,
                                        batterySM: selectBatterySM,
                                        batteryGPS: selectBatteryGPS,
                                        sports: selectedSports,
                                    };

                                    const value =
                                        list.name === 'batterySM' || list.name === 'batteryGPS'
                                            ? Number(tag.value)
                                            : tag.value;

                                    return stateMap[list.name]?.includes(value) || false;
                                })()}
                                onChange={() => {
                                    const value =
                                        list.name === 'batterySM' || list.name === 'batteryGPS'
                                            ? Number(tag.value)
                                            : tag.value;
                                    handleOptionToggle(list.name, value);
                                }}
                            />
                            <em>{tag.name}</em>
                        </div>
                    ))}
                </OptionListBox>
            ))}

            {/* 사용분류 / 시리즈 */}
            <SportsSortingBox>
                {sportsSortingList.map((section, idx) => {
                    const isApplied =
                        section.name === 'sportsSorting'
                            ? selectSportsSort !== '' // 전체 항목이 '' 값
                            : selectSeriesSort.length > 0; // 전체 항목이 빈 배열

                    return (
                        <div key={idx}>
                            <SectionHeader onClick={() => toggleSection(section.title)}>
                                <h2 className="flex-center">
                                    {section.title}
                                    {isApplied ? (
                                        <em className="selected flex-center"> 적용중 </em>
                                    ) : (
                                        <em className="selected-un flex-center"> 미적용 </em>
                                    )}
                                </h2>
                                <span>
                                    {openSections.includes(section.title) ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                                </span>
                            </SectionHeader>
                            {openSections.includes(section.title) && (
                                <ul>
                                    {section.tag.map((item, i) => {
                                        const isSelected =
                                            section.name === 'sportsSorting'
                                                ? selectSportsSort === item.value
                                                : JSON.stringify(selectSeriesSort) === JSON.stringify(item.value);

                                        return (
                                            <MenuItem
                                                key={i}
                                                onClick={() => handleSelect(section.name, item.value)}
                                                $isSelected={isSelected}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </SportsSortingBox>

            <OptionListBox>
                <h2>가격설정</h2>
                <PriceRange />
            </OptionListBox>
        </ClassificationBox>
    );
}

export default Classification;

/* ✅ 스타일 */
const ClassificationBox = styled.aside`
    position: sticky;
    top: 0px; // Navi 등 상단 요소 고려
    align-self: flex-start;
    justify-content: flex-start;
    max-height: calc(100vh - 50px); // 화면 높이 - 네비 등 여백
    overflow-y: auto;
    padding: 40px;

    &::-webkit-scrollbar {
        display: none;
    }

    width: 400px;
    gap: 10px;
    background-color: #fff;

    /* 스크롤바 스타일 (선택사항) */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    @media (max-width: 860px) {
        display: none;
    }
`;

const CFTitle = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        padding: 20px 0px;
    }
    span {
        width: 50%;
        text-align: right;
    }
    .products-length {
        font-family: '42dot Sans';
        font-weight: bold;
        color: #346ce4;
    }
`;

const SportsSortingBox = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    ul {
        padding-bottom: 20px;
    }
`;

const SectionHeader = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h2 {
        padding: 20px 0px;
        font-weight: 600;
    }

    .selected {
        font-size: 12px;
        color: #fff;
        padding: 5px 10px;
        background-color: #3e8bff;
        border-radius: 50px;
        margin-left: 10px;
    }

    .selected-un {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.2);
        padding: 5px 10px;
        background-color: #f2f2f2;
        border-radius: 50px;
        margin-left: 10px;
    }
`;

const MenuItem = styled.li`
    padding: 10px 15px;
    cursor: pointer;
    color: ${({ $isSelected }) => ($isSelected ? '#1a1a1a' : '#555')};
    font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
    background-color: ${({ $isSelected }) => ($isSelected ? '#f7f7f7' : '#fff')};

    &:hover {
        background-color: #1a1a1a;
        color: #fff;
    }
`;

const OptionListBox = styled.div`
    padding-bottom: 20px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:nth-last-child(1) {
        border-bottom: none;
    }

    h2 {
        padding: 20px 0px;
        font-weight: 600;
    }

    .option-tag-box {
        padding: 7px 0px;
        gap: 10px;
        em {
            font-family: '42dot Sans';
            font-size: 14px;
        }
    }

    .tag-radio {
        width: 20px;
        height: 20px;
        accent-color: #000;
    }
`;
