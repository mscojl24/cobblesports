import styled from 'styled-components';

function Recommended() {
    return (
        <NewItemBox className="flex-h-center column">
            <RecommendedScript>
                <h1>Run-Ready Essentials</h1>
                <p>완벽한 러닝을 위한 당신의 선택</p>
            </RecommendedScript>
            <button> 제품 확인해보기 </button>
        </NewItemBox>
    );
}

const NewItemBox = styled.section`
    overflow: hidden;
    width: 100%;
    height: 100vh;
    justify-content: space-between;
    background: url(${process.env.PUBLIC_URL}/asset/recommend-background-image-01.png);
    background-size: cover;

    button {
        cursor: pointer;
        width: 300px;
        height: 60px;
        margin: 100px;
        transition: all ease-in-out 0.2s;
        font-size: 18px;
        color: #ffffff;
    }

    button:hover {
        font-weight: 500;
        background: rgba(255, 255, 255, 1);
        color: #1f1f1f;
    }
`;

const RecommendedScript = styled.div`
    z-index: 9;
    color: #fff;
    text-align: center;

    h1 {
        font-size: 80px;
        font-weight: 600;
        text-transform: uppercase;
        padding-top: 100px;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
    }

    p {
        font-weight: 300;
        font-size: 24px;
        margin: 40px;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
    }
`;

export default Recommended;
