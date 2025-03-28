import styled from 'styled-components';
import { TbReload } from 'react-icons/tb';
import { MdOutlineNotInterested } from 'react-icons/md';
import { useAtom } from 'jotai';

import {
    sportsState,
    orderState,
    sizeState,
    minPriceState,
    maxPriceState,
    saleState,
    waterProofState,
    batterySMState,
    batteryGPSState,
    sportsSorting,
    seriesSorting,
} from '../../atoms/useIndexState';

function NotData() {
    const [, setSports] = useAtom(sportsState);
    const [, setOrder] = useAtom(orderState);
    const [, setSize] = useAtom(sizeState);
    const [, setMinPrice] = useAtom(minPriceState);
    const [, setMaxPrice] = useAtom(maxPriceState);
    const [, setSale] = useAtom(saleState);
    const [, setWaterproof] = useAtom(waterProofState);
    const [, setBatterySM] = useAtom(batterySMState);
    const [, setBatteryGPS] = useAtom(batteryGPSState);
    const [, setSportsSort] = useAtom(sportsSorting);
    const [, setselectSeriesSort] = useAtom(seriesSorting);

    const handleFilterReload = () => {
        setSports([]);
        setOrder('최신순');
        setSize([]);
        setMinPrice(0);
        setMaxPrice(3000000);
        setSale(false);
        setWaterproof([]);
        setBatterySM([]);
        setBatteryGPS([]);
        setSportsSort('');
        setselectSeriesSort([]);
    };

    return (
        <NotDataBox className="flex-center column">
            <MdOutlineNotInterested className="Not-filter-icon" />
            <em className="flex-center Not-filter-text">
                조건에 맞는 제품을 찾을 수 없습니다.
                <br />
                필터를 다시 적용할까요?
            </em>
            <button className="flex-center reload-btn" onClick={handleFilterReload}>
                <TbReload />
                필터 초기화
            </button>
        </NotDataBox>
    );
}

export default NotData;

const NotDataBox = styled.div`
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 1.5;
    gap: 20px;

    .Not-filter-icon {
        font-size: 50px;
        color: rgba(0, 0, 0, 0.1);
    }

    .Not-filter-text {
        font-size: 18px;
    }

    .reload-btn {
        gap: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        border-radius: 50px;
        border: none;
        font-weight: bold;
        cursor: pointer;
    }

    .reload-btn:hover {
        background: rgba(0, 0, 0, 0.5);
    }
`;
