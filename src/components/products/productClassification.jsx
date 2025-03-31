import styled from 'styled-components';
import { IoOptionsOutline } from 'react-icons/io5';
import { RiResetRightFill } from 'react-icons/ri';

import { useAtom } from 'jotai';
import { classState } from '../../atoms/useIndexState';

function ProductClassification() {
    const [activeClassList] = useAtom(classState);
    return (
        <ClassBox className="flex-h-center">
            <FilterLength className="flex-h-center">
                <IoOptionsOutline />{' '}
                <span>
                    필터 적용중 <em>({activeClassList.length})</em>
                </span>
            </FilterLength>
            <FilterClass className="flex-h-center">
                {activeClassList.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
                <li className="reset-class flex-center">
                    <RiResetRightFill />
                </li>
            </FilterClass>
        </ClassBox>
    );
}

export default ProductClassification;

const ClassBox = styled.nav`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const FilterLength = styled.div`
    width: 10%;
    min-width: 230px;
    height: 100%;
    padding: 0px 40px;
    font-size: 30px;
    gap: 10px;

    span {
        font-size: 16px;
        font-weight: bold;

        em {
            font-family: '42dot Sans';
            color: #3b68fa;
        }
    }
`;

const FilterClass = styled.ul`
    width: 100%;
    height: 100%;
    gap: 10px;
    overflow-x: scroll;

    li {
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        font-family: '42dot Sans';
        padding: 8px 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #5f667e;
        border-radius: 50px;
        white-space: nowrap;
    }

    .reset-class {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        font-family: '42dot Sans';
        padding: 5px 15px;
        background-color: #353434;
        border: none;
        color: #f7f7f7;
        border-radius: 50px;
    }
`;
