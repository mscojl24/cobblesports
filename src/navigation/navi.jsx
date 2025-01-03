import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Navi() {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <NavigateSection scrollY={scrollY}>
                <LogoBox className="flex-center">COBBLE SPORTS</LogoBox>
                <MenuList className="flex-center">
                    <li>회사소개</li>
                    <li>판매제품</li>
                    <li>코블NEWS</li>
                    <li>공식스토어</li>
                </MenuList>
                <LoginBtn className="flex-center" scrollY={scrollY}>
                    <button className="flex-center">로그인</button>
                </LoginBtn>
            </NavigateSection>
        </>
    );
}

const NavigateSection = styled.nav`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;

    position: fixed;
    font-size: var(--font-size-Nomal);
    padding: 0px 50px;
    z-index: 99;

    /** ------- 스크롤 이동 시 변경 */

    transition: all 0.3s ease-in-out;

    height: ${(props) => (props.scrollY > 500 ? '80px' : '100px')};
    font-size: ${(props) => (props.scrollY > 500 ? '18px' : 'var(--font-size-Nomal)')};
    color: ${(props) => (props.scrollY > 500 ? '#585858' : 'var(--color-main-001)')};
    font-weight: ${(props) => (props.scrollY > 500 ? '400' : '300')};
    border-bottom: ${(props) => (props.scrollY > 500 ? '1px solid #eeeeee' : '1px solid rgb(0,0,0,0)')};
    background-color: ${(props) => (props.scrollY > 500 ? 'rgb(255,255,255,1)' : 'rgb(0,0,0,0)')};
`;

const LogoBox = styled.div`
    width: 200px;
`;

const MenuList = styled.ul`
    li {
        padding: 25px;
        text-align: center;
    }
`;

const LoginBtn = styled.div`
    width: 200px;
    button {
        border: none;
        /* padding: 10px 45px; */
        border-radius: 100px;
        font-size: var(--font-size-Nomal);

        /** ------- 스크롤 이동 시 변경 */
        transition: all 0.3s ease-in-out;
        padding: ${(props) => (props.scrollY > 500 ? '10px 30px' : '10px 45px')};
        font-size: ${(props) => (props.scrollY > 500 ? '18px' : 'var(--font-size-Nomal)')};
        background-color: ${(props) => (props.scrollY > 500 ? '#333' : '#fff')};
        color: ${(props) => (props.scrollY > 500 ? 'var(--color-main-001)' : '#333')};
    }
`;

export default Navi;
