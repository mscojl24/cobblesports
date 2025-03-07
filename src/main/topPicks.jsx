import styled from 'styled-components';
import { bestSellersData } from '../data/bestSellersData';

function TopPicks() {
    return (
        <TopPicksSection className="flex-center column">
            <TopPicksTitle className="flex-center column">
                <h1>Top Pick 5</h1>
                <p>가민의 인기상품을 확인하세요</p>
            </TopPicksTitle>
            <TopPicksCard>
                {bestSellersData.map((item, index) => (
                    <TPCard key={index + 1} bgimg={item.image}>
                        <div className="card-image"></div>
                        <div className="card-text">
                            <h2 className="title">{item.title}</h2>
                            <h3 className="subtitle">{item.subtitle}</h3>
                            {item.discount && <span className="discount">{item.discount}%</span>}
                            <span className="price">{item.price}</span>
                        </div>
                    </TPCard>
                ))}
            </TopPicksCard>
        </TopPicksSection>
    );
}

export default TopPicks;

const TopPicksSection = styled.section`
    display: flex;
    width: 100%;
    padding: 100px;
`;

const TopPicksTitle = styled.article`
    text-align: center;
    text-transform: uppercase;

    h1 {
        font-family: Anton;
        font-size: 50px;
        color: #242424;
    }

    p {
        max-width: 800px;
        margin-top: 30px;
        font-size: 25px;
        line-height: 150%;
    }
`;

const TopPicksCard = styled.ul`
    padding: 100px 0px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const TPCard = styled.li`
    /* 첫 번째 줄 (2개) */
    &:nth-child(1),
    &:nth-child(2) {
        flex: 0 1 calc(50% - 10px);
    }

    /* 두 번째 줄 (3개) */
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
        flex: 0 1 calc(33% - 10px);
    }

    .card-image {
        aspect-ratio: 4 / 2;
        background: url(${process.env.PUBLIC_URL}${(props) => props.bgimg});
        background-size: cover;
    }

    .card-text {
        margin: 20px 0px;

        > * {
            margin: 5px 0px;
            font-family: '42dot Sans';
        }
    }

    .card-text .title {
        font-size: 20px;
        font-weight: 600;
    }
`;
