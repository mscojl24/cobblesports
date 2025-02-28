import styled from 'styled-components';
import { PiArrowCircleDownRightThin } from 'react-icons/pi';
import PromotionCard from '../swiper/promotionCard';

function CategoryCard() {
    const categories = [
        { subtitle: 'Youtube', title: '유튜브채널', image: '/categories/running.jpg' },
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
                        만나보세요. 당신의 니즈에 따라 완벽한 아이템을 추천해드립니다.
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
    padding: 200px;
`;

const CategoriesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Card = styled.article`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 50px;
    background-color: #f1f2f3;
    color: #343434;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(0.9);

        .cg-arrow {
            transform: rotate(-45deg);
        }
    }

    .cg-text {
        & > * {
            margin: 10px 0px;
        }

        small {
            font-size: 18px;
            opacity: 0.3;
        }

        h3 {
            font-size: 24px;
            font-weight: 700;
        }
    }

    .cg-arrow {
        display: flex;
        justify-content: end;
        transition: all 0.3s ease-in-out;
        font-size: 40px;
        opacity: 0.2;
    }
`;

const CategoriesScript = styled.aside`
    grid-column: span 2;
    overflow: hidden;
    padding: 0px 100px;
    color: #343434;

    h2 {
        font-size: 50px;
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
