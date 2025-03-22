import { useAtom } from 'jotai';
import styled from 'styled-components';
import { orderState, sizeState, sportsState } from '../../atoms/useIndexState';
import PriceRange from './priceRange';
import { OptionList, sportsList } from '../../data/productOptionList';

function Classification() {
    const [selectedSports, setSelectedSports] = useAtom(sportsState); // 다중 선택
    const [selectedSorting, setSelectedSorting] = useAtom(orderState); // 정렬 선택
    const [selectedSize, setSelectedSize] = useAtom(sizeState); // 사이즈 선택

    const toggleSportSelection = (value) => {
        if (value === 'all') {
            setSelectedSports([]);
        } else {
            setSelectedSports((prevSelected) =>
                prevSelected.includes(value)
                    ? prevSelected.filter((sport) => sport !== value)
                    : [...prevSelected, value]
            );
        }
    };

    const handleOptionChange = (e, name) => {
        const value = e.target.value;
        if (name === 'Sorting') {
            setSelectedSorting(value);
        } else if (name === 'size') {
            setSelectedSize(value);
        }
    };

    return (
        <ClassificationBox className="flex-v-center column">
            <CFTitle>
                <h1>Category</h1>
            </CFTitle>
            {OptionList.map((list, index) => (
                <OptionListBox key={index}>
                    <h2>{list.title}</h2>
                    {list.tag.map((tag, tagIndex) => (
                        <div key={tagIndex} className="option-tag-box flex-h-center">
                            <input
                                type="radio"
                                value={tag.value}
                                name={list.name}
                                className="tag-radio"
                                checked={
                                    list.name === 'Sorting' ? selectedSorting === tag.value : selectedSize === tag.value
                                }
                                onChange={(e) => handleOptionChange(e, list.name)}
                            />
                            <em>{tag.name}</em>
                        </div>
                    ))}
                </OptionListBox>
            ))}
            {sportsList.map((list, index) => (
                <OptionListBox key={index}>
                    <h2>{list.title}</h2>
                    <div className="sports-tag-box flex-h-center">
                        {list.tag.map((tag, tagIndex) => (
                            <div
                                key={tagIndex}
                                className={`sports-name ${selectedSports.includes(tag.value) ? 'active' : ''}`}
                                onClick={() => toggleSportSelection(tag.value)}>
                                {tag.name}
                            </div>
                        ))}
                    </div>
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
    padding: 50px 0px 50px 50px;
`;

const CFTitle = styled.div`
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 1);

    h1 {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        padding: 20px 0px;
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
        font-size: 18px;
        padding: 20px 0px;
        font-weight: 600;
    }

    .option-tag-box {
        padding: 15px 0px;
        gap: 10px;
        font-size: 15px;
        em {
            font-family: '42dot Sans';
        }
    }

    .sports-tag-box {
        width: 100%;
        flex-wrap: wrap;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
        margin: 10px 0px;

        .sports-name {
            cursor: pointer;
            width: calc(100% / 3);
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            text-align: center;
            padding: 20px 0px;
            font-size: 14px;
            transition: all 0.1s ease-in-out;
        }

        /* ✅ 선택된 경우 스타일 변경 */
        .sports-name.active {
            background-color: #f5f5f5;
            color: #979797;
        }

        .sports-name:hover {
            color: #0b4af7;
        }

        .sports-name:nth-child(3n) {
            border-right: none;
        }

        .sports-name:nth-last-child(-n + 3) {
            border-bottom: none;
        }
    }

    .tag-radio {
        width: 20px;
        height: 20px;
    }
`;
