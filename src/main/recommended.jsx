import styled from 'styled-components';
import { scrollYState } from '../atoms/useIndexState';
import { useAtom } from 'jotai';

function Recommended() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <NewItemBox className="column" $scrollY={scrollY}>
            <RecommendedScript $scrollY={scrollY}>
                <div className="text-ani1">
                    <h1>Run-Ready Essentials</h1>
                </div>
                <div className="text-ani2">
                    <p>완벽한 러닝을 위한 당신의 선택</p>
                </div>
            </RecommendedScript>
            <button> Forerunner 965 </button>
        </NewItemBox>
    );
}

const NewItemBox = styled.section`
    display: flex;
    justify-items: right;
    align-items: end;

    overflow: hidden;

    aspect-ratio: 16/9;
    padding: 100px;
    background: url(${process.env.PUBLIC_URL}/asset/recommend-background-image-01.png);
    background-size: cover;

    button {
        cursor: pointer;
        padding: 20px 50px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
        margin-top: 100px;
        opacity: ${(props) => (props.$scrollY > 300 ? '1' : '0')};
        transition: all ease-in-out 0.5s;
    }

    button:hover {
        font-weight: 500;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, 1);
        color: #1f1f1f;
    }

    @media (max-width: 860px) {
        display: flex;
        justify-items: center;
        align-items: center;
        padding: 30px;
        width: 100%;
        height: 100%;
        aspect-ratio: 5/4;

        button {
            width: 200px;
            height: 55px;
            padding: 0px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
            font-family: '42dot Sans';
            opacity: ${(props) => (props.$scrollY > 100 ? '1' : '0')};
        }
    }
`;

const RecommendedScript = styled.div`
    width: 100%;
    color: #fff;
    text-align: right;

    h1 {
        font-family: Anton;
        font-size: 65px;
        text-transform: uppercase;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
        transform: ${(props) => (props.$scrollY > 300 ? 'translateY(0px);' : 'translateY(-100px);')};
        transition: all ease-in-out 1s;
        transition-delay: 0s;
    }

    p {
        font-weight: 300;
        font-size: 32px;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
        transform: ${(props) => (props.$scrollY > 300 ? 'translateY(0px);' : 'translateY(-80px);')};
        transition: all ease-in-out 1s;
        transition-delay: 0.2s;
    }

    .text-ani1 {
        overflow: hidden;
    }

    .text-ani2 {
        overflow: hidden;
        margin-top: 20px;
    }

    @media (max-width: 860px) {
        text-align: center;

        h1 {
            font-size: 40px;
            transform: ${(props) => (props.$scrollY > 100 ? 'translateY(0px);' : 'translateY(-100px);')};
        }
        p {
            font-size: 20px;
            transform: ${(props) => (props.$scrollY > 100 ? 'translateY(0px);' : 'translateY(-80px);')};
        }
    }
`;

export default Recommended;
