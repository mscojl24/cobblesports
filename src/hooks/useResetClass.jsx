import { useAtom } from 'jotai';
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
} from '../atoms/useIndexState';

export const useResetClass = () => {
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

    return () => {
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
};
