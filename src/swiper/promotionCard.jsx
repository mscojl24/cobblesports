import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

function PromotionCard() {
    const promotion = [
        {
            title: '프라이스 파이터 할인 최대 38%',
            subtitle: '인기 제품을 합리적인 가격으로 만나보세요',
            image: `/asset/promotion/card-image-01.png`,
            color: '#000000',
            fontcolor: '#ff7f29',
            link: `https://smartstore.naver.com/cobblesports/category/c536631aad7f4e7082e2cc1ec5e790a7?cp=1`,
        },
        {
            title: '가민 챌린저스 운동인증 EVENT',
            subtitle: '하루하루를 더욱 건강하게',
            image: `/asset/promotion/card-image-02.png`,
            color: '#d0ddeb',
            fontcolor: '#3a5e94',
            link: `https://cafe.naver.com/cobblesports/3261`,
        },
        {
            title: '우리, 오늘부터 친구할래?',
            subtitle: '코블스포츠 카카오톡 채널 친구추가 이벤트',
            image: `/asset/promotion/card-image-03.png`,
            color: '#d0e8eb',
            fontcolor: '#1f5363',
            link: `https://www.instagram.com/p/DGDH7txpQ1i/`,
        },
    ];

    return (
        <>
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper">
                {promotion.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Promotion
                            className="flex-center column"
                            color={item.color}
                            $fontcolor={item.fontcolor}
                            onClick={() => {
                                window.open(item.link, '_blank', 'noopener,noreferrer');
                            }}>
                            <p className="promotion-sub">{item.subtitle}</p>
                            <h1 className="promotion-title">{item.title}</h1>
                        </Promotion>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

const Promotion = styled.article`
    position: relative;
    width: 100%;
    height: 200px;
    padding: 100px;
    background: linear-gradient(160deg, ${(props) => props.color} 50%, ${(props) => props.$fontcolor} 180%);
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    & > * {
        margin: 7px 0px;
        color: ${(props) => props.$fontcolor};
    }

    .promotion-sub {
        font-size: 25px;
    }

    .promotion-title {
        font-size: 36px;
        font-weight: 700;
    }
`;

export default PromotionCard;
