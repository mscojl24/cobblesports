import { useAtom } from 'jotai';
import { compareState } from '../atoms/useIndexState';
import styled from 'styled-components';

function CompareSection() {
    const [compareList] = useAtom(compareState);

    return (
        <CompareBox>
            <CompareTitle className="flex-center column">
                <h1>제품 비교하기</h1>
                <em>다양한 제품을 비교해보고 구매하세요.</em>
            </CompareTitle>
        </CompareBox>
    );
}

export default CompareSection;

const CompareBox = styled.section`
    width: 100%;
    padding: 100px;
`;

const CompareTitle = styled.div`
    gap: 20px;
    h1 {
        font-size: clamp(20px, 6vw, 40px);
    }

    em {
        font-size: clamp(13px, 5vw, 20px);
    }
`;
