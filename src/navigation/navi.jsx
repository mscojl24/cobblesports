import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';
import CobbleLogo from '../cobbleLogo';

function Navi() {
    const [scrollY] = useAtom(scrollYState);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                // 스크롤을 위로 올리는 경우
                setIsScrollingUp(true);
            } else {
                // 스크롤을 아래로 내리는 경우
                setIsScrollingUp(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // 스크롤 값이 200 이하일 때는 원래 디자인 유지
    const scrollingUp = scrollY > 0 && isScrollingUp;

    return (
        <NavigateSection scrollingUp={scrollingUp}>
            <LogoBox className="flex-h-center">
                <CobbleLogo />
            </LogoBox>
            <MenuList className="flex-center" scrollingUp={scrollingUp}>
                <li>About</li>
                <li>Product</li>
                <li>News</li>
                <li>Smart Store</li>
                <LoginBtn className="flex-center" scrollingUp={scrollingUp}>
                    <button className="flex-center">오프라인 매장</button>
                </LoginBtn>
            </MenuList>
        </NavigateSection>
    );
}

const NavigateSection = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 0px;
    padding: 0px 100px;
    z-index: 99;
    transition: all 0.3s ease-in-out;

    /* 스크롤 값이 200 이하이면 원래 스타일 유지 */
    position: ${(props) => (props.scrollingUp ? 'fixed' : 'absolute')};
    height: ${(props) => (props.scrollingUp ? '80px' : '150px')};
    font-size: ${(props) => (props.scrollingUp ? '14px' : '16px')};
    color: ${(props) => (props.scrollingUp ? '#222' : '#fff')};
    border-bottom: ${(props) => (props.scrollingUp ? '1px solid #eeeeee' : '1px solid rgba(0,0,0,0)')};
    background-color: ${(props) => (props.scrollingUp ? 'rgb(255,255,255,1)' : 'rgb(0,0,0,0)')};
`;

const LogoBox = styled.div`
    width: 200px;
`;

const MenuList = styled.ul`
    li {
        text-align: center;
        /* text-shadow: ${(props) => (props.scrollingUp ? 'none' : '0px 0px 2px #000;')}; */
        text-transform: uppercase;
        font-weight: ${(props) => (props.scrollingUp ? '700' : '500')};
        border-radius: 100px;
        padding: 10px 10px;
        margin: 0px 10px;
        border: 1px solid rgba(0, 0, 0, 0);
        cursor: pointer;
        transition: all ease-in-out 0.3s;
    }

    li:hover {
        border-radius: 100px;
        padding: 10px 30px;
        border: ${(props) => (props.scrollingUp ? '1px solid rgba(0,0,0,0.5)' : '1px solid #fff')};
    }
`;

const LoginBtn = styled.div`
    width: 200px;

    button {
        font-weight: 500;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 7px;
        background-color: ${(props) => (props.scrollingUp ? '#1a1a1a' : '#ffffff')};
        transition: all 0.3s ease-in-out;
        padding: ${(props) => (props.scrollingUp ? '10px 30px' : '10px 30px')};
        font-size: ${(props) => (props.scrollingUp ? '13px' : '15px')};
        color: ${(props) => (props.scrollingUp ? '#FFF' : '#222222')};
    }

    button:hover {
        background-color: ${(props) => (props.scrollingUp ? '#f3f3f3' : '#1a1a1a')};
        color: ${(props) => (props.scrollingUp ? '#1a1a1a' : '#ffffff')};
    }
`;

export default Navi;
