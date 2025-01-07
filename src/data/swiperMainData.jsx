import { BiSearchAlt } from 'react-icons/bi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { LuPackagePlus } from 'react-icons/lu';
import { FaYoutube } from 'react-icons/fa';

export const swiperMainData = [
    {
        index: 1,
        title: 'Garmin Brand shop',
        subtitle: '공식 제품을 빠르고 쉽게 만나보세요.',
        image: '../asset/Fenix8-main-banner.jpg',
        video: false,
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
        video: false,
        linkBtn: {
            text: '제품 찾아보기',
            icon: <BiSearchAlt size="24px" />,
        },
    },
    {
        index: 3,
        title: 'Cobble Offical YouTube',
        subtitle: '코블스포츠 오피셜 유튜브채널',
        image: '',
        video: true,
        videoURL: '../asset/cobble-youtube-video-01.mp4',
        linkBtn: {
            text: '유튜브 보러가기',
            icon: <FaYoutube size="24px" />,
        },
    },
    {
        index: 4,
        title: 'NEW PRODUCT 2025',
        subtitle: 'Descent X50i 프리미엄 다이브 컴퓨터',
        image: '../asset/X50i-main-banner.jpg',
        video: true,
        videoURL: '../asset/Descent_X50i_kr.mp4',
        linkBtn: {
            text: '신제품 확인하기',
            icon: <LuPackagePlus size="24px" />,
        },
    },
];
