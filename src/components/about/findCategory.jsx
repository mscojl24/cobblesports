import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { categoriesData } from '../../data/categoriseData';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { loderPageState, sportsSorting } from '../../atoms/useIndexState';
import { useNavigate } from 'react-router-dom';

const sportsArray = ['러닝을', '수영을', '모험을', '골프를', '사이클링을', '웰니스를'];

function FindCategory() {
    const [sportIndex, setSportIndex] = useState(0);
    const [sportText, setSportText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [selectSportsSort, setSelectSportsSort] = useAtom(sportsSorting);
    const [loderPage, setLoderPage] = useAtom(loderPageState);
    const navigate = useNavigate();

    useEffect(() => {
        const currentWord = sportsArray[sportIndex];
        const typingSpeed = deleting ? 50 : 150;

        const handleTyping = () => {
            if (!deleting) {
                if (charIndex < currentWord.length) {
                    setSportText((prev) => prev + currentWord[charIndex]);
                    setCharIndex((prev) => prev + 1);
                } else {
                    setTimeout(() => setDeleting(true), 1000);
                }
            } else {
                if (charIndex > 0) {
                    setSportText((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setDeleting(false);
                    setSportIndex((prev) => (prev + 1) % sportsArray.length);
                }
            }
        };

        const typingTimer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(typingTimer);
    }, [charIndex, deleting, sportIndex]);

    const handleCategoryClick = (value) => {
        setSelectSportsSort(value);

        setLoderPage(true); // 로딩 페이지 활성화
        setTimeout(() => {
            navigate('/products');
        }, 1000); // 약간의 delay 후 이동 (자연스럽게 보이도록)
    };

    return (
        <FindCategorySection className="flex-center column">
            <FindCategoryTitle className="flex-v-center column">
                <h1>
                    당신의 <TypingText>{sportText}</TypingText> 위한 <br />
                    최적의 제품
                </h1>
                <p>스포츠를 선택하고 나에게 알맞는 제품을 찾아보세요.</p>
            </FindCategoryTitle>
            <FindCategoryCard className="flex-center">
                {categoriesData.map((item, index) => (
                    <FCCard key={index + 1} $bgimg={item.image}>
                        <div className="card-box">
                            <h2 className="card-title">{item.title}</h2>
                            <h3 className="card-subtitle">{item.subtitle}</h3>
                            <button
                                className="card-button"
                                onClick={() => {
                                    handleCategoryClick(item.value);
                                }}>
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
    padding: 200px 100px;
    transition: all ease-in-out 1s;

    @media (max-width: 1500px) {
        padding: 100px 0px;
    }
`;

const FindCategoryTitle = styled.article`
    text-align: left;
    width: 100%;

    h1 {
        font-weight: bold;
        font-size: clamp(20px, 6vw, 50px);
        line-height: 1.2;
        color: #242424;
        transition: all ease-in-out 0.3s;
    }

    p {
        max-width: 100%;
        margin-top: 20px;
        font-size: clamp(13px, 5vw, 20px);
        line-height: 150%;
        transition: all ease-in-out 0.3s;
    }

    @media (max-width: 1500px) {
        text-align: center;
    }

    @media (max-width: 860px) {
        text-align: center;
        h1 {
            font-size: clamp(20px, 6vw, 50px);
        }
        p {
            display: none;
        }
    }
`;

const TypingText = styled.span`
    color: rgba(0, 0, 0, 0.3);
    font-weight: bold;
    border-right: 3px solid rgba(0, 0, 0, 0.3);
    padding-right: 5px;
    animation: blink 0.7s infinite alternate ease-out; // 부드러운 깜빡임 적용

    @keyframes blink {
        from {
            /* border-color: #2b2b2b; */
        }
        to {
            border-color: transparent;
        }
    }
`;

const FindCategoryCard = styled.ul`
    margin-top: 100px;
    width: 100%;
    height: 50vh;
    gap: 10px;

    @media (max-width: 1500px) {
        margin-top: 50px;
        gap: 3px;
    }

    @media (max-width: 860px) {
        margin-top: 50px;
        height: 100vh;
        flex-direction: column;
        gap: 3px;
    }
`;

const FCCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: end;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url(${(props) => props.$bgimg});
    background-size: cover;
    background-position: center;
    border-radius: 0px;
    transition: flex 0.4s ease-in-out;
    cursor: pointer;

    .card-box {
        transform: translateY(140px);
        transition: all ease-in-out 0.5s;
        padding: 30px;
    }

    &:hover {
        flex: 3.5;
    }

    &:hover .card-box {
        transform: translateY(0px);
    }

    &:hover .card-subtitle,
    &:hover .card-button {
        opacity: 1;
    }

    .card-title {
        padding-top: 10px;
        font-size: clamp(13px, 5vw, 30px);
        font-weight: 600;
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7);
        color: #fff;
    }

    .card-subtitle {
        line-height: 1.4;
        color: #fff;
        padding-top: 10px;
        opacity: 0;
        font-size: 14px;
        transition: all ease-in-out 1s;
        font-weight: 300;
        max-width: 80%;
        min-height: 70px;
        max-height: 75px;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
        overflow: hidden;
    }

    .card-button {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        border-radius: 100px;
        color: #fff;
        font-weight: 700;
        border: 1px solid #fff;
        width: 160px;
        opacity: 0;
        transition: all ease-in-out 0.3s;
        cursor: pointer;
    }

    .card-button:hover {
        background: rgba(255, 255, 255, 1);
        color: #3467ff;
    }

    @media (max-width: 1500px) {
        .card-button {
            font-size: 14px;
            width: 150px;
        }
    }

    @media (max-width: 860px) {
        height: 100vh;
        border-radius: 0px;

        &:hover {
            flex: 5;
        }

        .card-box {
            transform: translateY(100% -30px);
        }
    }
`;
