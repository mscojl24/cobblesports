import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { categoriesData } from '../data/categoriseData';

function FindCategory() {
    return (
        <FindCategorySection className="flex-center column">
            <FindCategoryTitle className="flex-center column">
                <h1>Select Your Category</h1>
                <p>당신의 카테고리를 선택하세요</p>
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
    text-align: center;
    text-transform: uppercase;

    h1 {
        font-family: Anton;
        font-size: 50px;
        color: #242424;
    }

    p {
        max-width: 800px;
        margin-top: 30px;
        font-size: 25px;
        line-height: 150%;
    }
`;

const FindCategoryCard = styled.ul`
    margin-top: 100px;
    width: 100%;
    height: 70vh;
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
        color: #ee4b00;
    }
`;
