import styled from 'styled-components';
import { productData } from '../../data/productsData';
import Products from '../../hooks/products';

import { MdAllInclusive } from 'react-icons/md';
import { useAtom } from 'jotai';
import { productsState } from '../../atoms/useIndexState';

function FullRange() {
    const [products] = useAtom(productsState);

    return (
        <FullRangeSection>
            <FRTitleBox>
                <MdAllInclusive color="#ccc" className="FR-icon" />
                <h1 className="flex-v-center column">한눈에 보는 모든 상품 라인업</h1>
                <p>필요한 아이템을 빠르게 비교하고 찾아보세요!</p>
            </FRTitleBox>
            <FRItemBox className="flex-v-center">
                <Products products={products} />
            </FRItemBox>
        </FullRangeSection>
    );
}

export default FullRange;

const FullRangeSection = styled.section`
    width: 100%;
    padding: 100px;
    transition: all ease-in-out 1s;

    @media (max-width: 1500px) {
        padding: 100px 50px;
    }

    @media (max-width: 860px) {
        padding: 50px 0px;
    }
`;

const FRItemBox = styled.article`
    width: 100%;
    margin: 100px 0px;

    @media (max-width: 860px) {
        margin: 50px 0px;
    }
`;

const FRTitleBox = styled.article`
    width: 100%;

    .FR-icon {
        font-size: clamp(20px, 6vw, 50px);
    }

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
        max-width: 800px;
        margin-top: 20px;
        font-size: clamp(13px, 4vw, 20px);
        line-height: 150%;
    }

    @media (max-width: 860px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }
`;
