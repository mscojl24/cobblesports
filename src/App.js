import './css/App.css'
import styled from 'styled-components'
import Navi from './navigation/navi'
import MainSection from './components/mainSection'
import LoderPage from './components/loderPage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai'
import {
   loderPageState,
   scrollXState,
   scrollYState,
   compareMax,
   popupTextState,
} from './atoms/useIndexState.jsx'
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5'

import { useEffect } from 'react'
import ProductSection from './components/productSection'
import useFetchExcelData from './hooks/useFetchExcelData'
import { MdNotificationsActive } from 'react-icons/md'
import CompareSection from './components/compareSection.jsx'
import ScrollToTop from './components/scrollToTop.jsx'

function App() {
   const setScrollY = useSetAtom(scrollYState)
   const setScrollX = useSetAtom(scrollXState)
   const [loderPage] = useAtom(loderPageState)
   const [isCompareMax] = useAtom(compareMax)
   const [popupText] = useAtom(popupTextState)

   // ✅ 커스텀 훅 사용하여 데이터 불러오기
   useFetchExcelData(process.env.REACT_APP_PRODUCTS_DATA_URL)

   const handleScroll = () => {
      setScrollY(window.scrollY)
   }

   const handleResize = () => {
      setScrollX(window.innerWidth)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
      setScrollX(window.innerWidth)

      return () => {
         window.removeEventListener('scroll', handleScroll)
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '가민 공식 브랜드샵 코블스포츠',
      url: 'https://cobblesports.com',
      logo: 'https://cobblesports.com/asset/cobble-ios-icon.png',
      sameAs: [
         'https://www.instagram.com/cobblesports_official/',
         'https://www.youtube.com/@COBBLESPORTS_official',
         'https://cafe.naver.com/cobblesports',
         'https://pf.kakao.com/_fcPxaG',
      ],
   }

   return (
      <Router basename="/">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />
         <Navi />
         <BoxMargin>
            <ScrollToTop />
            <Routes>
               <Route path="/" element={<MainSection />} />
               <Route path="/products" element={<ProductSection />} />
               <Route path="/compare" element={<CompareSection />} />
            </Routes>
         </BoxMargin>
         {loderPage && <LoderPage />}
         {popupText && (
            <BottomAlertBox className="flex-center">
               <MdNotificationsActive color="#333" />
               {popupText}
            </BottomAlertBox>
         )}
      </Router>
   )
}

const BottomAlertBox = styled.div`
   position: fixed;
   bottom: 80px;
   left: 50%;
   max-width: 100%;
   transform: translateX(-50%);
   background-color: rgba(255, 255, 255, 1);
   color: rgba(0, 0, 0, 0.8);
   box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
   font-size: 16px;
   padding: 12px 30px;
   border-radius: 50px;
   z-index: 9999;
   font-family: '42dot Sans';
   font-weight: 500;
   animation: fadeInOut 3s ease forwards;
   white-space: nowrap;
   gap: 7px;

   @keyframes fadeInOut {
      0% {
         opacity: 0;
         transform: translateX(-50%) translateY(20px);
      }
      10%,
      90% {
         opacity: 1;
         transform: translateX(-50%) translateY(0px);
      }
      100% {
         opacity: 0;
         transform: translateX(-50%) translateY(20px);
      }
   }

   @media (max-width: 860px) {
      font-size: 14px;
   }
`

const BoxMargin = styled.section`
   margin-top: 70px;

   @media (max-width: 1500px) {
      margin-top: 50px;
   }
`

export default App
