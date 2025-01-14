import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scrollYState } from '../atoms/useIndexState';
import useNumberCounting from '../hooks/useNumberCounting';

function MainInfo() {
    const [scrollY] = useAtom(scrollYState);

    const [career, setCareer] = useState(0);
    const [gpa, setGpa] = useState(0);
    const [sales, setSales] = useState(0);
    const [like, setLike] = useState(0);

    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 2015,
        incrementStep: 100,
        duration: 10,
        setState: setCareer,
    });

    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 25000,
        incrementStep: 200,
        duration: 20,
        setState: setSales,
    });

    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 17000,
        incrementStep: 200,
        duration: 20,
        setState: setLike,
    });

    return (
        <Container>
            <Header>
                <Card>
                    <p>누적 업력</p>
                    <h1>{Math.floor(career)}</h1>
                    <span>년</span>
                </Card>
                <Card>
                    <p>스토어 평점</p>
                    <h1>4.88</h1>
                    <span>/5</span>
                </Card>
                <Card>
                    <p>2024 연 판매수량</p>
                    <h1>25,000+</h1>
                </Card>
                <Card>
                    <p>관심 고객수 만명 돌파</p>
                    <h1>17,000+</h1>
                </Card>
            </Header>
        </Container>
    );
}

const Container = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const Card = styled.div`
    flex: 1;
    padding: 20px;
    margin: 10px;
    background: #f5f5f5;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default MainInfo;
