import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'

function PromotionCard() {
   const promotion = [
      {
         title: '📦 코블스포츠 구매인증 이벤트',
         subtitle: '구매 인증하고 포러너 265 받아가자!',
         color: '#000000',
         fontcolor: '#c4c4c4',
         link: `https://cafe.naver.com/cobblesports/6472`,
      },
      {
         title: '🌠 코블스포츠 가입 이벤트',
         subtitle: '코블스포츠 가입하면 굿즈가 펑펑~',
         color: '#ffc559',
         fontcolor: '#5e2a00',
         link: `https://cafe.naver.com/cobblesports/7177`,
      },
      {
         title: '🗨️ 코블스포츠 유튜브 댓글 이벤트 ①',
         subtitle: '비보액티브 6 출시기념',
         color: '#d0e8eb',
         fontcolor: '#1f5363',
         link: `https://cafe.naver.com/cobblesports/6222`,
      },
      {
         title: '🗨️ 코블스포츠 유튜브 댓글 이벤트 ②',
         subtitle: '인스팅트3 택티컬 출시기념',
         color: '#000000',
         fontcolor: '#789b41',
         link: `https://cafe.naver.com/cobblesports/6699`,
      },
      {
         title: '💰 프라이스 파이터 할인 최대 38%',
         subtitle: '인기 제품을 합리적인 가격으로 만나보세요',
         color: '#000000',
         fontcolor: '#ff7f29',
         link: `https://smartstore.naver.com/cobblesports/category/c536631aad7f4e7082e2cc1ec5e790a7?cp=1`,
      },
      {
         title: '👟 가민 챌린저스 운동인증 EVENT',
         subtitle: '하루하루를 더욱 건강하게',
         color: '#d0ddeb',
         fontcolor: '#3a5e94',
         link: `https://cafe.naver.com/cobblesports/5078`,
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
