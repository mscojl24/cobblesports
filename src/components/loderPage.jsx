import styled, { keyframes, css } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { loderPageState } from '../atoms/useIndexState';

function LoderPage() {
    const [loderPage, setLoderPage] = useAtom(loderPageState);
    const [fadeOut, setFadeOut] = useState(false);
    const [isRendered, setIsRendered] = useState(true);
    const letters = useMemo(() => ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'], []);

    useEffect(() => {
        if (!loderPage) return;

        const timers = [
            setTimeout(() => setFadeOut(true), 2500),
            setTimeout(() => {
                setLoderPage(false);
                setIsRendered(false);
            }, 3500),
        ];

        return () => timers.forEach(clearTimeout);
    }, [loderPage]);

    if (!isRendered) return null; // ✅ 애니메이션 후 DOM에서 완전히 제거

    return (
        <LoderContainer className={fadeOut ? 'fade-out' : ''}>
            <LoderContent>
                {letters.map((char, index) => (
                    <Letter key={index} className={fadeOut ? 'fade-out' : ''}>
                        {char}
                    </Letter>
                ))}
            </LoderContent>
        </LoderContainer>
    );
}

export default LoderPage;

// ✅ 등장 애니메이션 (살짝 위로 올라오면서 등장)
const slideUp = keyframes`
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
`;

// ✅ 사라질 때 (살짝 위로 올라가면서 `opacity`로 사라짐)
const slideUpFadeOut = keyframes`
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
`;

const LoderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.8); /* ✅ 하얀 배경 */
    backdrop-filter: blur(30px);
    animation: ${slideUp} 1s ease-out forwards;

    &.fade-out {
        animation: ${slideUpFadeOut} 1s ease-in forwards;
    }
`;

const LoderContent = styled.div`
    display: flex;
    font-size: 50px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.1); /* ✅ 까만 글씨 */
`;

const Letter = styled.span`
    opacity: 0;
    font-size: clamp(20px, 6vw, 40px);
    font-weight: 500;
    font-family: 'Kanit';

    display: inline-block;
    animation: ${slideUp} 0.8s ease-out forwards;
    animation-delay: ${({ index }) => index * 0.1}s;

    &.fade-out {
        animation: ${slideUpFadeOut} 0.8s ease-in forwards;
    }
`;
