import styled from 'styled-components';
import { IoOptionsOutline } from 'react-icons/io5';
import { RiResetRightFill } from 'react-icons/ri';

import { useAtom } from 'jotai';
import { useResetClass } from '../../hooks/useResetClass';
import {
    batteryGPSState,
    batterySMState,
    maxPriceState,
    minPriceState,
    orderState,
    saleState,
    seriesSorting,
    sizeState,
    sportsSorting,
    sportsState,
    waterProofState,
    classState,
} from '../../atoms/useIndexState';
import { RiDeleteBin6Line } from 'react-icons/ri';

function ProductClassification() {
    const resetClass = useResetClass();
    const [activeClassList] = useAtom(classState);

    const [, setClassList] = useAtom(classState);

    const [, setSports] = useAtom(sportsState);
    const [, setOrder] = useAtom(orderState);
    const [, setSize] = useAtom(sizeState);
    const [, setSale] = useAtom(saleState);
    const [, setWaterproof] = useAtom(waterProofState);
    const [, setBatterySM] = useAtom(batterySMState);
    const [, setBatteryGPS] = useAtom(batteryGPSState);
    const [, setSportsSort] = useAtom(sportsSorting);
    const [, setSeriesSort] = useAtom(seriesSorting);

    const handleDeleteClass = (tag) => {
        setClassList((prev) => prev.filter((t) => t.title !== tag.title));

        switch (tag.key) {
            case 'sale':
                setSale(false);
                break;

            case 'Sorting':
                setOrder('최신순');
                break;

            case 'size':
                setSize((prev) => prev.filter((v) => v !== tag.value));
                break;

            case 'waterproof':
                setWaterproof((prev) => prev.filter((v) => v !== tag.value));
                break;

            case 'batterySM':
                setBatterySM((prev) => prev.filter((v) => v !== tag.value));
                break;

            case 'batteryGPS':
                setBatteryGPS((prev) => prev.filter((v) => v !== tag.value));
                break;

            case 'sports':
                setSports((prev) => prev.filter((v) => v !== tag.value));
                break;

            case 'sportsSorting':
                setSportsSort('');
                break;

            case 'seriesSorting':
                setSeriesSort([]);
                break;

            default:
                break;
        }
    };

    return (
        <ClassBox className="flex-h-center">
            <FilterLength className="flex-h-center">
                <IoOptionsOutline />{' '}
                <span>
                    필터 적용중 <em>({activeClassList.length})</em>
                </span>
            </FilterLength>
            <FilterClass className="flex-h-center">
                {activeClassList.map((tag, index) => (
                    <li key={index}>
                        {tag.title}
                        <RiDeleteBin6Line onClick={() => handleDeleteClass(tag)} />
                    </li>
                ))}
                {activeClassList.length >= 1 && (
                    <li className="reset-class flex-center" onClick={resetClass}>
                        <RiResetRightFill />
                    </li>
                )}
            </FilterClass>
        </ClassBox>
    );
}

export default ProductClassification;

const ClassBox = styled.nav`
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: #fff;
    z-index: 99;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const FilterLength = styled.div`
    width: 10%;
    min-width: 230px;
    height: 100%;
    padding: 0px 40px;
    font-size: 30px;
    gap: 10px;

    span {
        font-size: 16px;
        font-weight: bold;

        em {
            font-family: '42dot Sans';
            color: #3b68fa;
        }
    }

    @media (max-width: 860px) {
        padding: 0px 20px;
        min-width: 170px;
        font-size: 20px;
        span {
            font-weight: bold;

            em {
                font-family: '42dot Sans';
                color: #3b68fa;
            }
        }
    }
`;

const FilterClass = styled.ul`
    width: 100%;
    height: 100%;
    gap: 10px;
    overflow-x: scroll;

    li {
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        font-family: '42dot Sans';
        padding: 8px 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #5f667e;
        border-radius: 50px;
        white-space: nowrap;
    }

    .reset-class {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        font-family: '42dot Sans';
        padding: 5px 15px;
        background-color: #353434;
        border: none;
        color: #f7f7f7;
        border-radius: 50px;
    }
`;
