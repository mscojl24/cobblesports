import styled from 'styled-components';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import { PiShoppingCart, PiHouse, PiX } from 'react-icons/pi';
import { MdArrowForwardIos } from 'react-icons/md';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function MobileNavi() {
    const [scrollY] = useAtom(scrollYState);
    const [menuToggle, setMenuToggle] = useState(false);
    const navigate = useNavigate(); // ✅ React Router 네비게이션 사용

    const letters = ['C', 'O', 'B', 'B', 'L', 'E'];

    const menulist = [
        { name: 'Home', subname: '메인으로', value: '/', type: 'internal' },
        { name: 'Product', subname: '제품안내', value: '/products', type: 'internal' },
        { name: 'Compare', subname: '스펙비교', value: '/compare', type: 'internal' },
        { name: 'Contact', subname: '문의하기', value: 'https://pf.kakao.com/_fcPxaG', type: 'external' },
    ];

    const handleMenuToggle = () => {
        setMenuToggle(!menuToggle);
    };

    const handleMenuClick = (e) => {
        const type = e.currentTarget.dataset.type;
        const value = e.currentTarget.dataset.value;

        const actions = {
            internal: () => navigate(value), // ✅ 내부 이동
            external: () => window.open(value, '_blank', 'noopener,noreferrer'), // ✅ 외부 링크 이동
        };

        actions[type]?.();
        setMenuToggle(false); // 메뉴 닫기
    };

    return (
        <MobileNavBox>
            <MobileNavMenu>
                <LogoBox className="logo-box-size flex-v-center">
                    {letters.map((char, index) => (
                        <LogoText key={index} start={1 + index * 0.1}>
                            <span className="text-animation">{char}</span>
                        </LogoText>
                    ))}
                </LogoBox>
                <IconBox className="flex-center">
                    <PiShoppingCart
                        onClick={() => {
                            window.open(`https://smartstore.naver.com/cobblesports`, '_blank', 'noopener,noreferrer');
                        }}
                    />
                    <PiHouse
                        onClick={() => {
                            window.open(`https://naver.me/GQ15Qrdf`, '_blank', 'noopener,noreferrer');
                        }}
                    />
                    {menuToggle ? <PiX onClick={handleMenuToggle} /> : <HiOutlineMenuAlt2 onClick={handleMenuToggle} />}
                </IconBox>
            </MobileNavMenu>
            <MoblieNavList $menuToggle={menuToggle}>
                {menulist.map((list, index) => (
                    <li key={index + 1} data-type={list.type} data-value={list.value} onClick={handleMenuClick}>
                        <div>
                            <span className="title">{list.subname}</span>
                            <span className="sub-title">{list.name}</span>
                        </div>
                        <MdArrowForwardIos />
                    </li>
                ))}

                <div className="copyright">
                    <p className="copyright-title">© 2025 Cobblesports. All Rights Reserved. </p>
                    <p className="copyright-script">
                        본 사이트의 모든 콘텐츠(텍스트, 이미지, 영상 등)는 코블스포츠의 자산이며, 무단 복제, 배포,
                        사용을 금합니다. 허가 없이 본 콘텐츠를 사용할 경우, 법적 조치를 취할 수 있습니다.
                    </p>
                </div>
            </MoblieNavList>
        </MobileNavBox>
    );
}

export default MobileNavi;

const MobileNavBox = styled.nav`
    // ====== 전체섹션 ======= //
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;

    z-index: 99;
    display: none;

    @media (max-width: 1500px) {
        display: block;
    }
`;

const MobileNavMenu = styled.div`
    // ====== 오픈 전 메뉴 ======= //
    width: 100%;
    height: 50px;
    padding: 0px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoBox = styled.div`
    overflow: hidden;
`;

const IconBox = styled.aside`
    font-size: 22px;
    color: rgba(0, 0, 0, 0.7);
    gap: 20px;

    & > * {
        cursor: pointer;
        transition: all ease-in-out 0.3s;
    }
    & > *:hover {
        color: rgba(0, 0, 0, 0.1);
    }
`;

const MoblieNavList = styled.ul`
    // ====== 오픈 후 메뉴 ======= //
    width: 100%;
    min-height: calc(100vh - 50px);
    overflow: hidden;
    transition: all ease-in-out 0.3s;
    animation: shownav 0.3s ease-in-out forwards;
    display: ${(props) => (props.$menuToggle ? 'block' : 'none')};
    padding: 20px 0px;
    background-color: #fff;

    @keyframes shownav {
        0% {
            height: 0%;
            opacity: 0;
        }
        100% {
            height: 100%;
            opacity: 1;
        }
    }

    li {
        display: flex;
        justify-content: space-between;

        width: 100%;
        padding: 20px 30px;
        font-size: 17px;
        cursor: pointer;
        color: #292929;
        font-weight: 600;
    }

    li .title {
        margin-right: 10px;
        text-transform: uppercase;
    }

    li .sub-title {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
    }

    .copyright {
        padding: 40px 30px;
    }

    .copyright-title {
        font-family: '42dot Sans';
    }

    .copyright-script {
        font-size: 12px;
        padding: 10px 0px;
        color: rgba(0, 0, 0, 0.3);
        line-height: 150%;
    }
`;

const LogoText = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #222;

    span {
        font-family: 'Anton', serif;
        animation: moveloder 5s ease-in-out infinite both;
        animation-delay: ${(props) => props.start}s;
    }

    @keyframes moveloder {
        0% {
            transform: translate3d(0, -50px, 0);
            opacity: 1;
        }
        10% {
            transform: translate3d(0, 0px, 0);
            opacity: 1;
        }
        90% {
            transform: translate3d(0, 0px, 0);
            opacity: 1;
        }
        100% {
            transform: translate3d(0, 50px, 0);
            opacity: 1;
        }
    }
`;
