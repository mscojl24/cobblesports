import styled from 'styled-components';

function LoderPage() {
    return (
        <LoderSection className="flex-center">
            <ul className="flex-center">
                <LodingBar start="0.1"></LodingBar>
                <LodingBar start="0.2"></LodingBar>
                <LodingBar start="0.3"></LodingBar>
                <LodingBar start="0.4"></LodingBar>
                <LodingBar start="0.5"></LodingBar>
            </ul>
        </LoderSection>
    );
}

const LoderSection = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 20, 20, 1);
    z-index: 999;

    animation: fadeoutloder 1s ease-in-out forwards;
    animation-delay: 1s;

    @keyframes fadeoutloder {
        100% {
            opacity: 0;
            display: none;
        }
    }
`;

const LodingBar = styled.li`
    width: 5px;
    margin: 0px 4px;
    border-radius: 10px;
    height: 20px;
    background-color: rgba(255, 255, 255, 1);

    animation: moveloder 1s ease-in-out infinite;
    animation-delay: ${(props) => props.start}s;

    @keyframes moveloder {
        20% {
            height: 50px;
            opacity: 0.3;
        }
    }
`;

export default LoderPage;
