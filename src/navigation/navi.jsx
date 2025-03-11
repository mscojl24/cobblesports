import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import CobbleLogo from '../cobbleLogo';
import { FaLocationDot } from 'react-icons/fa6';
import MobileNavi from './mobileNavi';

function Navi() {
    const [scrollY] = useAtom(scrollYState);
    const [isScrollingUp, setIsScrollingUp] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollingUp((prev) => window.scrollY < scrollY || window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollY]);

    const menulist = [
        { name: 'About', subname: '메인으로' },
        { name: 'Product', subname: '제품안내' },
        { name: 'Compare', subname: '스펙비교' },
        { name: 'News', subname: '코블뉴스' },
        { name: 'Contact', subname: '문의하기' },
    ];

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
                            <li key={index}>
                                <p className="default flex-center">{menu.name}</p>
                                <p className="hovered flex-center">{menu.subname}</p>
                            </li>
                        ))}
                    </MenuList>
                </div>
                <LoginBtn>
                    <button className="btn-offline">공식 스토어</button>
                    <button className="btn-online flex-center">
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
        font-weight: 600;
        cursor: pointer;
        height: 35px;
        width: 100px;
        text-transform: uppercase;
        font-size: 14px;
        overflow: hidden;
        transition: color 0.2s ease-in-out;
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
        color: rgba(0, 0, 0, 0.5);
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
