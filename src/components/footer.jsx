import styled from 'styled-components'
import { BsArrowUpCircle } from 'react-icons/bs'

function Footer() {
   return (
      <FooterBox className="flex-v-center">
         <CompanyInfo className="flex-v-center column">
            <h1 className="company-name">유한회사 코블스포츠</h1>
            <div className="information-text flex-v-center column">
               <small> 대표자 : 박준아 | 사업자등록번호 : 489-86-02035</small>
               <small>
                  {' '}
                  본사주소 : (우)35264 대전광역시 서구 계룡로 599, 102호 |
                  대표번호 : +82 70-4236-1122
               </small>
               <small>
                  {' '}
                  102, 599 Gyeryong-ro, Seo-gu, Daejeon, 35264, Republic of
                  Korea{' '}
               </small>
               <small>
                  {' '}
                  본 사이트의 컨텐츠는 저작권법의 보호를 받는 바 무단 전재,
                  복사, 배포 등을 금합니다.
               </small>
            </div>
            <h2 className="company-name-en">COBBLE SPORTS Co.,Ltd</h2>
         </CompanyInfo>
         <PageUp>
            <BsArrowUpCircle />
         </PageUp>
      </FooterBox>
   )
}

export default Footer

const FooterBox = styled.footer`
   width: 100%;
   justify-content: space-between;
   background-color: #000;
   padding: 100px;

   @media (max-width: 860px) {
      padding: 50px 30px;
      display: none;
   }
`

const CompanyInfo = styled.div`
   color: #fff;
   font-weight: 300;

   .company-name {
      font-size: clamp(16px, 6vw, 22px);
      margin-bottom: 20px;
   }

   .information-text small {
      font-size: clamp(13px, 5vw, 14px);
      font-family: '42dot Sans';
      color: rgba(255, 255, 255, 0.5);
      margin: 3px 0px;
      line-height: 1.2;
   }

   .company-name-en {
      font-size: clamp(20px, 6vw, 40px);
      font-family: Anton;
      margin-top: 50px;
      @media (max-width: 860px) {
         margin-top: 30px;
      }
   }
`

const PageUp = styled.button`
   font-size: clamp(20px, 6vw, 50px);
   width: 50px;
   height: 50px;
   color: #fff;
   border: none;
   cursor: pointer;

   @media (max-width: 860px) {
      display: none;
   }
`
