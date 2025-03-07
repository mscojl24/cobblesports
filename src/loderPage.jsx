import styled from 'styled-components';
import { useMemo } from 'react';

function LoderPage() {
    const letters = useMemo(() => ['C', 'O', 'B', 'B', 'L', 'E'], []);

    return (
        <LoderSection>
            <FadeBackground className="flex-center">
                <ul className="flex-center">
                    {letters.map((char, index) => (
                        <LodingBar key={index} start={1 + index * 0.1}>
                            <span className="text-animation">{char}</span>
                        </LodingBar>
                    ))}
                </ul>
            </FadeBackground>
        </LoderSection>
    );
}

const LoderSection = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(200px);
    z-index: 999;
    overflow: hidden;

    /* 전체 화면 페이드 아웃 */
    animation: fadeoutContainer 0.6s ease-in-out forwards 3s;

    @keyframes fadeoutContainer {
        100% {
            height: 0;
        }
    }
`;

const FadeBackground = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    /* height: 0; */
    background-color: rgba(0, 0, 0, 1);

    /* 배경 페이드 인 */
    /* animation: fadeInBackground 0.6s ease-in-out forwards 0.5s; */

    @keyframes fadeInBackground {
        100% {
            height: 100vh;
        }
    }

    ul {
        opacity: 0;
        animation: fadeInText 0.6s ease-in-out forwards 1s;

        @keyframes fadeInText {
            to {
                opacity: 1;
            }
        }
    }
`;

const LodingBar = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #fff;
    margin: 0px 2px;
    overflow: hidden;

    animation: fadeOutText 0.5s ease-in-out forwards 2.5s;

    span {
        font-family: 'Anton', serif;
        transform: translate3d(0, -20px, 0);
        will-change: transform, opacity;
        animation: moveLoader 0.5s ease-in-out forwards;
        animation-delay: ${(props) => props.start}s;
    }

    @keyframes moveLoader {
        0% {
            opacity: 1;
        }
        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes fadeOutText {
        0% {
            opacity: 1;
        }
        100% {
            margin: 0px 10px;
            opacity: 0;
        }
    }
`;

export default LoderPage;
