import React from 'react'

const ProductSchema = () => {
   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
         {
            '@type': 'Product',
            name: '포러너 970',
            image: 'https://cobblesports.com/asset/products/forerunner970/basic-47mm-black.png',
            description: '가민970',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/682ea789b84505306af909bf',
         },
         {
            '@type': 'Product',
            name: '포러너 570',
            image: 'https://cobblesports.com/asset/products/forerunner570/basic-47mm-black.png',
            description: '가민570',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/682ea789ab37d3625243d2dd',
         },
         {
            '@type': 'Product',
            name: '포러너 265',
            image: 'https://cobblesports.com/asset/products/forerunner265/basic-46mm-black.png',
            description: '가민265',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/6811e391b84505306af82c95',
         },
         {
            '@type': 'Product',
            name: '포러너 965',
            image: 'https://cobblesports.com/asset/products/forerunner965/basic-47mm-black.png',
            description: '가민965',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/6811e390ab37d3625242f7da',
         },
         {
            '@type': 'Product',
            name: '인스팅트 3',
            image: 'https://cobblesports.com/asset/products/instinct3/amoled-45mm-black.png',
            description: '가민 인스팅트3',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/68144ff22f0ac5782176a4ee',
         },
         {
            '@type': 'Product',
            name: '택틱스8',
            image: 'https://cobblesports.com/asset/products/tactix8/basic-51mm-black.png',
            description: '가민 택틱스',
            brand: {
               '@type': 'Brand',
               name: 'Garmin',
            },
            url: 'https://mkt.shopping.naver.com/link/6811e1c3815d2663a4629cb5',
         },
      ],
   }

   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
   )
}

export default ProductSchema
