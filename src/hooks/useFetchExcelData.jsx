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

                // ✅ 데이터 변환 함수
                const cleanValue = (value) => {
                    if (value === undefined || value === null || value === 'NaN') return null;
                    if (typeof value === 'string' && value.trim().toLowerCase() === 'true') return true;
                    if (typeof value === 'string' && value.trim().toLowerCase() === 'false') return false;
                    return value;
                };

                const formattedData = jsonData.map((item) => ({
                    id: cleanValue(item.id),
                    productNum: cleanValue(item.productNum),
                    title: cleanValue(item.title),
                    purpose: item.purpose ? item.purpose.split(',').map((p) => p.trim()) : [],
                    script: cleanValue(item.script),
                    option: {
                        size: item.size ? item.size.split(',').map((s) => s.trim()) : [],
                        weight: cleanValue(item.weight),
                        price: cleanValue(item.price),
                        discount: cleanValue(item.discount),
                        release: cleanValue(item.release),
                        colorName: item.colorName ? item.colorName.split(',').map((c) => c.trim()) : [],
                        colorCode: item.colorCode ? item.colorCode.split(',').map((c) => c.trim()) : [],
                        image: item.image ? item.image.split(',').map((img) => img.trim()) : [],
                        display: {
                            type: cleanValue(item.displayType),
                            touch: cleanValue(item.touch),
                        },
                    },
                    spec: {
                        gps: cleanValue(item.gps),
                        memory: cleanValue(item.memory),
                        waterRating: cleanValue(item.waterRating),
                        band: cleanValue(item.band),
                        solar: cleanValue(item.solar),
                        Bezelmaterial: cleanValue(item.bezelmaterial),
                        flashlight: cleanValue(item.flashlight),
                        altimeter: cleanValue(item.altimeter),
                        music: cleanValue(item.music),
                        Map: cleanValue(item.map),
                        sleep: cleanValue(item.sleep),
                        call: cleanValue(item.call),
                    },
                    activityProfiles: {
                        running: cleanValue(item.running),
                        swim: cleanValue(item.swim),
                        indoorSwim: cleanValue(item.indoorSwim),
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
                }));

                setProductData(formattedData);

                // console.log(formattedData[1].option.img.mainImg);
            } catch (error) {
                console.error('엑셀 데이터 로드 실패:', error);
            }
        };

        fetchExcelFile();
    }, [url, setProductData]);

    return productData;
};

export default useFetchExcelData;
