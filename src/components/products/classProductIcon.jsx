import { useAtom } from 'jotai';
import styled, { keyframes } from 'styled-components';
import { compareState, loderPageState } from '../../atoms/useIndexState';
import { FcTimeline } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function ClassProductsIcon() {
    const [compareList] = useAtom(compareState);
    const [, setLoderPage] = useAtom(loderPageState);
    const navigate = useNavigate(); // ✅ 선언

    const handleClick = () => {
        setLoderPage(true); // 로딩 페이지 활성화
        setTimeout(() => {
            navigate('/compare');
        }, 1000); // 약간의 delay 후 이동 (자연스럽게 보이도록)
    };

    return (
        <>
            <MoveIcon onClick={handleClick}>
                <strong className="flex-center">
                    <FcTimeline /> 제품 비교하기
                </strong>
                <div className="number flex-center">{compareList.length}</div>
            </MoveIcon>
        </>
    );
}

export default ClassProductsIcon;

const slideInFromRight = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

const MoveIcon = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;

    bottom: 80px;
    right: 20px;

    background-color: #fff;
    padding: 10px 20px 10px 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    font-weight: bold;

    z-index: 99;
    gap: 10px;
    border-radius: 50px;

    /* ✅ 애니메이션 적용 */
    animation: ${slideInFromRight} 0.5s ease-out forwards;

    strong {
        gap: 10px;
    }

    .number {
        background-color: #0873ff;
        color: #fff;
        width: 35px;
        height: 35px;
        font-family: '42dot Sans';
        border-radius: 100%;
    }
`;
