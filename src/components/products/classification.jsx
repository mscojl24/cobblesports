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
} from '../../atoms/useIndexState';
import PriceRange from './priceRange';
import { OptionList, SortingList } from '../../data/productOptionList';

function Classification() {
    const [selectedSports, setSelectedSports] = useAtom(sportsState); // 스포츠 선택 : []
    const [selectedSorting, setSelectedSorting] = useAtom(orderState);
    const [selectSale, setSelectSale] = useAtom(saleState);
    const [selectedSize, setSelectedSize] = useAtom(sizeState);
    const [selectedWaterProof, setSelectedWaterProof] = useAtom(waterProofState);
    const [selectBatterySM, setSelectBatterySM] = useAtom(batterySMState);
    const [selectBatteryGPS, setSelectBatteryGPS] = useAtom(batteryGPSState);
    const [products] = useAtom(sortProductsState);

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
            case 'sports': // ✅ 추가
                setSelectedSports((prev) => toggleInArray(prev, value));
                break;
            default:
                break;
        }
    };

    console.log(selectBatteryGPS);

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
    width: 400px;
    height: 100%;
    gap: 10px;
    background-color: #fff;
    padding: 40px;
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
    }
`;
