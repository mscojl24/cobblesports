import { useEffect } from 'react';

const useNumberCounting = ({ condition, targetValue, duration, setState }) => {
    useEffect(() => {
        if (condition) {
            const increment = targetValue / (duration / 20); // 20ms마다 진행
            let currentValue = 0;

            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    setState(targetValue);
                    clearInterval(interval);
                } else {
                    setState(Math.ceil(currentValue)); // 현재 값을 반올림하여 상태 업데이트
                }
            }, 20); // 20ms마다 실행
            return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
        }
    }, [condition, targetValue, duration, setState]);
};

export default useNumberCounting;
