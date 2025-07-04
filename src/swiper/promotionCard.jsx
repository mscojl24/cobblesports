import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'

function PromotionCard() {
   const promotion = [
      {
         title: '🌠 가민 #신제품 퀴즈 이벤트',
         subtitle: '2인치 사각 디스플레이, 압도적인 스포츠 워치는?',
         color: '#000000',
         fontcolor: '#ffce74',
         link: `https://cafe.naver.com/cobblesports/10123`,
      },
      {
         title: '❤️ 가민 베뉴X1 찜하기 이벤트',
         subtitle: '신제품 콕 찍어놓으면 가민 시계를 준다고?',
         color: '#c02b2b',
         fontcolor: '#ffbaba',
         link: `https://cafe.naver.com/cobblesports/10116`,
      },
      {
         title: '💙 가민 포러너 570/970 찜하기 이벤트',
         subtitle: '제품만 찜해도 50만원 상당의 제품이?!',
         color: '#d0e8eb',
         fontcolor: '#1f5363',
         link: `https://cafe.naver.com/cobblesports/7817`,
      },
      {
         title: '🖊️ 코블스포츠 구매인증 이벤트',
         subtitle: '제품 구매하면 제품이 하나 더! +',
         color: '#000000',
         fontcolor: '#6faeff',
         link: `https://cafe.naver.com/cobblesports/8440`,
      },
      {
         title: '👟 가민 챌린저스 운동인증 EVENT',
         subtitle: '하루하루를 더욱 건강하게',
         color: '#d0ddeb',
         fontcolor: '#3a5e94',
         link: `https://cafe.naver.com/cobblesports/8230`,
      },
   ]

   return (
      <>
         <Swiper
            spaceBetween={0}
            autoplay={{
               delay: 4000,
               disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
         >
            {promotion.map((item, index) => (
               <SwiperSlide key={index}>
                  <Promotion
                     className="flex-center column"
                     color={item.color}
                     $fontcolor={item.fontcolor}
                     onClick={() => {
                        window.open(item.link, '_blank', 'noopener,noreferrer')
                     }}
                  >
                     <p className="promotion-sub">{item.subtitle}</p>
                     <h1 className="promotion-title">{item.title}</h1>
                  </Promotion>
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

const Promotion = styled.article`
   position: relative;
   width: 100%;
   height: 200px;
   padding: 100px;
   background: linear-gradient(
      160deg,
      ${(props) => props.color} 50%,
      ${(props) => props.$fontcolor} 180%
   );
   transition: all 0.3s ease-in-out;
   cursor: pointer;

   & > * {
      margin: 7px 0px;
      color: ${(props) => props.$fontcolor};
      text-align: center;
   }

   .promotion-sub {
      font-family: '42dot Sans';
      font-size: clamp(18px, 4vw, 25px);
   }

   .promotion-title {
      font-family: '42dot Sans';
      font-size: clamp(24px, 6vw, 36px);
      font-weight: 700;
   }

   @media (max-width: 860px) {
      height: 150px;
      padding: 30px;
   }
`

export default PromotionCard
