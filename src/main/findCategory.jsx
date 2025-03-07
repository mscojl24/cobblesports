import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

function FindCategory() {
    const categories = [
        {
            title: 'Running',
            subtitle:
                '속도를 체크하고, 심박수를 모니터링하며, 러닝을 최적화하세요. 마라톤 훈련부터 가벼운 러닝까지, 가민과 함께 더 효율적으로 달릴 수 있습니다.',
            image: '/categories/running.jpg',
        },
        {
            title: 'Cycling',
            subtitle:
                '정밀한 파워미터부터 GPS 사이클링 컴퓨터까지, 데이터를 분석하고 경로를 탐색하며, 최고의 퍼포먼스를 경험하세요.',
            image: '/categories/cycling.jpg',
        },
        {
            title: 'Adventure',
            subtitle:
                '등산, 트레킹, 캠핑까지 강인한 내구성과 신뢰할 수 있는 성능. 가민과 함께 퍼포먼스를 측정하고 건강을 관리하며 아웃도어를 즐기세요.',
            image: '/categories/adventure.jpg',
        },
        {
            title: 'water',
            subtitle:
                '수영할 때마다 모든 스트로크와 랩 타임을 기록하세요. 가민 웨어러블로 풀장과 오픈워터에서 더욱 스마트하게 훈련할 수 있습니다.',
            image: '/categories/water.jpg',
        },
        {
            title: 'Golf',
            subtitle:
                '가민 골프로 필드를 정복하세요. 거리 측정부터 코스 데이터까지, 더 똑똑한 플레이로 실력을 향상시킬 수 있습니다.',
            image: '/categories/golf.jpg',
        },
        {
            title: 'Fitness',
            subtitle:
                '근력 운동, HIIT, 회복까지 모든 훈련을 최적화하세요. 운동부터 일상까지 더 활발하게 움직이고, 성장하며, 건강한 라이프스타일을 유지하세요.',
            image: '/categories/fitness.jpg',
        },
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
                        <div className="card-box">
                            <h2 className="card-title">{item.title}</h2>
                            <h3 className="card-subtitle">{item.subtitle}</h3>
                            <button className="card-button">
                                Learn More <MdKeyboardArrowRight />
                            </button>
                        </div>
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
    width: 100%;
    height: 70vh;
    padding: 100px;
    gap: 10px;
`;

const FCCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: end;
    flex: 1;
    width: 100%;
    height: 100%;
    background: #2b2b2b;
    overflow: hidden;
    background: url(${process.env.PUBLIC_URL}${(props) => props.bgimg});
    transition: flex 0.4s ease-in-out;
    cursor: pointer;

    .card-box {
        transform: translateY(130px);
        transition: all ease-in-out 0.3s;
    }

    &:hover {
        flex: 3;
    }

    &:hover .card-box {
        transform: translateY(0px);
    }

    &:hover .card-subtitle,
    &:hover .card-button {
        opacity: 1;
    }

    .card-title {
        padding: 10px 20px;
        font-size: 30px;
        font-weight: 600;
        color: #fff;
    }

    .card-subtitle {
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.5);
        padding: 10px 20px;
        opacity: 0;
        transition: all ease-in-out 1s;
        font-weight: 300;
        min-height: 70px;
        max-height: 75px; /* ✅ 높이 변동 방지 */
        overflow: hidden; /* ✅ 높이보다 넘칠 경우 숨김 */
    }

    .card-button {
        display: flex;
        justify-content: space-between;
        margin: 20px;
        border-radius: 100px;
        color: #fff;
        font-weight: 500;
        border: 1px solid #fff;
        width: 160px;
        opacity: 0;
        transition: all ease-in-out 1s;
    }
`;
