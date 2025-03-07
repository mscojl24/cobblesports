import styled from 'styled-components';
import { scrollYState } from '../atoms/useIndexState';
import { TfiArrowRight } from 'react-icons/tfi';

import { useAtom } from 'jotai';

function CategoryList() {
    const [scrollY] = useAtom(scrollYState);

    const categories = [
        { subtitle: 'Youtube', title: '유튜브채널' },
        { subtitle: 'Naver Cafe', title: '스포츠 커뮤니티' },
        { subtitle: 'Kakao Chanel', title: '카카오채널' },
        { subtitle: 'Instargram', title: '인스타그램' },
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
    display: flex;
    width: 100%;
    background: url(${process.env.PUBLIC_URL}/asset/category-background-image-01.png);
`;

const TitleText = styled.div`
    width: 80%;
    height: 100%;
    text-align: left;
    color: #161616;
    padding: 100px;

    /* 메인타이틀 CSS */
    .title {
        padding: 10px 0px;
        overflow: hidden;
        h1 {
            font-family: Anton;
            font-size: 65px;
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
            transform: translateY(-100px);
            animation: ${(props) => (props.scrollY > 1000 ? 'text-show 1s forwards 0.2s' : '')};
        }
    }

    /* 설명문 CSS */
    .sub-script {
        max-width: 80%;
        margin-top: 40px;
        overflow: hidden;
        p {
            font-size: 13px;
            font-weight: 300;
            line-height: 150%;
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
    overflow: hidden;

    color: #161616;
    border-right: 1px solid rgba(0, 0, 0, 0.2);

    li {
        overflow: hidden;
        width: 100%;
        justify-content: space-between;
        padding: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        transition: all ease-in-out 0.3s;
        cursor: pointer;
    }

    li:first-child {
        border-top: none;
    }

    li:hover {
        background: linear-gradient(145deg, rgba(0, 0, 0, 0) 30%, rgba(68, 79, 80, 0.5));
        /* padding-left: 100px; */
        .go-icon {
            transform: translateX(10px);
        }
    }

    .text-num {
        font-family: '42dot Sans';
        font-weight: 700;
        font-size: 55px;
        margin-right: 40px;
        color: 33eE3E;
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
        color: #161616;
        font-size: 25px;
        font-weight: 600;
        border: none;
        .go-icon {
            transition: all ease-in-out 0.3s;
        }
    }
`;
