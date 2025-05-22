import { useAtom } from 'jotai'
import styled from 'styled-components'
import {
   sortProductsState,
   compareState,
   compareMax,
   popupTextState,
} from '../../atoms/useIndexState'
import { formatPrice } from '../../hooks/useFormatPrice'
import useFilterAndSortProducts from '../../hooks/useSortProductsState'
import { useEffect, useState } from 'react'
import NotData from './notData'
import { RiArrowDownSLine } from 'react-icons/ri'
import { LuCirclePlus } from 'react-icons/lu'
import { BsPatchPlusFill, BsPlusCircleDotted } from 'react-icons/bs'
import { FaCirclePlus } from 'react-icons/fa6'
import { FaSearchPlus } from 'react-icons/fa'

function ProductsList({ products }) {
   const [selectedImageIndexes, setSelectedImageIndexes] = useState({})
   const [imageLoading, setImageLoading] = useState({})
   const [openColorIndex, setOpenColorIndex] = useState(null)

   const [, setPopupText] = useAtom(popupTextState)
   useFilterAndSortProducts()

   const [compareList, setCompareList] = useAtom(compareState)
   const [, setCompareMax] = useAtom(compareMax)

   // 이미지가 없을 경우에도 로딩 상태를 false로 설정
   useEffect(() => {
      products.forEach((item, index) => {
         const imageLength = item?.spec?.image?.length ?? 0
         if (imageLength === 1) {
            setImageLoading((prev) => ({ ...prev, [index]: false }))
         }
      })
   }, [products])

   const toggleColorDropdown = (index) => {
      setOpenColorIndex((prev) => (prev === index ? null : index))
   }

   const handleColorSelect = (productIndex, colorIndex) => {
      handleColorClick(productIndex, colorIndex)
      setOpenColorIndex(null)
   }

   const handleBuyClick = (link) => {
      window.open(link, '_blank')
   }

   // 이미지 변경 로직 및 컬러 선택

   const handleCompareClick = (productNum) => {
      const productKey = String(productNum)
      const isIncluded = compareList.includes(productKey)

      const showPopup = (msg) => {
         setPopupText('')
         setTimeout(() => {
            setPopupText(msg)
         }, 10)
      }

      if (isIncluded) {
         const updated = compareList.filter((num) => num !== productKey)
         setCompareList(updated)
         showPopup('비교 리스트에서 제거되었습니다.')
      } else {
         if (compareList.length >= 3) {
            setCompareMax(false)
            setTimeout(() => setCompareMax(true), 10)
            showPopup('비교 상품은 총 3개까지 선택이 가능합니다.')
            return
         }

         setCompareList([...compareList, productKey])
         showPopup('비교 리스트에 추가되었습니다.')
      }
   }

   const handleColorClick = (productIndex, colorIndex) => {
      setSelectedImageIndexes((prev) => ({
         ...prev,
         [productIndex]: colorIndex,
      }))

      const imageExists = products[productIndex]?.spec?.image?.[colorIndex]
      if (imageExists) {
         setImageLoading((prev) => ({
            ...prev,
            [productIndex]: true,
         }))
      } else {
         setImageLoading((prev) => ({
            ...prev,
            [productIndex]: false,
         }))
      }
   }

   const handleImageLoad = (productIndex) => {
      setImageLoading((prev) => ({
         ...prev,
         [productIndex]: false,
      }))
   }

   return (
      <ProductsListBox className="flex-center">
         <ProductsCard className="flex-h-center">
            {products.length > 0 ? (
               products.map((item, index) => {
                  const discount = item.spec.discount
                  const price = item.spec.price
                  const selectedIndex = selectedImageIndexes[index] ?? 0
                  const selectedImage = item.spec?.image[selectedIndex]

                  const isNew = (() => {
                     if (!item.spec.release) return false
                     const releaseDate = new Date(item.spec.release)
                     const now = new Date()
                     const fourMonthsAgo = new Date()
                     fourMonthsAgo.setMonth(now.getMonth() - 4)
                     return releaseDate >= fourMonthsAgo
                  })()

                  return (
                     <li key={index} className="flex-h-center column">
                        <ProImage className="product-image flex-center">
                           {/* 컬러 선택 셀렉트 버튼 */}
                           <ColorSelectWrapper>
                              <ColorSelectButton
                                 onClick={() => {
                                    if (item.spec.color.length > 1) {
                                       toggleColorDropdown(index)
                                    }
                                 }}
                              >
                                 {item.spec.color[selectedIndex]?.colorName}
                                 {item.spec.color.length === 1 && ' (단일컬러)'}
                                 {item.spec.color.length > 1 && (
                                    <RiArrowDownSLine />
                                 )}
                              </ColorSelectButton>

                              {openColorIndex === index &&
                                 item.spec.color.length > 1 && (
                                    <ColorSelectList>
                                       {item.spec.color.map((color, idx) => (
                                          <li
                                             key={idx}
                                             className={
                                                selectedIndex === idx
                                                   ? 'selected'
                                                   : ''
                                             }
                                             onClick={() =>
                                                handleColorSelect(index, idx)
                                             }
                                          >
                                             <ColorCode
                                                className="color-code"
                                                $code={color.colorCode}
                                             />
                                             <span>{color.colorName}</span>
                                          </li>
                                       ))}
                                    </ColorSelectList>
                                 )}
                           </ColorSelectWrapper>

                           {/* 뱃지 이미지 출력 */}
                           <div className="badge-box flex-center">
                              {isNew && <NewBadge>2025</NewBadge>}
                              {discount && <SaleBadge>SALE</SaleBadge>}
                              <PointBadge>적립5%</PointBadge>
                           </div>

                           {/* 제품 이미지 출력 */}
                           <div className="image-wrapper">
                              {imageLoading[index] && (
                                 <ImagePlaceholder className="flex-center">
                                    Loading...
                                 </ImagePlaceholder>
                              )}
                              <img
                                 src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${selectedImage}`}
                                 alt={item.title}
                                 onLoad={() => handleImageLoad(index)}
                                 style={{
                                    opacity: imageLoading[index] ? 0 : 1,
                                 }}
                              />
                           </div>
                        </ProImage>

                        <ProScript>
                           <div className="flex-v-center column">
                              <strong className="pro-title">
                                 {item.title}, {item.spec.size}
                              </strong>
                              <em className="pro-price">
                                 {formatPrice(discount ?? price)}원{' '}
                                 {discount && (
                                    <em className="discount-text">
                                       -
                                       {Math.round(
                                          ((price - discount) / price) * 100
                                       )}
                                       % 할인
                                    </em>
                                 )}
                              </em>

                              <span className="pro-spec">{item.message}</span>
                           </div>

                           <BtnBox className="flex-center column">
                              <button
                                 className="sell"
                                 onClick={() => handleBuyClick(item.link)}
                              >
                                 <strong className="btn-text">
                                    제품 구매하기{' '}
                                 </strong>{' '}
                                 <FaCirclePlus
                                    fontSize="22px"
                                    className="btn-icon"
                                 />
                              </button>
                              <button
                                 className={`compare ${
                                    compareList.includes(
                                       String(item.productNum)
                                    )
                                       ? 'active'
                                       : ''
                                 }`}
                                 onClick={() =>
                                    handleCompareClick(item.productNum)
                                 }
                              >
                                 <FaSearchPlus /> 스펙 비교하기
                              </button>
                           </BtnBox>
                        </ProScript>
                     </li>
                  )
               })
            ) : (
               <div className="not-data-wrapper">
                  <NotData />
               </div>
            )}
         </ProductsCard>
      </ProductsListBox>
   )
}

export default ProductsList

const ProductsListBox = styled.section`
   width: 100%;
   margin-bottom: 100px;
`

const ProductsCard = styled.ul`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 15px;
   padding: 10px;
   min-height: 500px;

   li {
      display: flex;
      flex-direction: column;
      height: 100%;
   }

   // ✅ 제품이 없을 때 NotDataBox만 있을 경우 중앙 정렬
   & > .not-data-wrapper {
      grid-column: 1 / -1; // 전체 열 차지
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
   }

   @media (min-width: 860px) {
      padding: 20px;
      grid-template-columns: repeat(3, 1fr);
   }

   @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
   }
`

/* ✅ 이미지 스타일 -------------------------------------------------*/

const ProImage = styled.div`
   position: relative;
   background-color: #f8f8f8;
   border: 1px solid rgba(0, 0, 0, 0.02);

   .image-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      aspect-ratio: 6/7;
      text-align: center;

      img {
         width: 100%;
         aspect-ratio: 1/1;
         object-fit: cover;
         border-radius: 10px;
         transition: opacity 0.3s ease-in-out;
      }
   }

   .badge-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 1;
      gap: 3px;
   }

   @media (max-width: 860px) {
      .badge-box {
         position: absolute;
         bottom: 10px;
         right: 10px;
         z-index: 1;
         gap: 3px;
      }
   }
`

const ImagePlaceholder = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   border-radius: 10px;
   font-family: 'Big Shoulders';
   color: rgba(0, 0, 0, 0.3);
   font-weight: bold;
   font-size: 20px;
`

/* ✅ 스크립트 (워치정보) 스타일 -------------------------------------------------*/

const ProScript = styled.div`
   padding: 20px;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   flex-direction: column;

   /* background-color: #f8f8f8; */
   margin-top: 10px;

   & > * {
      line-height: 1.5;
      font-weight: 600;
      font-size: 18px;
   }

   .pro-title,
   .pro-price {
      font-family: '42dot Sans';
   }

   .pro-spec {
      margin-top: 15px;
      font-size: 13px;
      font-weight: 400;
      word-break: break-all;
      color: rgba(0, 0, 0, 0.6);
      font-family: '42dot Sans';

      strong {
         font-weight: bold;
         color: rgba(0, 0, 0, 0.8);
      }
   }

   .spec-box {
      padding: 20px;
      background-color: #f8f8f8;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.02);
   }

   .discount-text {
      width: 100%;
      font-family: '42dot Sans';
      font-size: 14px;
      font-weight: bold;
      color: #cc3e3e;
   }

   @media (max-width: 860px) {
      padding: 10px;

      .pro-spec {
         font-size: 12px;
      }
   }
`

/* ✅ 컬러 아이콘 스타일 -------------------------------------------------*/

const ColorSelectWrapper = styled.div`
   position: absolute;
   top: 20px;
   left: 20px;
   z-index: 10;
   width: auto;

   @media (max-width: 860px) {
      top: 10px;
      left: 10px;
   }
`

const ColorSelectButton = styled.button`
   background: transparent;
   border: none;
   border-bottom: 2px solid rgba(0, 0, 0, 0.2);
   font-size: 14px;
   color: #333;
   font-family: '42dot Sans';
   display: flex;
   align-items: center;
   gap: 4px;
   padding: 5px 0px;
   cursor: pointer;
   border-radius: 0px;

   svg {
      font-size: 12px;
      color: #aaa;
   }
`

const ColorSelectList = styled.ul`
   position: absolute;
   top: 30px;
   left: 0;

   background: white;
   border: 1px solid #ccc;
   list-style: none;
   padding: 6px 0;
   width: max-content;
   z-index: 100;

   li {
      display: flex;
      flex-direction: row;
      align-items: center;

      gap: 6px;
      width: 100%;
      padding: 8px;
      font-size: 13px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.8);

      &:hover {
         background-color: #f8f8f8;
      }

      &.selected {
         font-weight: bold;
         color: #000;
      }
   }
`

const ColorCode = styled.div`
   width: 12px;
   height: 12px;
   border-radius: 3px;
   border: 1px solid rgba(0, 0, 0, 0.1);
   background-color: ${(props) => props.$code};
`

/* ✅ NEW 배지 스타일 -------------------------------------------------*/
const NewBadge = styled.div`
   padding: 3px;
   font-family: '42dot Sans';
   font-size: 12px;
   color: #0873ff;
   border: 1px solid #0873ff;

   @media (max-width: 860px) {
      font-size: 10px;
      width: auto;
      padding: 5px 10px;
      border-radius: 30px;
   }
`

const SaleBadge = styled(NewBadge)`
   color: #f3703c;
   border: 1px solid #f3703c;
`

const PointBadge = styled(NewBadge)`
   color: #212221;
   border: 1px solid #212221;
`

/* ✅ 버튼 스타일 -------------------------------------------------*/

export const BtnBox = styled.div`
   width: 100%;
   margin-top: 20px;
   justify-content: right;
   align-items: end;

   button {
      display: flex;
      align-items: center;
      justify-content: space-between;

      /* width: 60%; */
      padding: 15px 15px 15px 20px;
      gap: 10px;
      margin: 3px;
      font-weight: 600;
      cursor: pointer;
      background-color: #f8f8f8;
      border: none;
      border-radius: 50px;

      .btn-text {
         font-size: 14px;
         font-family: '42dot Sans';
      }

      .btn-icon {
         color: #0873ff;
      }
   }

   button:hover {
      .btn-icon {
         color: #000;
      }
   }

   .compare {
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 8px;
      background-color: rgba(0, 0, 0, 0);
      text-align: right;
      padding: 5px 0px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      border-radius: 0px;
      border-bottom: 2px dotted rgba(0, 0, 0, 0.5);
   }

   .compare.active {
      color: #0873ff;
      border-color: #0873ff;
   }

   @media (max-width: 860px) {
      button {
         /* border-radius: 3px; */
         margin: 3px;
         padding: 10px 10px 10px 20px;

         .btn-text {
            font-size: 13px;
         }
         .btn-icon {
            font-size: 20px;
         }
      }

      .compare {
         font-size: 12px;
      }

      .sell {
         width: 100%;
      }
   }
`
