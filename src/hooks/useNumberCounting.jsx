import { useEffect } from 'react';

function useNumberCounting({ condition, targetValue, incrementStep, duration, setState }) {
    useEffect(() => {
        if (condition) {
            const increment = targetValue / incrementStep; // 한 번에 증가하는 단위
            const interval = setInterval(() => {
                setState((prev) => {
                    if (prev >= targetValue) {
                        clearInterval(interval);
                        return targetValue; // 최종 값 고정
                    }
                    return prev + increment;
                });
            }, duration); // duration 간격마다 실행

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
        }
    }, [condition, targetValue, incrementStep, duration, setState]);
}

export default useNumberCounting;
