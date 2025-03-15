import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsState } from '../atoms/useIndexState';
import * as XLSX from 'xlsx';

const useFetchExcelData = (url) => {
    const [productData, setProductData] = useAtom(productsState);

    useEffect(() => {
        const fetchExcelFile = async () => {
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // 데이터 변환 로직
                const formattedData = jsonData.map((item) => ({
                    id: item.id,
                    category: item.category,
                    title: item.title,
                    purpose: item.purpose ? item.purpose.split(',') : [],
                    script: item.script,
                    option: {
                        size: item.size.split(','),
                        price: item.price,
                        colorName: item.colorName.split(','),
                        colorCode: item.colorCode.split(','),
                        img: {
                            mainImg: item.main_img,
                            subImg: item.subImg ? item.subImg.split(',') : [],
                        },
                        display: {
                            type: item.displayType,
                            touch: item.touch,
                        },
                    },
                    spec: {
                        gps: item.gps,
                        memory: item.memory,
                        waterRating: item.waterRating || '-',
                        band: item.band,
                        solar: item.solar,
                        Bezelmaterial: item.bezelmaterial,
                        flashlight: item.flashlight,
                        altimeter: item.altimeter,
                        music: item.music,
                        Map: item.map,
                        sleep: item.sleep,
                        call: item.call,
                    },
                    activityProfiles: item.activityProfiles.split(',').map((profile) => profile.trim()),
                    battery: {
                        smartwatch: item.smartwatch,
                        batterySaver: item.batterySaver,
                        gpsOnly: item.gpsOnly,
                    },
                }));

                setProductData(formattedData);
            } catch (error) {
                console.error('엑셀 데이터 로드 실패:', error);
            }
        };

        fetchExcelFile();
    }, [url, setProductData]);

    return productData;
};

export default useFetchExcelData;
