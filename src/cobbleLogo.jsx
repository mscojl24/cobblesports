import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { scrollYState } from './atoms/useIndexState';

function CobbleLogo() {
    const [scrollY] = useAtom(scrollYState);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 스크롤 이벤트 최적화 (throttle 적용)
    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                setIsScrollingUp(true); // 위로 스크롤
            } else {
                setIsScrollingUp(false); // 아래로 스크롤
            }

            setLastScrollY(currentScrollY);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // 200 이하에서는 원래 색상을 유지
    const shouldChangeColor = scrollY > 0 && isScrollingUp;

    const letters = ['C', 'O', 'B', 'B', 'L', 'E'];

    return (
        <LogoBox className="flex-center" changeColor={shouldChangeColor}>
            {scrollY > 0 && isScrollingUp ? (
                <img src={`${process.env.PUBLIC_URL}/asset/cobblesports-logo-vacter2.png`} alt="logo-vacter" />
            ) : (
                <img src={`${process.env.PUBLIC_URL}/asset/cobblesports-logo-vacter.png`} alt="logo-vacter" />
            )}
            <div className="logo-text-box flex-center">
                {letters.map((char, index) => (
                    <LogoText key={index} start={1 + index * 0.1} changeColor={shouldChangeColor}>
                        <span className="text-animation">{char}</span>
                    </LogoText>
                ))}
            </div>
        </LogoBox>
    );
}

const LogoBox = styled.ul`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    transform: ${(props) => (props.changeColor ? 'scale(0.8)' : 'scale(1)')};

    img {
        left: 0px;
        position: absolute;
        width: 80px;
    }

    .logo-text-box {
        margin-left: 20px;
        overflow: hidden;
        padding: 0px 10px;
    }
`;

const LogoText = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-style: italic;
    color: ${(props) => (props.changeColor ? '#222' : '#fff')};

    span {
        font-family: 'Anton', serif;
        animation: moveloder 5s ease-in-out infinite both;
        animation-delay: ${(props) => props.start}s;
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
