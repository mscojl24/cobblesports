import styled from 'styled-components';

import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';

function Navi() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <>
            <NavigateSection scrolly={scrollY}>
                <LogoBox className="flex-center">COBBLE SPORTS</LogoBox>
                <MenuList className="flex-center">
                    <li>회사소개</li>
                    <li>판매제품</li>
                    <li>코블NEWS</li>
                    <li>공식스토어</li>
                </MenuList>
                <LoginBtn className="flex-center" scrolly={scrollY}>
                    <button className="flex-center">로그인</button>
                </LoginBtn>
            </NavigateSection>
        </>
    );
}

const NavigateSection = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    font-size: var(--font-size-Nomal);
    padding: 0px 200px;
    z-index: 99;

    /** ------- 스크롤 이동 시 변경 */

    transition: all 0.3s ease-in-out;

    height: ${(props) => (props.scrolly > 100 ? '80px' : '150px')};
    font-size: ${(props) => (props.scrolly > 100 ? '16px' : 'var(--font-size-Nomal)')};
    color: '#585858';
    font-weight: '400';
    border-bottom: ${(props) => (props.scrolly > 100 ? '1px solid #eeeeee' : '1px solid rgb(0,0,0,0)')};
    background-color: ${(props) => (props.scrolly > 100 ? 'rgb(255,255,255,1)' : 'rgb(0,0,0,0)')};
`;

const LogoBox = styled.div`
    width: 200px;
    font-family: 'Raleway';
    font-weight: 800;
    font-size: 22px;
    color: #3b3b3b;
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
        border-radius: 100px;

        /** ------- 스크롤 이동 시 변경 */
        transition: all 0.3s ease-in-out;
        padding: ${(props) => (props.scrolly > 100 ? '10px 30px' : '10px 30px')};
        font-size: ${(props) => (props.scrolly > 100 ? '16px' : 'var(--font-size-Nomal)')};
        background-color: '#252525';
        color: 'var(--color-main-001)';
    }

    button:hover {
        background-color: '#252525';
        color: 'var(--color-main-001)';
    }
`;

export default Navi;
