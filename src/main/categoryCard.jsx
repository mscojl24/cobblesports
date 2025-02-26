import styled from 'styled-components';
import { PiArrowCircleDownRightThin } from 'react-icons/pi';
import PromotionCard from '../swiper/promotionCard';

function CategoryCard() {
    const categories = [
        { subtitle: 'Running', title: '러닝', image: '/categories/running.jpg' },
        { subtitle: 'Cycling', title: '자전거', image: '/categories/cycling.jpg' },
        { subtitle: 'Adventure', title: '아웃도어', image: '/categories/adventure.jpg' },
        { subtitle: 'water', title: '수영/다이빙', image: '/categories/water.jpg' },
        { subtitle: 'Golf', title: '골프', image: '/categories/golf.jpg' },
        { subtitle: 'Fitness', title: '피트니스', image: '/categories/fitness.jpg' },
    ];

    return (
        <CategoryCardSection>
            <PromotionCard />
            <CategoriesContainer>
                {categories.slice(0, 2).map((category, index) => (
                    <Card key={index} bgImage={category.image}>
                        <div className="cg-text">
                            <small>{category.title}</small>
                            <h3>{category.subtitle}</h3>
                        </div>
                        <div className="cg-arrow">
                            <PiArrowCircleDownRightThin />
                        </div>
                    </Card>
                ))}
                <CategoriesScript>
                    <h2>Shop by category</h2>
                    <p>
                        러닝, 사이클, 수영, 등산, 피트니스 등 당신이 즐기는 스포츠에 맞춘 최적의 제품을 한곳에서
                        만나보세요. 원하는 운동을 선택하면 필요한 장비와 필수 아이템을 빠르게 찾아볼 수 있어 더욱
                        스마트한 쇼핑이 가능합니다.
                    </p>
                </CategoriesScript>
                {categories.slice(2).map((category, index) => (
                    <Card key={index + 2} bgImage={category.image}>
                        <div className="cg-text">
                            <small>{category.title}</small>
                            <h3>{category.subtitle}</h3>
                        </div>
                        <div className="cg-arrow">
                            <PiArrowCircleDownRightThin />
                        </div>
                    </Card>
                ))}
            </CategoriesContainer>
        </CategoryCardSection>
    );
}

const CategoryCardSection = styled.section`
    width: 100%;
    padding: 50px 200px;
`;

const CategoriesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Card = styled.article`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 15px;
    overflow: hidden;
    /* background: url(${(props) => props.bgImage}) center/cover no-repeat; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px;
    background-color: #f1f2f3;
    color: #222222;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(0.9);

        .cg-arrow {
            transform: rotate(-90deg);
        }
    }

    .cg-text {
        & > * {
            margin: 6px 0px;
        }

        small {
            font-size: 20px;
            opacity: 0.3;
        }

        h3 {
            font-size: 35px;
            font-weight: bold;
        }
    }

    .cg-arrow {
        transition: all 0.3s ease-in-out;
        align-self: flex-end;
        font-size: 50px;
        opacity: 0.2;
    }
`;

const CategoriesScript = styled.aside`
    grid-column: span 2;
    overflow: hidden;
    padding: 0px 50px;
    color: #343434;

    h2 {
        font-size: 64px;
        font-weight: 700;
        padding-bottom: 30px;
    }

    p {
        font-size: 16px;
        line-height: 180%;
        max-width: 500px;
    }
`;

export default CategoryCard;
