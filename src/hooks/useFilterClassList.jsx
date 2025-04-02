// hooks/useFilterClassState.ts
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    batteryGPSState,
    batterySMState,
    orderState,
    saleState,
    seriesSorting,
    sizeState,
    sportsSorting,
    sportsState,
    waterProofState,
    classState,
} from '../atoms/useIndexState';

import { OptionList, SortingList, sportsSortingList } from '../data/productOptionList';

export const useFilterClassState = () => {
    const [selectedSports] = useAtom(sportsState);
    const [selectedSorting] = useAtom(orderState);
    const [selectSale] = useAtom(saleState);
    const [selectedSize] = useAtom(sizeState);
    const [selectedWaterProof] = useAtom(waterProofState);
    const [selectBatterySM] = useAtom(batterySMState);
    const [selectBatteryGPS] = useAtom(batteryGPSState);
    const [selectSportsSort] = useAtom(sportsSorting);
    const [selectSeriesSort] = useAtom(seriesSorting);
    const [, setActiveClassList] = useAtom(classState);

    useEffect(() => {
        const classes = [];

        if (selectSale) {
            classes.push({ title: '할인 제품 우선', key: 'sale', value: true });
        }

        sportsSortingList.forEach((section) => {
            section.tag.forEach((tag) => {
                if (section.name === 'sportsSorting' && tag.value === selectSportsSort && tag.value !== '') {
                    classes.push({ title: tag.name, key: 'sportsSorting', value: tag.value });
                }
                if (
                    section.name === 'seriesSorting' &&
                    JSON.stringify(tag.value) === JSON.stringify(selectSeriesSort) &&
                    selectSeriesSort.length > 0
                ) {
                    classes.push({ title: tag.name, key: 'seriesSorting', value: tag.value });
                }
            });
        });

        SortingList.forEach((sort) => {
            sort.tag.forEach((tag) => {
                if (tag.value === selectedSorting && selectedSorting !== '최신순') {
                    classes.push({ title: tag.name, key: 'Sorting', value: tag.value });
                }
            });
        });

        OptionList.forEach((option) => {
            option.tag.forEach((tag) => {
                const targetState = {
                    size: selectedSize,
                    waterproof: selectedWaterProof,
                    batterySM: selectBatterySM.map(String),
                    batteryGPS: selectBatteryGPS.map(String),
                    sports: selectedSports,
                }[option.name];

                const value = String(tag.value);

                if (targetState?.includes(value)) {
                    classes.push({ title: tag.name, key: option.name, value: tag.value });
                }
            });
        });

        setActiveClassList(classes);
    }, [
        selectSale,
        selectSportsSort,
        selectSeriesSort,
        selectedSorting,
        selectedSize,
        selectedWaterProof,
        selectBatterySM,
        selectBatteryGPS,
        selectedSports,
        setActiveClassList,
    ]);
};
