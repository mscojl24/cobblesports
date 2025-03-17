import styled from 'styled-components';
import { bestSellersData } from '../../data/bestSellersData';

function TopPicks() {
    return (
        <TopPicksSection className="flex-center column">
            <TopPicksTitle className="flex-v-center column">
                <h1>
                    지금 제일 잘 나가는 <br />
                    인기템 <span>TOP5</span>
                </h1>
                <p>많은 사람들이 선택한 가민의 인기 제품을 확인하세요</p>
            </TopPicksTitle>
            <TopPicksCard>
                {bestSellersData.map((item, index) => (
                    <TPCard key={index + 1} $bgimg={item.image}>
                        <div className="card-image">
                            <div className="card-num flex-center">0{index + 1}</div>
                        </div>
                        <div className="card-text">
                            <h2 className="title">
                                {item.title}
                                <span className="subtitle">{item.subtitle}</span>
                            </h2>
                            {item.discount && <span className="discount">{item.discount}%</span>}
                            <span className="price">{item.price}원</span>
                        </div>
                    </TPCard>
                ))}
            </TopPicksCard>
        </TopPicksSection>
    );
}

export default TopPicks;

const TopPicksSection = styled.section`
    width: 100%;
    padding: 0px 100px 100px 100px;

    @media (max-width: 1500px) {
        padding: 0px;
    }
`;

const TopPicksTitle = styled.article`
    text-transform: uppercase;
    width: 100%;

    h1 {
        font-family: '42dot Sans';
        font-weight: bold;
        font-size: clamp(20px, 6vw, 50px);
        line-height: 1.2;
        color: #242424;

        span {
            font-family: '42dot Sans';
            color: rgba(0, 0, 0, 0.3);
        }
    }

    p {
        margin-top: 20px;
        width: 100%;
        font-size: clamp(14px, 4vw, 20px);
        line-height: 150%;
    }

    @media (max-width: 1500px) {
        text-align: center;
    }
`;

const TopPicksCard = styled.ul`
    padding: 100px 0px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 860px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

const TPCard = styled.li`
    position: relative;
    cursor: pointer;

    /* 첫 번째 줄 (2개) */
    &:nth-child(1),
    &:nth-child(2) {
        flex: 0 1 calc(50% - 3px);
    }

    /* 두 번째 줄 (3개) */
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
        flex: 0 1 calc(33.3% - 3px);
    }

    .card-num {
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: #fff;
        top: 10px;
        left: 10px;

        font-family: '42dot Sans';
        font-size: clamp(14px, 2vw, 18px);
        font-weight: 800;
        color: #1b1b1b;
    }

    @media (max-width: 860px) {
        width: 100%;
        .card-num {
            width: 40px;
            height: 40px;
            top: 5px;
            left: 5px;
        }
    }

    .card-image {
        border-radius: 0px;
        aspect-ratio: 2/1;
        background: url(${process.env.PUBLIC_URL}${(props) => props.$bgimg}), #f2f3f6;
        background-size: 100%;
        background-position: center;
        transition: all ease-in-out 0.3s;
    }

    .card-image:hover {
        background-size: 110%;
    }

    .card-text {
        margin: 20px 0px 30px 0px;

        > * {
            font-size: clamp(14px, 2vw, 16px);
            margin: 5px 0px;
            font-family: '42dot Sans';
        }

        @media (max-width: 860px) {
            margin: 10px 0px 20px 10px;
            padding: 10px 0px;
        }
    }

    .card-text .title {
        font-weight: 600;
        line-height: 150%;
    }

    .card-text .subtitle {
        margin-left: 8px;

        font-weight: 300;
        font-family: '42dot Sans';
        color: rgba(0, 0, 0, 0.7);
    }

    .card-text .discount {
        color: #3467ff;
        font-weight: 600;
        margin-right: 5px;
    }
`;
