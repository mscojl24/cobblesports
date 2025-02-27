import { useAtom } from 'jotai';
import styled from 'styled-components';
import { scrollYState } from './atoms/useIndexState';

function LoderPage() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <LogoBox className="flex-center">
            <LogoText start="1" scrolly={scrollY}>
                <span className="text-animation">C</span>
            </LogoText>
            <LogoText start="1.1" scrolly={scrollY}>
                <span className="text-animation">O</span>
            </LogoText>
            <LogoText start="1.2" scrolly={scrollY}>
                <span className="text-animation">B</span>
            </LogoText>
            <LogoText start="1.3" scrolly={scrollY}>
                <span className="text-animation">B</span>
            </LogoText>
            <LogoText start="1.4" scrolly={scrollY}>
                <span className="text-animation">L</span>
            </LogoText>
            <LogoText start="1.5" scrolly={scrollY}>
                <span className="text-animation">E</span>
            </LogoText>
        </LogoBox>
    );
}

const LogoBox = styled.ul``;

const LogoText = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;

    font-size: 24px;
    color: ${(props) => (props.scrolly > 800 ? '#222' : '#fff')};
    margin: 0px 1px;

    overflow: hidden;

    span {
        font-family: 'Anton', serif;
        animation: moveloder 5s ease-in-out infinite;
        animation-delay: ${(props) => props.start}s;
        text-shadow: ${(props) => (props.scrolly > 800 ? 'none' : '0px 0px 3px rgba(0, 0, 0, 0.5)')};
    }

    @keyframes moveloder {
        0% {
            transform: translateY(-50px);
            opacity: 1;
        }
        10% {
            transform: translateY(0px);
            opacity: 1;
        }
        90% {
            transform: translateY(0px);
            opacity: 1;
        }
        100% {
            transform: translateY(50px);
            opacity: 1;
        }
    }
`;

export default LoderPage;
