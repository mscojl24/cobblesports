import styled from 'styled-components';

function FindCategory() {
    const categories = [
        { subtitle: 'Running', title: '러닝/마라톤', image: '/categories/running.jpg' },
        { subtitle: 'Cycling', title: '자전거', image: '/categories/cycling.jpg' },
        { subtitle: 'Adventure', title: '아웃도어', image: '/categories/adventure.jpg' },
        { subtitle: 'water', title: '수영/다이빙', image: '/categories/water.jpg' },
        { subtitle: 'Golf', title: '골프', image: '/categories/golf.jpg' },
        { subtitle: 'Fitness', title: '피트니스', image: '/categories/fitness.jpg' },
    ];

    return (
        <FindCategorySection className="flex-center column">
            <FindCategoryTitle className="flex-center column">
                <h1>Find Your Perfect Garmin Gear</h1>
                <p>
                    가민 제품을 스포츠 종목별로 만나보세요. 러닝, 사이클링, 수영, 등산, 철인 3종 등 어떤 스포츠를 즐기든
                    최적의 제품이 준비되어 있습니다. 첨단 기술, 정밀한 트래킹, 강력한 내구성으로 당신의 퍼포먼스를 한
                    단계 끌어올리세요.
                </p>
            </FindCategoryTitle>
            <FindCategoryCard className="flex-center">
                {categories.map((item, index) => (
                    <FCCard key={index + 1} bgimg={item.image}>
                        <h2>{item.title}</h2>
                        <h3>{item.subtitle}</h3>
                        <button>Learn More</button>
                    </FCCard>
                ))}
            </FindCategoryCard>
        </FindCategorySection>
    );
}

export default FindCategory;

const FindCategorySection = styled.section`
    display: flex;
    width: 100%;
    min-height: 100vh;
`;

const FindCategoryTitle = styled.article`
    margin-top: 200px;
    text-align: center;

    h1 {
        font-family: Anton;
        font-size: 65px;
        color: #242424;
    }

    p {
        max-width: 800px;
        margin-top: 30px;
        font-size: 20px;
        line-height: 150%;
    }
`;

const FindCategoryCard = styled.ul`
    border: 1px solid red;
    width: 100%;
    height: 500px;
    margin: 100px;
`;

const FCCard = styled.li``;
