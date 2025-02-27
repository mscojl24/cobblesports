import styled from 'styled-components';

function Recommended() {
    return (
        <NewItemBox>
            <RecommendedScript>
                <h1>Run-Ready Essentials</h1>
                <p>완벽한 러닝을 위한 당신의 선택</p>
            </RecommendedScript>
        </NewItemBox>
    );
}

const NewItemBox = styled.section`
    width: 100%;
    height: 100vh;
    background: url(${process.env.PUBLIC_URL}/asset/recommend-background-image-01.png) cover;
`;

const RecommendedScript = styled.div`
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
        margin: 20px;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
    }
`;

export default Recommended;
