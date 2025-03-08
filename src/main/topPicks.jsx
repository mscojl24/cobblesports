import styled from 'styled-components';
import { bestSellersData } from '../data/bestSellersData';

function TopPicks() {
    return (
        <TopPicksSection className="flex-center column">
            <TopPicksTitle className="flex-v-center column">
                <h1>
                    셀러들이 선택한 <br />
                    베스트상품 TOP5
                </h1>
                <p>수 많은 셀러들이 선택한 가민의 인기상품을 확인하세요</p>
            </TopPicksTitle>
            <TopPicksCard>
                {bestSellersData.map((item, index) => (
                    <TPCard key={index + 1} bgimg={item.image}>
                        <div className="card-image"></div>
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
    display: flex;
    width: 100%;
    padding: 0px 100px 100px 100px;
`;

const TopPicksTitle = styled.article`
    text-transform: uppercase;
    width: 100%;

    h1 {
        font-family: '42dot Sans';
        font-weight: bold;
        font-size: 50px;
        line-height: 1.2;
        color: #242424;
    }

    p {
        max-width: 800px;
        margin-top: 20px;
        font-size: 20px;
        line-height: 150%;
    }
`;

const TopPicksCard = styled.ul`
    padding: 100px 0px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
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
        border-radius: 10px;
        aspect-ratio: 2/1;
        background: url(${process.env.PUBLIC_URL}${(props) => props.bgimg}), #f2f3f6;
        background-size: cover;
    }

    .card-text {
        margin: 20px 0px 30px 0px;

        > * {
            margin: 8px 0px;
            font-family: '42dot Sans';
        }
    }

    .card-text .title {
        font-weight: 600;
    }

    .card-text .subtitle {
        margin-left: 10px;

        font-weight: 300;
        font-family: '42dot Sans';
        color: rgba(0, 0, 0, 0.7);
    }

    .card-text .discount {
        color: #ff660d;
        font-weight: 600;
    }
`;
