import styled from 'styled-components';
import { productData } from '../data/productsData';
import Products from '../hooks/products';

import { MdAllInclusive } from 'react-icons/md';

function FullRange() {
    return (
        <FullRangeSection>
            <FRTitleBox>
                <h1 className="flex-v-center column">
                    <MdAllInclusive color="#ccc" />
                    한눈에 보는
                    <br />
                    모든 상품 라인업
                </h1>
                <p>모든 제품을 한 곳에서 확인하고, 필요한 아이템을 빠르게 찾아보세요!</p>
            </FRTitleBox>
            <FRItemBox className="flex-v-center">
                <Products products={productData} />
            </FRItemBox>
        </FullRangeSection>
    );
}

export default FullRange;

const FullRangeSection = styled.section`
    width: 100%;
    padding: 200px 100px 100px 100px;
`;

const FRItemBox = styled.article`
    width: 100%;
    margin: 100px 0px 200px 0px;

    .test {
        width: 100%;
        max-height: 100%;
        margin-left: 50px;
    }

    .special-offer {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background: url(${process.env.PUBLIC_URL}/asset/categories/golf.png);
        background-size: cover;
    }
`;

const FRTitleBox = styled.article`
    width: 100%;

    h1 {
        font-family: '42dot Sans';
        font-weight: bold;
        font-size: 50px;
        line-height: 1.2;
        color: #242424;

        img {
            margin: 0px 10px;
        }
    }

    p {
        max-width: 800px;
        margin-top: 20px;
        font-size: 20px;
        line-height: 150%;
    }
`;
