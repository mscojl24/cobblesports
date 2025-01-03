import { BiSearchAlt } from 'react-icons/bi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { LuPackagePlus } from 'react-icons/lu';

export const swiperMainData = [
    {
        index: 1,
        title: 'Garmin Brand shop',
        subtitle: '공식 제품을 빠르고 쉽게 만나보세요.',
        image: '../asset/Fenix8-main-banner.jpg',
        linkBtn: {
            text: '스토어 이동하기',
            icon: <BsGrid3X3GapFill size="24px" />,
        },
    },
    {
        index: 2,
        title: 'Your own Garmin',
        subtitle: '내가 원하는 제품을 찾아보세요.',
        image: '../asset/Edge-main-banner.jpg',
        linkBtn: {
            text: '제품 찾아보기',
            icon: <BiSearchAlt size="24px" />,
        },
    },
    {
        index: 3,
        title: 'NEW PRODUCT 2025',
        subtitle: 'Descent X50i 프리미엄 다이브 컴퓨터',
        image: '../asset/X50i-main-banner.jpg',
        linkBtn: {
            text: '신제품 확인하기',
            icon: <LuPackagePlus size="24px" />,
        },
    },
];
