import { useAtom } from 'jotai';
import styled from 'styled-components';
import { maxPriceState, minPriceState } from '../../atoms/useIndexState';
import { useState } from 'react';

const PriceRange = () => {
    const minLimit = 0;
    const maxLimit = 3000000;
    const step = 100000;

    const [minValueAtom, setMinValue] = useAtom(minPriceState);
    const [maxValueAtom, setMaxValue] = useAtom(maxPriceState);

    // ✅ 내부 상태 (슬라이더 및 인풋용)
    const [tempMin, setTempMin] = useState(minValueAtom);
    const [tempMax, setTempMax] = useState(maxValueAtom);

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        if (value < tempMax - step) setTempMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        if (value > tempMin + step) setTempMax(value);
    };

    const handleMinInputChange = (e) => {
        let value = Number(e.target.value.replace(/,/g, ''));
        if (!isNaN(value) && value >= minLimit && value < tempMax - step) {
            setTempMin(value);
        }
    };

    const handleMaxInputChange = (e) => {
        let value = Number(e.target.value.replace(/,/g, ''));
        if (!isNaN(value) && value <= maxLimit && value > tempMin + step) {
            setTempMax(value);
        }
    };

    const formatCurrency = (value) => {
        return `₩ ${value.toLocaleString()}`;
    };

    const applyPrice = () => {
        setMinValue(tempMin);
        setMaxValue(tempMax);
    };

    return (
        <Container>
            <SliderContainer>
                <SliderTrack>
                    <ProgressBar
                        style={{
                            left: `${((tempMin - minLimit) / (maxLimit - minLimit)) * 100}%`,
                            width: `${((tempMax - tempMin) / (maxLimit - minLimit)) * 100}%`,
                        }}
                    />
                </SliderTrack>

                <RangeInput
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    step={step}
                    value={tempMin}
                    onChange={handleMinChange}
                />

                <RangeInput
                    type="range"
                    min={minLimit}
                    max={maxLimit}
                    step={step}
                    value={tempMax}
                    onChange={handleMaxChange}
                />
            </SliderContainer>

            <PriceMaxMin className="flex-center">
                <span>십만원</span>
                <span>삼백만원</span>
            </PriceMaxMin>

            <InputContainer>
                <PriceInput>
                    <input type="text" value={formatCurrency(tempMin)} onChange={handleMinInputChange} />
                </PriceInput>
                <span> - </span>
                <PriceInput>
                    <input type="text" value={formatCurrency(tempMax)} onChange={handleMaxInputChange} />
                </PriceInput>
            </InputContainer>

            <Confirmation onClick={applyPrice}>가격 적용하기</Confirmation>
        </Container>
    );
};

export default PriceRange;

const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;

    .max-min-box {
        gap: 10px;
    }
    .max-min-box > span {
        font-size: 12px;
        font-weight: bold;
    }
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    display: flex;
    align-items: center;
`;

const SliderTrack = styled.div`
    position: absolute;
    width: 100%;
    height: 5px;
    background: #ddd;
    border-radius: 3px;
`;

const ProgressBar = styled.div`
    position: absolute;
    height: 5px;
    background: #000;
    border-radius: 3px;
`;

const PriceMaxMin = styled.div`
    justify-content: space-between;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);

    span {
        font-family: '42dot Sans';
        margin: 10px 0px;
    }
`;

/* ✅ 슬라이더 핸들 디자인 */ const RangeInput = styled.input.attrs({ type: 'range' })`
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: transparent;
    position: absolute;
    pointer-events: none;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 36px;
        height: 24px;
        background: white;
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        position: relative;
        pointer-events: auto;

        /* 🎨 SVG를 활용한 || 표시 */
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='30' viewBox='0 0 20 20'%3E%3Cline x1='6' y1='4' x2='6' y2='16' stroke='%23888' stroke-width='1'/%3E%3Cline x1='14' y1='4' x2='14' y2='16' stroke='%23888' stroke-width='1'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
    }

    /* 🎨 버튼 클릭 시 약간 커지는 효과 */
    &::-webkit-slider-thumb:active {
        transform: scale(1.1);
    }
`;

/* ✅ 인풋 박스 디자인 */
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
`;

const PriceInput = styled.div`
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    background: #fafafa;

    input {
        width: 100%;
        font-size: 14px;
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
        color: rgba(0, 0, 0, 0.5);
    }
`;

const Confirmation = styled.button`
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    border-color: rgba(0, 0, 0, 0.1);
    padding: 15px;
    background-color: rgba(0, 0, 0, 1);
    color: #fff;

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;
