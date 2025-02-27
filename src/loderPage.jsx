import styled from 'styled-components';

function LoderPage() {
    return (
        <LoderSection>
            <div className="flex-center">
                <ul className="flex-center">
                    <LodingBar start="1">
                        <span className="text-animation">C</span>
                    </LodingBar>
                    <LodingBar start="1.1">
                        <span className="text-animation">O</span>
                    </LodingBar>
                    <LodingBar start="1.2">
                        <span className="text-animation">B</span>
                    </LodingBar>
                    <LodingBar start="1.3">
                        <span className="text-animation">B</span>
                    </LodingBar>
                    <LodingBar start="1.4">
                        <span className="text-animation">L</span>
                    </LodingBar>
                    <LodingBar start="1.5">
                        <span className="text-animation">E</span>
                    </LodingBar>
                </ul>
            </div>
        </LoderSection>
    );
}

const LoderSection = styled.div`
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(200px);
    z-index: 999;
    overflow: hidden;

    div {
        position: absolute;
        bottom: 0px;
        width: 100vw;
        height: 0vh;
        background-color: rgba(0, 0, 0, 1);

        animation: fadeoutloder 0.6s ease-in-out forwards 0.5s;

        @keyframes fadeoutloder {
            100% {
                height: 100vh;
            }
        }
    }

    ul {
        opacity: 0;
        animation: fadeoutloder1 0.6s ease-in-out forwards 1s;

        @keyframes fadeoutloder1 {
            to {
                opacity: 1;
            }
        }
    }

    animation: fadeoutloder2 0.6s ease-in-out forwards 3s;

    @keyframes fadeoutloder2 {
        100% {
            height: 0vh;
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
    animation: textfadeout 0.5s ease-in-out forwards 2.5s;

    span {
        font-family: 'Anton', serif;
        transform: translateY(-20px);
        animation: moveloder 0.5s ease-in-out forwards;
        animation-delay: ${(props) => props.start}s;
    }

    @keyframes moveloder {
        0% {
            opacity: 1;
        }
        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }

    @keyframes textfadeout {
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
