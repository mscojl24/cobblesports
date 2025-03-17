import { useEffect } from 'react';
import styled from 'styled-components';
import ProdouctCard from '../../swiper/prodoctCard';
import { useAtom } from 'jotai';
import { productsState } from '../../atoms/useIndexState';

function NewArrival() {
    const [products] = useAtom(productsState);

    useEffect(() => {
        console.log('✅ 현재 products 상태:', products);
    }, [products]);

    // ✅ 보여줄 제품 번호 목록
    const selectedProductNums = [
        '10842668413',
        '10842664841',
        '11549203117',
        '11310815985',
        '11427677905',
        '11466050722',
    ];

    // ✅ 필터링 로직 (productNum이 숫자형일 수도 있음)
    const filteredProducts = products.filter((product) => selectedProductNums.includes(String(product.productNum)));

    return (
        <NewArrivalSection>
            <NATitleBox>
                <h1 className="flex-h-center">
                    지금 가장 핫한
                    <br />{' '}
                    <img
                        src={`${process.env.PUBLIC_URL}/asset/Garmin_C-black.png`}
                        alt="garmin logo"
                        height="40"
                    />{' '}
                    신제품 모음.zip
                </h1>
                <p>올해 가장 기대되는 신제품, 여기 다 모였다!</p>
            </NATitleBox>
            <NAItemBox>
                {filteredProducts.length > 0 ? (
                    <ProdouctCard products={filteredProducts} />
                ) : (
                    <p>데이터를 불러오는 중...</p>
                )}
            </NAItemBox>
        </NewArrivalSection>
    );
}

export default NewArrival;

const NewArrivalSection = styled.section`
    width: 100%;
    padding: 0px 100px 100px 100px;

    @media (max-width: 1500px) {
        padding: 0px;
    }
`;

const NATitleBox = styled.article`
    width: 100%;

    h1 {
        font-family: '42dot Sans';
        font-weight: bold;
        font-size: clamp(20px, 6vw, 50px);
        line-height: 1.2;
        color: #242424;

        img {
            margin: 0px 10px;
        }
    }

    p {
        width: 100%;
        margin-top: 20px;
        font-size: clamp(14px, 4vw, 20px);
        line-height: 150%;
    }

    @media (max-width: 1500px) {
        text-align: center;
        h1 {
            flex-direction: column;
        }
    }
`;

const NAItemBox = styled.article``;
