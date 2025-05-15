import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { productsState } from '../atoms/useIndexState'
import * as XLSX from 'xlsx'

const useFetchExcelData = (url) => {
   const [productData, setProductData] = useAtom(productsState)

   useEffect(() => {
      const fetchExcelFile = async () => {
         try {
            const response = await fetch(url)
            const arrayBuffer = await response.arrayBuffer()
            const workbook = XLSX.read(arrayBuffer, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(sheet)

            // ✅ 데이터 변환 함수

            const formattedData = jsonData.map((item) => {
               const cleanValue = (value) => {
                  if (value === undefined || value === null || value === 'NaN')
                     return null
                  if (
                     typeof value === 'string' &&
                     value.trim().toLowerCase() === 'true'
                  )
                     return true
                  if (
                     typeof value === 'string' &&
                     value.trim().toLowerCase() === 'false'
                  )
                     return false
                  return value
               }

               const colorNames = item.colorName
                  ? item.colorName.split(',').map((c) => c.trim())
                  : []
               const colorCodes = item.colorCode
                  ? item.colorCode.split(',').map((c) => c.trim())
                  : []

               const color = colorNames.map((name, idx) => ({
                  colorName: name,
                  colorCode: colorCodes[idx] ?? null,
               }))

               // 날짜 변환 함수
               const convertExcelDate = (value) => {
                  if (typeof value === 'number') {
                     const date = new Date((value - 25569) * 86400 * 1000) // 엑셀 기준 날짜: 1899-12-30
                     return date.toISOString().split('T')[0] // YYYY-MM-DD
                  }
                  return value
               }

               return {
                  id: cleanValue(item.id),
                  productNum: cleanValue(item.productNum),
                  link: cleanValue(item.link),
                  title: cleanValue(item.title),
                  subtitle: cleanValue(item.subtitle),
                  purpose: item.purpose
                     ? item.purpose.split(',').map((p) => p.trim())
                     : [],
                  script: cleanValue(item.script),
                  message: cleanValue(item.message),
                  soldout: cleanValue(item.soldout),
                  spec: {
                     price: cleanValue(item.price),
                     size: cleanValue(item.size),
                     weight: cleanValue(item.weight),
                     band: cleanValue(item.band),
                     gps: cleanValue(item.gps),
                     discount: cleanValue(item.discount),
                     release: convertExcelDate(cleanValue(item.release)),
                     color,
                     image: item.image
                        ? item.image.split(',').map((img) => img.trim())
                        : [],
                     display: {
                        color: cleanValue(item.displayColor),
                        type: cleanValue(item.displayType),
                        touch: cleanValue(item.touch),
                        size: cleanValue(item.displaySize),
                     },
                  },
                  option: {
                     memory: cleanValue(item.memory),
                     solar: cleanValue(item.solar),
                     bezelmaterial: cleanValue(item.bezelmaterial),
                     flashlight: cleanValue(item.flashlight),
                     altimeter: cleanValue(item.altimeter),
                     music: cleanValue(item.music),
                     map: cleanValue(item.map),
                     sleep: cleanValue(item.sleep),
                     call: cleanValue(item.call),

                     /*신규 추가 데이터*/

                     iqstore: cleanValue(item.IQstore),
                     ecg: cleanValue(item.ECG),
                     compass: cleanValue(item.compass),
                     runningDynamics: cleanValue(item.runningDynamics),
                     greenContuer: cleanValue(item.greenContuer),
                     pacePro: cleanValue(item.pacePro),
                     tactical: cleanValue(item.tactical),
                     greenContuer: cleanValue(item.greenContuer),
                     hotKey: cleanValue(item.hotKey),
                     mgrs: cleanValue(item.MGRS),
                  },
                  waterProof: {
                     waterRating: cleanValue(item.waterRating),
                     divingRating: cleanValue(item.divingRating),
                  },
                  activityProfiles: {
                     running: cleanValue(item.running),
                     swim: cleanValue(item.swim),
                     indoorSwim: cleanValue(item.poolOnly),
                     cycling: cleanValue(item.cycling),
                     multisport: cleanValue(item.multisport),
                     hiking: cleanValue(item.hiking),
                     diving: cleanValue(item.diving),
                     golf: cleanValue(item.golf),
                     fitness: cleanValue(item.fitness),
                  },
                  battery: {
                     smartwatch: cleanValue(item.smartwatch),
                     gpsOnly: cleanValue(item.gpsOnly),
                  },
               }
            })

            setProductData(formattedData)
         } catch (error) {
            console.error('엑셀 데이터 로드 실패:', error)
         }
      }

      fetchExcelFile()
   }, [url, setProductData])

   return productData
}

export default useFetchExcelData
