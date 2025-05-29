import styled from 'styled-components'
import Classification from './products/classification'
import ProductClassification from './products/productClassification'
import ProductsList from './products/productsList'
import { compareState, sortProductsState } from '../atoms/useIndexState'
import { useAtom } from 'jotai'
import ClassProductsIcon from './products/classProductIcon'
import { IoSearch } from 'react-icons/io5'
import { useMemo, useState } from 'react'
import { LuDelete } from 'react-icons/lu'
import ProductSchema from '../productSchema'

function ProductSection() {
   const [products] = useAtom(sortProductsState)
   const [compareList] = useAtom(compareState)
   const [searchKeyword, setSearchKeyword] = useState('')

   const filteredProducts = useMemo(() => {
      if (!searchKeyword.trim()) return products

      const keyword = searchKeyword.trim().toLowerCase().replace(/\s+/g, '')

      return products.filter((product) => {
         const title = (product.title || '').toLowerCase().replace(/\s+/g, '')
         const subtitle = (product.subtitle || '')
            .toLowerCase()
            .replace(/\s+/g, '')
         const script = (product.script || '').toLowerCase().replace(/\s+/g, '')

         // purpose 배열 요소도 동일하게 전처리해서 비교
         const purposeList = Array.isArray(product.purpose)
            ? product.purpose.map((p) =>
                 (p || '').toLowerCase().replace(/\s+/g, '')
              )
            : []

         const matchPurpose = purposeList.some((p) => p.includes(keyword))

         return (
            title.includes(keyword) ||
            subtitle.includes(keyword) ||
            script.includes(keyword) ||
            matchPurpose
         )
      })
   }, [products, searchKeyword])

   return (
      <ProductBox>
         <ProductSchema />
         <CartegoryBox className="flex-h-center column">
            <h1>Find Your Fit</h1>
            <em>원하는 제품을, 원하는 조건에 맞춰 검색하세요.</em>
            <div className="search flex-center">
               {searchKeyword.length >= 1 ? (
                  <LuDelete
                     className="search-icon"
                     onClick={() => {
                        setSearchKeyword('')
                     }}
                  />
               ) : (
                  <IoSearch className="search-icon" />
               )}
               <input
                  type="text"
                  className="search-box"
                  placeholder="원하는 종목 및 제품명을 작성하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
               />
            </div>
         </CartegoryBox>
         <ProductClassification />
         <div
            className="flex-v-center product-box"
            style={{ alignItems: 'flex-start' }}
         >
            <Classification />
            <ProductsList products={filteredProducts} />
         </div>
         {compareList.length >= 1 && <ClassProductsIcon />}
      </ProductBox>
   )
}

export default ProductSection

const ProductBox = styled.section`
   width: 100%;
`

const CartegoryBox = styled.article`
   width: 100%;
   /* background: url(${process.env
      .REACT_APP_PUBLIC_URL}/asset/cobble-categoty-image-01.png);
    background-position: center;
    background-size: cover; */
   padding: 50px;

   gap: 20px;
   h1 {
      font-size: clamp(20px, 6vw, 40px);
      font-family: '42dot Sans';
      font-weight: bold;
      letter-spacing: -1px;
      text-transform: uppercase;
   }

   em {
      text-align: center;
      font-size: clamp(13px, 5vw, 20px);
   }
   .search {
      margin-top: 20px;
      position: relative;
   }

   .search-icon {
      position: absolute;
      right: 20px;
      font-size: 25px;
      color: rgba(0, 0, 0, 0.1);
   }
   .search-box {
      padding: 20px 30px;
      width: 300px;
      min-width: 200px;
      /* background-color: #f8f8f8; */
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-family: '42dot Sans';
      font-size: 18px;

      @media (max-width: 860px) {
         padding: 20px;
      }
   }

   .search-box:focus {
      outline: none;
   }

   .search-box::placeholder {
      color: rgba(0, 0, 0, 0.2);
      font-size: 16px;
      font-family: '42dot Sans';
   }
`
