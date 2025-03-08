import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { scrollYState } from './atoms/useIndexState';

function CobbleLogo() {
    const letters = ['C', 'O', 'B', 'B', 'L', 'E'];

    return (
        <LogoBox className="flex-center">
            <img src={`${process.env.PUBLIC_URL}/asset/cobblesports-logo-vacter2.png`} alt="logo-vacter" />
            <div className="logo-text-box flex-center">
                {letters.map((char, index) => (
                    <LogoText key={index} start={1 + index * 0.1}>
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

    transform: scale(0.8);

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
    color: #222;

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
