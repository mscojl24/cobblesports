import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    maxPriceState,
    minPriceState,
    orderState,
    productsState,
    saleState,
    sizeState,
    sortProductsState,
    sportsState,
    waterProofState,
    batterySMState,
    batteryGPSState,
} from '../atoms/useIndexState';

const useFilterAndSortProducts = () => {
    const [products] = useAtom(productsState);
    const [, setSortProducts] = useAtom(sortProductsState);
    const [selectedSports] = useAtom(sportsState);
    const [selectedSorting] = useAtom(orderState);
    const [selectedSize] = useAtom(sizeState);
    const [minValue] = useAtom(minPriceState);
    const [maxValue] = useAtom(maxPriceState);
    const [selectSale] = useAtom(saleState);
    const [selectedWaterProof] = useAtom(waterProofState);
    const [selectBatterySM] = useAtom(batterySMState);
    const [selectBatteryGPS] = useAtom(batteryGPSState);

    useEffect(() => {
        const safeConvertDate = (dateString) => {
            const parsed = new Date(dateString);
            return isNaN(parsed.getTime()) ? null : parsed;
        };

        const getEffectivePrice = (product) => product.spec.discount ?? product.spec.price;

        const isSizeMatch = (sizeInput) => {
            if (!Array.isArray(selectedSize) || selectedSize.length === 0) return true;

            const sizes = Array.isArray(sizeInput) ? sizeInput : [sizeInput];
            const mmSizes = sizes.map((s) => parseInt(s?.replace('mm', ''), 10)).filter((n) => !isNaN(n));
            const hasAnother = selectedSize.includes('another');

            return selectedSize.some((sizeOption) => {
                if (sizeOption === 'S') return mmSizes.some((mm) => mm >= 40 && mm <= 44);
                if (sizeOption === 'M') return mmSizes.some((mm) => mm >= 45 && mm <= 47);
                if (sizeOption === 'L') return mmSizes.some((mm) => mm >= 48 && mm <= 51);
                if (sizeOption === 'another') {
                    if (mmSizes.length === 0) return true;
                    return mmSizes.every((mm) => mm < 40 || mm > 51);
                }
                return false;
            });
        };

        const isActivityMatch = (activityProfiles) => {
            if (selectedSports.includes('all') || selectedSports.length === 0) return true;
            return selectedSports.every((sport) => activityProfiles[sport]);
        };

        const isWaterProofMatch = (rating, diving) => {
            if (!selectedWaterProof || selectedWaterProof.length === 0) return true;
            return selectedWaterProof.includes(rating) || selectedWaterProof.includes(diving);
        };

        const isBatteryInRange = (value, selectedRanges) => {
            if (!Array.isArray(selectedRanges) || selectedRanges.length === 0) return true;
            const sorted = selectedRanges.map(Number).sort((a, b) => a - b);
            const min =
                sorted[0] === 999 ? 28 : sorted[0] === 48 ? 24 : sorted[0] === 21 ? 14 : sorted[0] === 14 ? 7 : 0;
            const max = Math.max(...sorted);
            return typeof value === 'number' && value >= min && value <= max;
        };

        const filtered = products.filter((product) => {
            const price = getEffectivePrice(product);
            const isWithinPrice = typeof price === 'number' && price >= minValue && price <= maxValue;
            const isSizeOk = isSizeMatch(product.spec.size);
            const isActivityOk = isActivityMatch(product.activityProfiles);
            const isWaterProofOk = isWaterProofMatch(product.waterProof?.waterRating, product.waterProof?.divingRating);
            const isBatterySMOk = isBatteryInRange(product.battery.smartwatch, selectBatterySM);
            const isBatteryGPSOk = isBatteryInRange(product.battery.gpsOnly, selectBatteryGPS);

            return isWithinPrice && isSizeOk && isActivityOk && isWaterProofOk && isBatterySMOk && isBatteryGPSOk;
        });

        const sorted = (() => {
            const sortByOption = (list) => {
                if (selectedSorting === '최신순') {
                    return list.sort((a, b) => {
                        const dateA = safeConvertDate(a.spec.release)?.getTime() ?? 0;
                        const dateB = safeConvertDate(b.spec.release)?.getTime() ?? 0;
                        return dateB - dateA;
                    });
                }

                const getPrice = (item) => getEffectivePrice(item);

                if (selectedSorting === '높은순') {
                    return list.sort((a, b) => getPrice(b) - getPrice(a));
                }
                if (selectedSorting === '낮은순') {
                    return list.sort((a, b) => getPrice(a) - getPrice(b));
                }

                return list;
            };

            if (selectSale) {
                const discounted = filtered.filter((item) => item.spec.discount != null);
                const nonDiscounted = filtered.filter((item) => item.spec.discount == null);

                const sortedDiscounted = sortByOption([...discounted]);
                const sortedNonDiscounted = sortByOption([...nonDiscounted]);

                return [...sortedDiscounted, ...sortedNonDiscounted];
            } else {
                return sortByOption([...filtered]);
            }
        })();

        setSortProducts(sorted);
    }, [
        products,
        selectedSorting,
        selectedSize,
        selectedSports,
        selectedWaterProof,
        selectBatterySM,
        selectBatteryGPS,
        minValue,
        maxValue,
        setSortProducts,
        selectSale,
    ]);
};

export default useFilterAndSortProducts;
