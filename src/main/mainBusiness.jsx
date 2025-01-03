import styled from 'styled-components';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import { companyData } from '../data/companyData';

function MainBusiness() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <IntroBox className="flex-center">
            <LeftIntro scrollY={scrollY}>
                {companyData.map((data, index) => (
                    <div className="com-goals" key={index}>
                        <p>[{data.category}]</p>
                        <h2>{data.title}</h2>
                        <h4>{data.subTitle}</h4>
                    </div>
                ))}
            </LeftIntro>
            <RightIntro scrollY={scrollY}></RightIntro>
        </IntroBox>
    );
}

const IntroBox = styled.div`
    width: 100%;
`;

const LeftIntro = styled.div`
    width: 100%;
    margin-left: 200px;

    .com-goals {
        width: 100%;
        height: 300px;
        background-image: linear-gradient(rgba(82, 87, 99, 0.2), rgba(82, 87, 99, 0.2)), url(${(props) => props.image});
        background-size: cover;
        /** 백그라운드 어떻게 넣을것인지 고민해야함. 맵 돌린 상태에서 스타일드 컴포넌트에 데이터를 넣어야함. */
        margin-bottom: 20px;
    }
`;

const RightIntro = styled.div`
    width: 100%;
    margin-right: 200px;
`;

export default MainBusiness;
