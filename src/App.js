import './css/App.css';
import Navi from './navigation/navi';
import MainSection from './main/mainSection';
import LoderPage from './loderPage';

import { useAtom } from 'jotai';
import { scrollYState } from './atoms/useIndexState';

import { useEffect } from 'react';

function App() {
    const [scrollY, setScrollY] = useAtom(scrollYState);

    const handleScroll = () => {
        setScrollY(window.scrollY);
        console.log(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navi />
            <MainSection />
            <LoderPage />
        </>
    );
}

export default App;
