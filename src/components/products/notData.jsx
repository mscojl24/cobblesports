import styled from 'styled-components';
import { TbReload } from 'react-icons/tb';
import { MdOutlineNotInterested } from 'react-icons/md';
import { useResetClass } from '../../hooks/useResetClass';
import { classState } from '../../atoms/useIndexState';
import { useAtom } from 'jotai';

function NotData() {
    const [, setActiveClassList] = useAtom(classState);

    const resetClass = useResetClass(); // 훅처럼 사용하지만 반환된 함수는 일반 함수

    const handleFilterReload = () => {
        resetClass();
        setActiveClassList([]);
    };

    return (
        <NotDataBox className="flex-center column">
            <MdOutlineNotInterested className="Not-filter-icon" />
            <em className="flex-center Not-filter-text">
                조건에 맞는 제품을 찾을 수 없습니다.
                <br />
                필터를 다시 적용할까요?
            </em>
            <button className="flex-center reload-btn" onClick={handleFilterReload}>
                <TbReload />
                필터 초기화
            </button>
        </NotDataBox>
    );
}

export default NotData;

const NotDataBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%; // ← 중요! 부모가 꽉 차야 중앙정렬 됨
    text-align: center;
    line-height: 1.5;
    gap: 20px;

    .Not-filter-icon {
        font-size: 50px;
        color: rgba(0, 0, 0, 0.1);
    }

    .Not-filter-text {
        font-size: 18px;
    }

    .reload-btn {
        gap: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        border-radius: 50px;
        border: none;
        font-weight: bold;
        cursor: pointer;
    }

    .reload-btn:hover {
        background: rgba(0, 0, 0, 0.5);
    }
`;
