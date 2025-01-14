import styled from 'styled-components';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import { companyData } from '../data/companyData';
import { useEffect, useState } from 'react';

function MainBusiness() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <IntroBox>
            <IntroCard scrolly={scrollY} className="flex-h-center">
                {companyData.map((data, index) => (
                    <div className="com-goals flex-v-center column" key={index}>
                        <img src={data.image} alt={data.category} />
                        <p>[{data.category}]</p>
                        <h2>{data.title}</h2>
                        <h4>{data.subTitle}</h4>
                    </div>
                ))}
            </IntroCard>
        </IntroBox>
    );
}

const IntroBox = styled.div`
    width: 100%;
`;

const IntroCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .com-goals {
        width: 24%;
        position: relative;
        height: 300px;
        margin: 10px 0px;
        border-radius: 20px;
        overflow: hidden;
        background-color: rgba(82, 87, 99, 1);
        transition: all 1s ease-in-out 0s;
        opacity: ${(props) => (props.scrolly < 700 ? '0' : '1')};
        transform: ${(props) => (props.scrolly < 700 ? 'translateX(-100px)' : 'translateX(0px)')};

        p,
        h2,
        h4 {
            position: relative;
            color: var(--color-main-001);
            margin: 20px 70px;
        }

        p {
            font-size: 16px;
            font-weight: 700;
        }

        h2 {
            font-size: 40px;
            font-weight: 600;
        }
        img {
            position: absolute;
            object-fit: cover;
            height: 100%;
            width: 100%;
            opacity: 0.8;
            transition: all 0.2s ease-in-out 0s;
        }
    }
    .com-goals:hover {
        img {
            transform: scale(1.2);
        }
    }

    @keyframes fadeinContents {
        100% {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    @media (max-width: 1650px) {
        .com-goals {
            flex: 0 1 49%;
        }
    }
`;

// const RightIntro = styled.div`
//     width: 100%;
//     margin-right: 200px;
// `;

export default MainBusiness;
