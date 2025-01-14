import styled from 'styled-components';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';

function MainIntro() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <IntroBox className="flex-center">
            <LeftIntro scrolly={scrollY}>
                <p className="category">About us</p>
                <h1>
                    Your joy,
                    <br />
                    our brand.
                </h1>
                <p className="sub_text">당신이 즐기는 순간이 우리의 브랜드입니다.</p>
            </LeftIntro>
            <RightIntro scrolly={scrollY}>
                <p className="sub_text">
                    <span>유한회사 코블스포츠(Cobble sports)</span>는 2015년 설립 이후 9년간 스포츠와 레저 분야에서
                    끊임없이 성장해 온 전문 기업입니다. 저희는 세계적으로 유명한{' '}
                    <span>GARMIN 제품의 정식 유통 및 판매를 담당하는 공식 인증 브랜드사</span>로, GARMIN 관련 제품
                    부문에서 네이버 스토어 점유율 1위를 기록하며 시장에서 신뢰받고 있습니다. 단순한 물류·유통을 넘어
                    스포츠 용품 개발, 레저/취미 관련 콘텐츠 제작 등 다양한 스포츠 관련 분야에서 창의적인 아이디어를
                    생산하며 오늘도 <span>한 걸음</span> 미래로 나아가겠습니다.
                </p>
            </RightIntro>
        </IntroBox>
    );
}

const IntroBox = styled.div`
    width: 100%;
    height: 440px;
`;

const LeftIntro = styled.div`
    width: 100%;

    transform: translateX(${(props) => (props.scrolly > 200 ? '0px' : '-100px')});
    opacity: ${(props) => (props.scrolly > 200 ? '1' : '0')};
    transition: all ease-in-out 0.5s;

    > * {
        margin: 30px 0px;
    }

    .category {
        color: #285bb9;
        font-size: 16px;
        font-weight: 600;
    }

    h1 {
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        background-image: linear-gradient(rgba(23, 23, 29, 0.8), rgba(76, 76, 97, 0.8)),
            url(../asset/Fenix8-main-banner.jpg);
        background-size: cover;
        font-family: 'Raleway';
        /* color: #343434; */
        font-size: 46px;
        line-height: 110%;
        text-transform: uppercase;
        font-weight: 900;
    }

    .sub_text {
        color: #343434;
        font-size: 16px;
        line-height: 130%;
    }
`;

const RightIntro = styled.div`
    width: 100%;
    /* margin-right: 200px; */

    transform: translateX(${(props) => (props.scrolly > 500 ? '0px' : '-100px')});
    opacity: ${(props) => (props.scrolly > 500 ? '1' : '0')};
    transition: all ease-in-out 0.5s;

    .sub_text {
        color: #343434;
        font-size: 16px;
        line-height: 180%;
    }

    span {
        font-weight: 600;
    }
`;

export default MainIntro;
