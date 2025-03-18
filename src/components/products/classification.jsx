import { useState } from 'react';
import styled from 'styled-components';

function Classification() {
    const [selectedSports, setSelectedSports] = useState([]); // ✅ 여러 개 선택 가능

    const OptionList = [
        {
            title: '정렬순서',
            name: 'Sorting',
            tag: [
                { name: '최신순', value: '최신순' },
                { name: '가격 낮은순', value: '낮은순' },
                { name: '가격 높은순', value: '높은순' },
            ],
        },
        {
            title: '사이즈',
            name: 'size',
            tag: [
                { name: '전체', value: 'ALL' },
                { name: 'S (40mm~44mm)', value: 'S' },
                { name: 'M (45mm~47mm)', value: 'M' },
                { name: 'L (48mm~51mm)', value: 'L' },
            ],
        },
    ];

    const sportsList = [
        {
            title: '운동종목',
            name: 'sports',
            tag: [
                { name: '전체', value: 'all' },
                { name: '러닝', value: 'running' },
                { name: '수영', value: 'swim' },
                { name: '사이클링', value: 'cycling' },
                { name: '멀티스포츠', value: 'multisport' },
                { name: '다이빙', value: 'diving' },
                { name: '등산', value: 'hiking' },
                { name: '골프', value: 'golf' },
                { name: '피트니스', value: 'fitness' },
            ],
        },
    ];

    // ✅ 운동 선택 함수
    const toggleSportSelection = (value) => {
        if (value === 'all') {
            // "전체" 선택 시 모든 선택 해제
            setSelectedSports([]);
        } else {
            setSelectedSports(
                (prevSelected) =>
                    prevSelected.includes(value)
                        ? prevSelected.filter((sport) => sport !== value) // 이미 선택된 경우 제거
                        : [...prevSelected, value] // 선택되지 않은 경우 추가
            );
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
                    {list.tag.map((tag, index) => (
                        <div key={index} className="option-tag-box flex-h-center">
                            <input type="radio" value={tag.value} name={list.name} className="tag-radio" />
                            <em className="tag-name">{tag.name}</em>
                        </div>
                    ))}
                </OptionListBox>
            ))}
            {sportsList.map((list, index) => (
                <OptionListBox key={index}>
                    <h2>{list.title}</h2>

                    <div key={index} className="sports-tag-box flex-h-center">
                        {list.tag.map((tag, index) => (
                            <div
                                key={index}
                                className={`sports-name ${selectedSports.includes(tag.value) ? 'active' : ''}`}
                                onClick={() => toggleSportSelection(tag.value)} // ✅ 클릭 시 상태 업데이트
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </OptionListBox>
            ))}
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
