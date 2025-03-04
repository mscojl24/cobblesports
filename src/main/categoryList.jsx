import styled from 'styled-components';
import { scrollYState } from '../atoms/useIndexState';
import { TfiArrowRight } from 'react-icons/tfi';

import { useAtom } from 'jotai';

function CategoryList() {
    const [scrollY] = useAtom(scrollYState);

    const categories = [
        { subtitle: 'Running', title: '러닝/마라톤', image: '/categories/running.jpg' },
        { subtitle: 'Cycling', title: '자전거', image: '/categories/cycling.jpg' },
        { subtitle: 'Adventure', title: '아웃도어', image: '/categories/adventure.jpg' },
        { subtitle: 'water', title: '수영/다이빙', image: '/categories/water.jpg' },
        { subtitle: 'Golf', title: '골프', image: '/categories/golf.jpg' },
        { subtitle: 'Fitness', title: '피트니스', image: '/categories/fitness.jpg' },
    ];

    return (
        <CategoryListBox>
            <TitleText className="flex-v-center column" scrollY={scrollY}>
                <div className="title">
                    <h1>Select Your Category</h1>
                </div>
                <div className="sub-title">
                    <p>당신의 카테고리를 선택하세요</p>
                </div>
                <div className="sub-script">
                    <p>
                        Choose your sport and explore a curated selection of premium gear. Whether it’s running, golf,
                        fitness, outdoor adventures, or swimming, we have the perfect products for you. Find
                        high-quality equipment and apparel tailored to your active lifestyle.
                    </p>
                </div>
            </TitleText>
            <CateList>
                {categories.map((cate, index) => (
                    <li key={index} className="flex-center">
                        <div className="flex-center">
                            <span className="text-num">0{index + 1}</span>
                            <h2 className="text-kr">{cate.title}</h2>
                            <h3 className="text-en">{cate.subtitle}</h3>
                        </div>
                        <div className="flex-center go-btn">
                            <button>
                                go <TfiArrowRight className="go-icon" />
                            </button>
                        </div>
                    </li>
                ))}
            </CateList>
        </CategoryListBox>
    );
}

export default CategoryList;

const CategoryListBox = styled.section`
    width: 100%;
    background: url(${process.env.PUBLIC_URL}/asset/category-background-image-00.png);
`;

const TitleText = styled.div`
    text-align: left;
    color: #ffffff;
    padding: 100px;

    /* 메인타이틀 CSS */
    .title {
        padding: 10px 0px;
        overflow: hidden;
        h1 {
            font-weight: 700;
            font-size: 65px;
            line-height: 90%;
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: ${(props) => (props.scrollY > 1000 ? 'text-show 1s forwards 0s' : '')};
        }
    }

    /* 서브 타이틀 CSS */
    .sub-title {
        margin-top: 20px;
        overflow: hidden;
        p {
            font-size: 32px;
            font-weight: 300;
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: ${(props) => (props.scrollY > 1000 ? 'text-show 1s forwards 0.2s' : '')};
        }
    }

    /* 설명문 CSS */
    .sub-script {
        max-width: 600px;
        margin-top: 40px;
        overflow: hidden;
        p {
            font-size: 13px;
            font-weight: 300;
            line-height: 150%;
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0px 0px 2px #000;
            transform: translateY(-100px);
            animation: ${(props) => (props.scrollY > 1000 ? 'text-show 1s forwards 0.4s' : '')};
        }
    }

    @keyframes text-show {
        100% {
            transform: translateY(0);
        }
    }
`;

const CateList = styled.ul`
    width: 100%;
    color: #bababa;

    li {
        overflow: hidden;
        width: 100%;
        justify-content: space-between;
        padding: 40px 100px;
        border-bottom: 1px solid #636363;
        transition: all ease-in-out 0.3s;
        background: linear-gradient(145deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
        cursor: pointer;
    }

    li:hover {
        background: linear-gradient(145deg, rgba(0, 0, 0, 0) 30%, rgba(149, 158, 159, 0.5));
        padding-left: 200px;
        .go-icon {
            transform: translateX(20px);
        }
    }

    .text-num {
        font-family: '42dot Sans';
        font-size: 55px;
        font-weight: 800;
        margin-right: 60px;
    }

    .text-kr {
        font-size: 25px;
        font-weight: 600;
        margin-right: 10px;
    }

    .text-en {
        font-family: '42dot Sans';
        font-size: 25px;
        font-weight: 300;
    }

    .go-btn > button {
        display: flex;
        width: 110px;
        justify-content: space-between;
        color: #bababa;
        font-size: 25px;
        font-weight: 600;
        border: none;
        .go-icon {
            transition: all ease-in-out 0.3s;
        }
    }
`;
