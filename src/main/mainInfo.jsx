import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scrollYState } from '../atoms/useIndexState';
import useNumberCounting from '../hooks/useNumberCounting';
import { IoBusinessOutline, IoBriefcaseOutline, IoNotificationsOutline, IoRibbonOutline } from 'react-icons/io5';

function MainInfo() {
    const [scrollY] = useAtom(scrollYState);

    const [career, setCareer] = useState(0);
    const [gpa, setGpa] = useState(0);
    const [gpaPoint, setGpaPoint] = useState(0);
    const [sales, setSales] = useState(0);
    const [like, setLike] = useState(0);

    // 누적 업력
    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 2015,
        duration: 2000, // 2초 동안 카운트
        setState: setCareer,
    });

    // 스토어평점
    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 4,
        duration: 2000, // 2초 동안 카운트
        setState: setGpa,
    });
    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 88,
        duration: 2000, // 2초 동안 카운트
        setState: setGpaPoint,
    });

    // 판매수량
    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 25000,
        duration: 2000, // 2초 동안 카운트
        setState: setSales,
    });

    // 기타 숫자들도 필요하면 동일하게 추가
    useNumberCounting({
        condition: scrollY >= 1000,
        targetValue: 17000,
        duration: 2000,
        setState: setLike,
    });

    // 숫자를 3자리마다 콤마로 포맷
    const formatNumber = (num) => num.toLocaleString();

    return (
        <>
            <Container scrolly={scrollY}>
                <Header>
                    <Card>
                        <div className="info-title">
                            <IoBusinessOutline /> <p>누적 업력</p>
                        </div>
                        <span className="info_numbers">{career}</span>
                        <span className="info_smalltext">년</span>
                    </Card>
                    <Card>
                        <div className="info-title">
                            <IoRibbonOutline /> <p>스토어 평점</p>
                        </div>
                        <span className="info_numbers">
                            {gpa}.{gpaPoint}
                        </span>
                        <span className="info_smalltext">/5</span>
                    </Card>
                    <Card>
                        <div className="info-title">
                            <IoBriefcaseOutline /> <p>2024 연 판매수량</p>
                        </div>
                        <span className="info_numbers">{formatNumber(sales)}+</span>
                    </Card>
                    <Card>
                        <div className="info-title">
                            <IoNotificationsOutline /> <p>관심 고객수 만명 돌파</p>
                        </div>
                        <span className="info_numbers">{formatNumber(like)}+</span>
                    </Card>
                </Header>
            </Container>
        </>
    );
}

const Container = styled.div`
    margin: 10px 0px;
    background-color: #f8f8f8;
    padding: 70px 0px;
    border-radius: 20px;
    transition: all ease-in-out 0.5s;
    transform: translateX(${(props) => (props.scrolly > 1000 ? '0px' : '-100px')});
    opacity: ${(props) => (props.scrolly > 1000 ? '1' : '0')};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Card = styled.div`
    width: 100%;
    text-align: center;

    .info-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #969696;
        margin-bottom: 14px;
    }
    .info-title > *:nth-child(1) {
        margin-right: 5px;
    }

    .info_icons {
        display: flex;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        background-color: #f0f0f0;
    }

    .info_numbers {
        font-size: 60px;
        color: #343434;
        font-weight: 800;
    }

    .info_smalltext {
        font-size: 24px;
        color: #343434;
    }
`;

export default MainInfo;
