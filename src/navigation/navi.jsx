import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import CobbleLogo from '../cobbleLogo';
import { FaLocationDot } from 'react-icons/fa6';

function Navi() {
    const [scrollY] = useAtom(scrollYState);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollingUp(window.scrollY < lastScrollY);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // 스크롤 값이 200 이하일 때는 원래 디자인 유지
    const scrollingUp = scrollY > 0 && isScrollingUp;

    const menulist = [
        { name: 'About', subname: '메인으로' },
        { name: 'Product', subname: '제품안내' },
        { name: 'Compare', subname: '스펙비교' },
        { name: 'News', subname: '코블뉴스' },
        { name: 'Contact', subname: '문의하기' },
    ];

    return (
        <NavigateSection $scrollingUp={scrollingUp} $scrollY={scrollY}>
            <LogoBox className="flex-h-center">
                <CobbleLogo />
            </LogoBox>
            <MenuList className="flex-h-center">
                {menulist.map((menu, index) => (
                    <li key={index} className="flex-h-center column">
                        <p className="default flex-center">{menu.name}</p>
                        <p className="hovered flex-center">{menu.subname}</p>
                    </li>
                ))}
            </MenuList>
            <LoginBtn className="flex-center">
                <button className="flex-center btn-offline">공식 스토어</button>
                <button className="flex-center btn-offline btn-online">
                    <FaLocationDot size={18} />
                </button>
            </LoginBtn>
        </NavigateSection>
    );
}

const NavigateSection = styled.nav`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    height: 70px;
    padding: 0px 100px;

    /* 애니메이션 효과 추가 */
    opacity: ${(props) => (props.$scrollingUp || props.$scrollY === 0 ? '1' : '0')};
    transform: ${(props) => (props.$scrollingUp || props.$scrollY === 0 ? 'translateY(0)' : 'translateY(-20px)')};
    position: ${(props) => (props.$scrollingUp ? 'fixed' : 'absolute')};
    transition: all 0.3s ease-in-out;
    z-index: 99;

    color: #222;
    background-color: rgb(255, 255, 255, 1);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #eeeeee;
`;

const LogoBox = styled.div`
    width: 300px;
`;

const MenuList = styled.ul`
    width: 100%;
    li {
        width: 100px;
        font-weight: 600;
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        overflow: hidden;
        height: 35px;
        text-transform: uppercase;
        font-size: 14px;
    }

    .default,
    .hovered {
        width: 100%;
        height: 100%;
        padding: 10px;
        text-align: center;
        transform: translateY(0);
        transition: transform 0.2s ease-in-out;
    }
    .hovered {
        font-size: 16px;
    }

    li:hover .default,
    li:hover .hovered {
        transform: translateY(-100%);
        color: rgba(0, 0, 0, 0.5);
    }
`;

const LoginBtn = styled.div`
    width: 100%;
    justify-content: end;

    .btn-offline {
        font-weight: 500;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 7px;
        background-color: #1a1a1a;
        transition: all 0.2s ease-in-out;
        font-size: 13px;
        color: #fff;
        padding: 10px;
        max-width: 110px;
        margin: 0px 5px;
        width: 20%;
        cursor: pointer;
    }

    .btn-offline:hover {
        background-color: #3467ff;
    }

    .btn-online {
        width: 40px;
        background-color: #ffffff;
        color: #b4b4b4;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }

    .btn-online:hover {
        background-color: #3467ff;
        color: #fff;
    }
`;

export default Navi;
