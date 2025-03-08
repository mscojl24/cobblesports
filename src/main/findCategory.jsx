import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { categoriesData } from '../data/categoriseData';
import { useEffect, useState } from 'react';

const sportsArray = ['러닝을', '수영을', '모험을', '골프를', '사이클링을', '웰니스를'];

function FindCategory() {
    const [sportIndex, setSportIndex] = useState(0);
    const [sportText, setSportText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

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
    padding: 200px 100px;
`;

const FindCategoryTitle = styled.article`
    text-align: left;
    width: 100%;
    /* text-transform: uppercase; */

    h1 {
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
`;

const FCCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: end;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url(${(props) => props.bgimg});
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    transition: flex 0.4s ease-in-out;
    cursor: pointer;

    .card-box {
        transform: translateY(140px);
        transition: all ease-in-out 0.5s;
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
        padding: 10px 30px;
        font-size: 30px;
        font-weight: 600;
        color: #fff;
    }

    .card-subtitle {
        line-height: 1.4;
        color: #fff;
        padding: 10px 30px;
        opacity: 0;
        transition: all ease-in-out 1s;
        font-weight: 300;
        max-width: 80%;
        min-height: 70px;
        max-height: 75px;
        overflow: hidden;
    }

    .card-button {
        display: flex;
        justify-content: space-between;
        margin: 30px;
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
`;
