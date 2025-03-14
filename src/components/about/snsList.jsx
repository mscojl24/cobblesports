import styled from 'styled-components';
import { scrollYState } from '../../atoms/useIndexState';
import { TfiArrowRight } from 'react-icons/tfi';

import { useAtom } from 'jotai';

function SNSList() {
    const [scrollY] = useAtom(scrollYState);

    const categories = [
        { subtitle: 'Youtube', title: '유튜브채널', link: 'https://www.youtube.com/@COBBLESPORTS_official' },
        { subtitle: 'Naver Cafe', title: '스포츠 커뮤니티', link: 'https://cafe.naver.com/cobblesports' },
        { subtitle: 'Kakao Chanel', title: '카카오채널', link: 'https://pf.kakao.com/_fcPxaG' },
        { subtitle: 'Instargram', title: '인스타그램', link: 'https://www.instagram.com/cobblesports_official/' },
    ];

    return (
        <CategoryListBox>
            <TitleText className="flex-v-center column" $scrollY={scrollY}>
                <div className="title">
                    <h1>
                        Cobble <br /> Network <br />
                        Service
                    </h1>
                </div>
                <div className="sub-title">
                    <p>가장 빠른 제품소식을 확인하세요</p>
                </div>
                <div className="sub-script">
                    <p>
                        Get the most exciting sports stories right now. Real-time news and highlights on YouTube and
                        Instagram, with in-depth analysis and community engagement on Kakao Channel and Naver Cafe.
                    </p>
                </div>
            </TitleText>
            <CateList>
                {categories.map((cate, index) => (
                    <li
                        onClick={() => {
                            window.open(cate.link, '_blank', 'noopener,noreferrer');
                        }}
                        key={index}
                        className="flex-center">
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

export default SNSList;

const CategoryListBox = styled.section`
    display: flex;
    width: 100%;
    background: url(${process.env.PUBLIC_URL}/asset/category-background-image-01.png);
    background-size: cover;

    @media (max-width: 860px) {
        flex-direction: column;
    }
`;

const TitleText = styled.div`
    width: 50%;
    height: 100%;
    text-align: left;
    color: #3e3e3e;
    padding: 100px;

    /* 메인타이틀 CSS */
    .title {
        padding: 10px 0px;
        overflow: hidden;
        h1 {
            font-family: anton;
            text-transform: uppercase;
            font-size: clamp(20px, 8vw, 70px);
        }
    }

    /* 서브 타이틀 CSS */
    .sub-title {
        margin-top: 20px;
        overflow: hidden;
        p {
            font-size: clamp(16px, 4vw, 25px);
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
        }
    }

    @keyframes showtaxt {
        100% {
            transform: translateY(0px);
        }
    }

    @media (max-width: 860px) {
        width: 100%;
        padding: 50px 20px;
        text-align: center;

        .sub-script {
            display: none;
        }
    }
`;

const CateList = styled.ul`
    width: 100%;
    overflow: hidden;
    color: #3e3e3e;
    padding: 100px 0px;
    /* border-right: 1px solid rgba(0, 0, 0, 0.2); */

    li {
        overflow: hidden;
        width: 100%;
        justify-content: space-between;
        padding: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        transition: all ease-in-out 0.3s;
        cursor: pointer;
    }

    li:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    li:hover {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
        padding-left: 100px;
        .go-icon {
            transform: translateX(10px);
        }
    }

    .text-num {
        font-family: '42dot Sans';
        font-weight: 700;
        font-size: clamp(13px, 3vw, 20px);
        margin-right: 40px;
        color: rgba(0, 0, 0, 0.5);
    }

    .text-kr {
        font-size: clamp(16px, 3vw, 25px);
        font-weight: 600;
        margin-right: 10px;
    }

    .text-en {
        font-family: '42dot Sans';
        font-size: clamp(14px, 3vw, 25px);
        font-weight: 300;
    }

    .go-btn button {
        display: flex;
        width: 110px;
        justify-content: space-between;
        color: #3e3e3e;
        font-size: clamp(16px, 3vw, 25px);
        font-weight: 600;
        border: none;
        .go-icon {
            transition: all ease-in-out 0.3s;
        }
    }

    @media (max-width: 1500px) {
        .go-btn button {
            width: 110px;
        }
    }

    @media (max-width: 860px) {
        padding: 0px;

        li {
            padding: 20px;
        }

        li:last-child {
            border-bottom: none;
        }

        li:hover {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
            padding: 20px;
            .go-icon {
                transform: translateX(0px);
            }
        }

        .text-num {
            margin-right: 20px;
        }
        .go-btn button {
            width: 85px;
        }
    }
`;
