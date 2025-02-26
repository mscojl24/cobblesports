import styled from 'styled-components';

import { useAtom } from 'jotai';
import { scrollYState } from '../atoms/useIndexState';

function Navi() {
    const [scrollY] = useAtom(scrollYState);

    return (
        <>
            <NavigateSection scrolly={scrollY}>
                <LogoBox className="flex-center" scrolly={scrollY}>
                    <img
                        src={
                            scrollY > 800
                                ? `${process.env.PUBLIC_URL}/asset/cobblesports-logo-black.png`
                                : `${process.env.PUBLIC_URL}/asset/cobblesports-logo-white.png`
                        }
                        height="50px"
                    />
                </LogoBox>
                <MenuList className="flex-center" scrolly={scrollY}>
                    <li>Company</li>
                    <li>Prodouct</li>
                    <li>News</li>
                    <li>Smart Store</li>
                </MenuList>
                <LoginBtn className="flex-center" scrolly={scrollY}>
                    <button className="flex-center">오프라인 매장</button>
                </LoginBtn>
            </NavigateSection>
        </>
    );
}

const NavigateSection = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 0px;
    font-size: var(--font-size-Nomal);
    padding: 0px 200px;
    z-index: 99;

    /** ------- 스크롤 이동 시 변경 */

    transition: all 0.3s ease-in-out;

    position: ${(props) => (props.scrolly > 800 ? 'fixed' : 'absolute')};

    height: ${(props) => (props.scrolly > 800 ? '80px' : '150px')};
    font-size: ${(props) => (props.scrolly > 800 ? '16px' : 'var(--font-size-Nomal)')};
    color: ${(props) => (props.scrolly > 800 ? '#222' : '#fff')};
    font-weight: '400';
    border-bottom: ${(props) => (props.scrolly > 800 ? '1px solid #eeeeee' : '1px solid rgb(0,0,0,0)')};
    background-color: ${(props) => (props.scrolly > 800 ? 'rgb(255,255,255,1)' : 'rgb(0,0,0,0)')};
`;

const LogoBox = styled.div``;

const MenuList = styled.ul`
    li {
        padding: 30px;
        text-align: center;
        text-shadow: ${(props) => (props.scrolly > 800 ? 'none' : ' 0px 0px 3px #000;')};
    }
`;

const LoginBtn = styled.div`
    width: 200px;

    button {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 7px;

        /** ------- 스크롤 이동 시 변경 */
        background-color: rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease-in-out;
        padding: ${(props) => (props.scrolly > 800 ? '10px 30px' : '10px 30px')};
        font-size: ${(props) => (props.scrolly > 800 ? '16px' : 'var(--font-size-Nomal)')};
        color: ${(props) => (props.scrolly > 800 ? '#222222' : '#fff')};
    }

    button:hover {
        background-color: var(--color-main-004);
        color: #f0f0f0;
    }
`;

export default Navi;
