import styled from 'styled-components';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import { useState } from 'react';
import useNumberCounting from '../hooks/useNumberCounting';

function CompanyIntro() {
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
        <IntroBox>
            <IntroDescription scrolly={scrollY}>
                <h1>
                    Company
                    <br />
                    Introduction
                </h1>
                <div className="com-script">
                    2015년 설립된 COBBLE SPORTS는 스포츠와 레저 분야에서 꾸준히 성장해 온 전문 브랜드입니다. GARMIN 공식
                    인증 브랜드사로서 네이버 스토어 GARMIN 부문 점유율 1위를 기록하며 신뢰받는 기업으로 자리 잡았습니다.
                    우리는 단순한 유통을 넘어 스포츠 용품 개발, 레저·취미 콘텐츠 제작 등 다양한 분야에서 새로운 가치를
                    만들어가고 있습니다. 스포츠를 더 즐겁고 혁신적으로 즐길 수 있도록, COBBLE SPORTS가 함께하겠습니다.
                </div>
            </IntroDescription>
            <IntroCardSection>
                <article>
                    <IntroCard scrolly={scrollY}>
                        <span>관심고객수</span>
                        <h4>{formatNumber(like)}+</h4>
                    </IntroCard>
                </article>
                <article>
                    <IntroCard2 scrolly={scrollY}>
                        <span>스토어평점</span>
                        <h4>
                            {gpa}.{gpaPoint}
                            <span>/5</span>
                        </h4>
                    </IntroCard2>
                </article>
                <article>
                    <IntroCard3 scrolly={scrollY}>
                        <span>누적업력</span>
                        <h4>
                            {career}
                            <span>년</span>
                        </h4>
                    </IntroCard3>
                    <IntroCard4 scrolly={scrollY}>
                        <span>연 평균 판매수량</span>
                        <h4>{formatNumber(sales)}+</h4>
                    </IntroCard4>
                </article>
            </IntroCardSection>
        </IntroBox>
    );
}

const IntroBox = styled.section`
    width: 100%;
`;

const IntroDescription = styled.aside`
    color: #222222;
    padding: 200px;

    h1 {
        font-size: 64px;
        font-weight: 700;
        line-height: 120%;
        opacity: ${(props) => (props.scrolly > 500 ? '1' : '0')};
        transform: ${(props) => (props.scrolly > 500 ? 'translateX(0px)' : 'translateX(-50px)')};
        transition: all ease-in-out 1s;
    }

    .com-script {
        margin-top: 40px;
        font-size: 15px;
        font-family: '42dot Sans';
        line-height: 180%;
        max-width: 600px;
        color: #343434;

        opacity: ${(props) => (props.scrolly > 800 ? '1' : '0')};
        transform: ${(props) => (props.scrolly > 800 ? 'translateX(0px)' : 'translateX(-50px)')};
        transition: all ease-in-out 1s;

        span {
            font-weight: 700;
        }
    }
`;

const IntroCardSection = styled.aside`
    display: flex;
    align-items: flex-end;
    margin: 0px 20px;

    article {
        width: 100%;
        position: relative;
        margin: 0px 10px;
    }

    article:nth-child(2) {
        width: 70%;
        transform: translateY(-120px);
    }

    article:nth-child(3) {
        width: 120%;
        transform: translateY(-120px);
    }
`;

const IntroCard = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
    padding: 50px;

    height: 700px;
    background: url(${process.env.PUBLIC_URL}/asset/intro/Intro-background-image-01.png);

    border-radius: 20px;
    color: #fff;
    text-shadow: 0px 0px 2px #000;

    span {
        font-size: 20px;
    }

    h4 {
        margin-top: 10px;
        font-family: 'Noto Sans KR';
        font-size: 50px;
        font-weight: 700;

        span {
            font-weight: 400;
        }
    }

    transition: all ease-in-out 0.5s;

    opacity: ${(props) => (props.scrolly > 1200 ? '1' : '0')};
    transform: ${(props) => (props.scrolly > 1200 ? 'scale(1)' : 'scale(0.9)')};
`;

const IntroCard2 = styled(IntroCard)`
    height: 300px;
    background: url(${process.env.PUBLIC_URL}/asset/intro/Intro-background-image-02.png);
    background-size: cover;
`;

const IntroCard3 = styled(IntroCard)`
    width: 70%;
    height: 300px;
    background: url(${process.env.PUBLIC_URL}/asset/intro/Intro-background-image-03.png);
    background-size: cover;
    margin-left: -150px;
`;
const IntroCard4 = styled(IntroCard)`
    margin-top: 20px;
    height: 450px;
    background: url(${process.env.PUBLIC_URL}/asset/intro/Intro-background-image-04.png);
    background-size: cover;
`;

export default CompanyIntro;
