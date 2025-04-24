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
    isMobileFilterOpenState,
    scrollXState,
} from '../../atoms/useIndexState';

import PriceRange from './priceRange';
import { OptionList, SortingList, sportsSortingList } from '../../data/productOptionList';
import { useEffect, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useFilterClassState } from '../../hooks/useFilterClassList'; // ✅ 훅으로 분리된 필터 태그 관리

function Classification() {
    useFilterClassState(); // 필터 태그 업데이트 훅 사용

    //모바일 해상도 필터메뉴 상태관리
    const [mobileFilterOpen, setMobileFilterOpen] = useAtom(isMobileFilterOpenState);
    const [scrollX] = useAtom(scrollXState);

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

    const [openSections, setOpenSections] = useState(() => sportsSortingList.map((section) => section.title));

    useEffect(() => {
        if (products.length > 0) {
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }

        if (scrollX >= 860) {
            setMobileFilterOpen(true);
        }
    }, [products, scrollX]);

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
        <ClassificationBox className="flex-v-center column" $mobileFilterOpen={mobileFilterOpen}>
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
    padding: 0px;

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
        display: ${({ $mobileFilterOpen }) => ($mobileFilterOpen ? 'none' : 'block')};

        position: fixed;
        top: auto;
        bottom: 50px;
        left: 0px;
        z-index: 99;
        width: 100%;
        padding: 0px;

        max-height: calc(60vh - 50px);
        animation: movebar 0.1s ease-in-out forwards;
        box-shadow: 0px -30px 20px rgba(0, 0, 0, 0.1);

        border-radius: 20px;
    }

    @keyframes movebar {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;

//
const CFTitle = styled.div`
    padding: 0px 30px;

    position: sticky;
    top: 0;
    background-color: #fff;

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

    @media (max-width: 860px) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
`;

// 사용(스포츠) 분류 및 제품 시리즈 섹션
const SportsSortingBox = styled.div`
    padding: 20px 30px;
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
    margin-bottom: 20px;

    h2 {
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

// 옵션 리스트 섹션
const OptionListBox = styled.div`
    padding: 20px 30px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:nth-last-child(1) {
        border-bottom: none;
    }

    h2 {
        padding-bottom: 20px;
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
