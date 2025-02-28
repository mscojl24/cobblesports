import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { scrollYState } from './atoms/useIndexState';

function CobbleLogo() {
    const [scrollY, setScrollY] = useAtom(scrollYState);

    // 스크롤 이벤트 최적화 (throttle 적용)
    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrollY(window.scrollY);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const letters = ['C', 'O', 'B', 'B', 'L', 'E'];

    return (
        <LogoBox className="flex-center">
            {letters.map((char, index) => (
                <LogoText key={index} start={1 + index * 0.1} scrolly={scrollY}>
                    <span className="text-animation">{char}</span>
                </LogoText>
            ))}
        </LogoBox>
    );
}

const LogoBox = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoText = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: ${(props) => (props.scrolly < window.innerHeight / 2 ? '#fff' : '#222')};
    margin: 0px 1px;
    overflow: hidden;

    span {
        font-family: 'Anton', serif;
        animation: moveloder 5s ease-in-out infinite both;
        animation-delay: ${(props) => props.start}s;
        text-shadow: ${(props) => (props.scrolly < window.innerHeight / 2 ? '0px 0px 3px rgba(0, 0, 0, 0.5)' : 'none')};
    }

    @keyframes moveloder {
        0% {
            transform: translate3d(0, -50px, 0);
            opacity: 1;
        }
        10% {
            transform: translate3d(0, 0px, 0);
            opacity: 1;
        }
        90% {
            transform: translate3d(0, 0px, 0);
            opacity: 1;
        }
        100% {
            transform: translate3d(0, 50px, 0);
            opacity: 1;
        }
    }
`;

export default CobbleLogo;
