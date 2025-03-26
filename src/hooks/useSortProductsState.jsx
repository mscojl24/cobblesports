import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
    maxPriceState,
    minPriceState,
    orderState,
    productsState,
    sizeState,
    sortProductsState,
    sportsState,
} from '../atoms/useIndexState';

const useFilterAndSortProducts = () => {
    const [products] = useAtom(productsState);
    const [, setSortProducts] = useAtom(sortProductsState);
    const [selectedSports] = useAtom(sportsState);
    const [selectedSorting] = useAtom(orderState);
    const [selectedSize] = useAtom(sizeState);
    const [minValue] = useAtom(minPriceState);
    const [maxValue] = useAtom(maxPriceState);

    useEffect(() => {
        const safeConvertDate = (dateString) => {
            const parsed = new Date(dateString);
            return isNaN(parsed.getTime()) ? null : parsed;
        };

        const getEffectivePrice = (product) => product.spec.discount ?? product.spec.price;

        const isSizeMatch = (sizeArray) => {
            if (selectedSize === 'ALL') return true;

            const mmSizes = sizeArray.map((s) => parseInt(s.replace('mm', ''), 10)).filter((n) => !isNaN(n));

            return mmSizes.some((mm) => {
                if (selectedSize === 'S') return mm >= 40 && mm <= 44;
                if (selectedSize === 'M') return mm >= 45 && mm <= 47;
                if (selectedSize === 'L') return mm >= 48 && mm <= 51;
                return false;
            });
        };

        const isActivityMatch = (activityProfiles) => {
            // ✅ 'all' 또는 빈 배열은 전체 허용
            if (selectedSports.includes('all') || selectedSports.length === 0) return true;

            // ✅ 모든 선택 종목이 true여야만 통과
            return selectedSports.every((sport) => activityProfiles[sport]);
        };

        const filtered = products.filter((product) => {
            const price = getEffectivePrice(product);
            const isWithinPrice = typeof price === 'number' && price >= minValue && price <= maxValue;
            const isSizeOk = isSizeMatch(product.spec.size);
            const isActivityOk = isActivityMatch(product.activityProfiles);

            return isWithinPrice && isSizeOk && isActivityOk;
        });

        const sorted = [...filtered].sort((a, b) => {
            if (selectedSorting === '최신순') {
                const dateA = safeConvertDate(a.spec.release)?.getTime() ?? 0;
                const dateB = safeConvertDate(b.spec.release)?.getTime() ?? 0;
                return dateB - dateA;
            }

            const priceA = getEffectivePrice(a);
            const priceB = getEffectivePrice(b);

            if (selectedSorting === '높은순') return priceB - priceA;
            if (selectedSorting === '낮은순') return priceA - priceB;

            return 0;
        });

        setSortProducts(sorted);
    }, [products, selectedSorting, selectedSize, selectedSports, minValue, maxValue, setSortProducts]);
};

export default useFilterAndSortProducts;
