import styled from 'styled-components';
import { PiArrowCircleDownRightThin } from 'react-icons/pi';

import { useState } from 'react';

function CobbleNews() {
    const snslist = [
        {
            title: 'Youtube',
            subtitle: '유튜브 채널',
            script: '최신 스포츠 용품 리뷰부터 실전 활용법, 비교 분석까지! 생생한 영상으로 제품의 특징을 확인하고, 전문가의 팁과 노하우를 통해 최적의 선택을 할 수 있도록 도와드립니다. 다양한 스포츠 관련 콘텐츠와 함께 실전 사용 후기도 제공하여 더욱 신뢰할 수 있는 정보를 전해드립니다.',
            image: `${process.env.PUBLIC_URL}/asset/snslist/sns-image-01.mp4`,
            link: '',
        },
        {
            title: 'Naver Cafe',
            subtitle: '네이버카페',
            script: '스포츠 용품에 대한 심층 리뷰, 사용자 후기, 공동 구매 및 다양한 정보 공유! 스포츠를 사랑하는 사람들이 모여 자유롭게 소통하고, 최신 트렌드와 전문가 팁을 통해 더 나은 운동 경험을 만들어가는 커뮤니티입니다. 초보부터 전문가까지 누구나 참여할 수 있어요!',
            image: `${process.env.PUBLIC_URL}/asset/snslist/sns-image-02.mp4`,
            link: '',
        },
        {
            title: 'instargram',
            subtitle: '인스타그램',
            script: '최신 스포츠 용품 소식, 신상품 출시 정보, 실전 활용 팁까지! 감각적인 이미지와 짧은 영상으로 생생한 스포츠 트렌드를 만나보세요. 다양한 이벤트와 특별 프로모션, 스포츠 소식까지 한눈에 확인할 수 있는 공간입니다.',
            image: `${process.env.PUBLIC_URL}/asset/snslist/sns-image-03.mp4`,
            link: '',
        },
        {
            title: 'KAKAO Channel',
            subtitle: '카카오 채널',
            script: '신상품 알림, 이벤트 소식, 빠른 상담까지! 카톡으로 손쉽게 스포츠 용품 정보를 받아보고, 1:1 상담을 통해 제품 추천부터 구매, A/S 문의까지 편리하게 해결하세요. 실시간 소식을 가장 빠르게 받아볼 수 있는 채널입니다.',
            image: `${process.env.PUBLIC_URL}/asset/snslist/sns-image-04.mp4`,
            link: '',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [bgImage, setBgimage] = useState(snslist[0].image);

    const handleToggle = (index, image) => {
        setActiveIndex(index);
        setBgimage(image);
    };

    return (
        <NewsSection>
            <SectionTitle>
                <h1>COBBLE NEWS</h1>
                <span>코블스포츠의 다양한 커뮤니티 소식을 확인해보세요</span>
            </SectionTitle>
            <div className="SNS-box flex-v-center">
                <SNSImage>
                    <video key={bgImage} className="bg-video" autoPlay muted loop>
                        <source src={bgImage} type="video/mp4" />
                    </video>
                </SNSImage>
                <SNSList>
                    {snslist.map((list, index) => (
                        <li
                            key={index}
                            className={`flex-v-center ${activeIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => handleToggle(index, list.image)}>
                            <div className="list-number">0{index + 1}</div>
                            <div className="list-name">
                                <h2>
                                    <strong>{list.title}</strong> {list.subtitle}
                                </h2>
                                <p>{list.script}</p>
                                <div className="link-arrow">
                                    <PiArrowCircleDownRightThin />
                                </div>
                            </div>
                        </li>
                    ))}
                </SNSList>
            </div>
        </NewsSection>
    );
}

const NewsSection = styled.section`
    width: 100%;
    height: 100vh;

    .SNS-box {
        width: 100%;
        height: 100%;
        padding: 100px 200px;
    }
`;

const SectionTitle = styled.div`
    text-align: center;
    color: #2f2f2f;

    h1 {
        font-size: 50px;
        font-weight: 700;
        margin: 20px 0px;
    }
`;

const SNSImage = styled.aside`
    width: 70%;
    height: 100%;
    border: 1px solid #000;
    transition: all ease-in 0.3s;
    overflow: hidden;

    .bg-video {
        height: 100%;
    }
`;

const SNSList = styled.ul`
    width: 100%;
    padding: 0px 50px;

    li {
        width: 100%;
        max-height: 130px;
        border-top: 1px solid #4a4a4a;
        padding: 50px;
        overflow: hidden;
        transition: all 1s ease-out;
        cursor: pointer;
    }

    /* 클릭된 항목만 height: 100% */
    li.active {
        max-height: 500px;
        background-color: #fafafd;
    }

    /* 마지막 li는 보더 추가 */
    li:nth-last-child(1) {
        border-bottom: 1px solid #4a4a4a;
    }

    .list-number {
        font-weight: 600;
    }

    .list-name {
        width: 100%;
        padding-left: 20px;

        h2 {
            font-size: 24px;
            text-transform: uppercase;
            strong {
                font-weight: 700;
            }
        }

        p {
            margin-top: 50px;
            line-height: 180%;
            color: rgba(0, 0, 0, 0.6);
        }
    }

    .link-arrow {
        margin-top: 20px;
        font-size: 40px;
        text-align: right;
        transition: all ease-in 0.3s;
    }

    li:hover {
        .link-arrow {
            animation: scaleIcon 1.5s forwards 0.2s;
        }

        @keyframes scaleIcon {
            0% {
                opacity: 0;
                transform: translate(-20px, -20px);
            }
            50% {
                transform: translate(0px, 0px);
            }
            100% {
                opacity: 1;
            }
        }
    }
`;

export default CobbleNews;
