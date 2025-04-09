import { useAtom } from 'jotai';
import { compareState } from '../atoms/useIndexState';
import styled from 'styled-components';
import CompareProduct from './compare/compareProduct';

function CompareSection() {
    const [compareList] = useAtom(compareState);

    return (
        <CompareBox className="flex-center column">
            <CompareTitle className="flex-center column">
                <h1>Compare Now</h1>
                <em>다양한 제품을 비교해보고 스펙을 확인하세요.</em>
            </CompareTitle>
            <CompareProduct />
        </CompareBox>
    );
}

export default CompareSection;

const CompareBox = styled.section`
    width: 100%;
`;

const CompareTitle = styled.div`
    padding: 100px;
    gap: 20px;
    text-align: center;
    h1 {
        font-size: clamp(20px, 6vw, 50px);
        font-family: anton;
        font-weight: 400;
        opacity: 0.1;
    }

    em {
        font-size: clamp(13px, 5vw, 20px);
    }
`;
