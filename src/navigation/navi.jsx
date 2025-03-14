import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { loderPageState, scrollYState } from '../atoms/useIndexState';
import CobbleLogo from '../cobbleLogo';
import { FaLocationDot } from 'react-icons/fa6';
import MobileNavi from './mobileNavi';
import { useNavigate } from 'react-router-dom';

function Navi() {
    const [scrollY] = useAtom(scrollYState);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [, setLoderPage] = useAtom(loderPageState);
    const navigate = useNavigate(); // ✅ React Router 네비게이션 사용

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollingUp(window.scrollY < scrollY || window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollY]);

    const menulist = [
        { name: 'About', subname: '메인으로', value: '/', type: 'internal' },
        { name: 'Product', subname: '제품안내', value: '/products', type: 'internal' },
        { name: 'Compare', subname: '스펙비교', value: '/compare', type: 'internal' },
        { name: 'Contact', subname: '문의하기', value: 'https://pf.kakao.com/_fcPxaG', type: 'external' },
    ];

    const handleMenuClick = (e) => {
        const type = e.currentTarget.dataset.type;
        const value = e.currentTarget.dataset.value;

        const actions = {
            internal: () => {
                setTimeout(() => navigate(value), 1000);

                setLoderPage(true);
            },
            external: () => window.open(value, '_blank', 'noopener,noreferrer'),
        };

        actions[type]?.(); // ✅ 타입이 존재하면 해당 함수 실행
        setIsScrollingUp(true); // ✅ 네비게이션 숨김 방지
    };

    return (
        <>
            <MobileNavi />
            <NavigateSection $isVisible={isScrollingUp}>
                <div className="flex-v-center">
                    <LogoBox className="flex-h-center">
                        <CobbleLogo />
                    </LogoBox>
                    <MenuList>
                        {menulist.map((menu, index) => (
                            <li
                                key={index}
                                data-type={menu.type}
                                data-value={menu.value}
                                onClick={handleMenuClick} // ✅ 클릭 이벤트 하나로 처리
                            >
                                <p className="default flex-center">{menu.name}</p>
                                <p className="hovered flex-center">{menu.subname}</p>
                            </li>
                        ))}
                    </MenuList>
                </div>
                <LoginBtn>
                    <button
                        className="btn-offline"
                        onClick={() => {
                            window.open(`https://smartstore.naver.com/cobblesports`, '_blank', 'noopener,noreferrer');
                        }}>
                        공식 스토어
                    </button>
                    <button
                        className="btn-online flex-center"
                        onClick={() => {
                            window.open(`https://naver.me/GQ15Qrdf`, '_blank', 'noopener,noreferrer');
                        }}>
                        <FaLocationDot size={18} />
                    </button>
                </LoginBtn>
            </NavigateSection>
        </>
    );
}

export default Navi;

const NavigateSection = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0 100px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};

    @media (max-width: 1500px) {
        display: none;
    }
`;

const LogoBox = styled.div`
    width: 150px;
`;

const MenuList = styled.ul`
    display: flex;

    li {
        position: relative;
        font-weight: 700;
        cursor: pointer;
        height: 35px;
        width: 100px;

        font-size: 15px;
        overflow: hidden;
        transition: color 0.2s ease-in-out;
    }

    li:nth-child(1) {
        color: #d8431d;
    }

    .default,
    .hovered {
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.2s ease-in-out;
    }

    .hovered {
        position: absolute;
        top: 100%;
        left: 0;
        font-size: 16px;
        font-weight: 400;
    }

    li:hover .default {
        transform: translateY(-100%);
    }
    li:hover .hovered {
        transform: translateY(-100%);
    }

    @media (max-width: 768px) {
        gap: 10px;
        font-size: 12px;
    }

    .link-btn {
        position: relative;
        font-weight: 600;
        cursor: pointer;
        height: 35px;
        width: 100px;
        text-transform: uppercase;
        font-size: 14px;
        overflow: hidden;
        transition: color 0.2s ease-in-out;
    }
`;

const LoginBtn = styled.div`
    display: flex;
    gap: 10px;

    .btn-offline,
    .btn-online {
        font-weight: 500;
        border-radius: 7px;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .btn-offline {
        padding: 10px 30px;
        background-color: #1a1a1a;
        color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .btn-offline:hover {
        background-color: #ececec;
        border-color: #ececec;
        color: #4d4d4d;
    }

    .btn-online {
        width: 40px;
        background-color: white;
        color: #b4b4b4;
        border: 1px solid #ececec;
    }
    .btn-online:hover {
        background-color: #ececec;
        border-color: #ececec;
        color: #4d4d4d;
    }
`;
