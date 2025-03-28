export const SortingList = [
    {
        title: '정렬순서',
        name: 'Sorting',
        tag: [
            { name: '최신순', value: '최신순' },
            { name: '가격 낮은순', value: '낮은순' },
            { name: '가격 높은순', value: '높은순' },
        ],
    },
];

export const OptionList = [
    {
        title: '디스플레이 크기',
        name: 'size',
        tag: [
            { name: 'S (40mm~44mm)', value: 'S' },
            { name: 'M (45mm~47mm)', value: 'M' },
            { name: 'L (48mm~51mm)', value: 'L' },
            { name: '그 외 사이즈', value: 'another' },
        ],
    },

    {
        title: '방수등급',
        name: 'waterproof',
        tag: [
            { name: '방수 (5ATM)', value: '5ATM' },
            { name: '방수 (10ATM)', value: '10ATM' },
            { name: '다이빙 (40m)', value: '40M' },
            { name: '다이빙 (100m)', value: '100M' },
            { name: '다이빙 (200m)', value: '200M' },
        ],
    },
    {
        title: '최대 배터리 > 스마트워치 모드',
        name: 'batterySM',
        tag: [
            { name: '1주일~2주일', value: 14 },
            { name: '2주일~3주일', value: 21 },
            { name: '3주일~4주일', value: 28 },
            { name: '한 달 이상', value: 999 },
        ],
    },
    {
        title: '최대 배터리 > 운동(GPS) 모드',
        name: 'batteryGPS',
        tag: [
            { name: '12시간 이내', value: 12 },
            { name: '12시간~24시간', value: 24 },
            { name: '24시간~48시간', value: 48 },
            { name: '48시간 이상', value: 999 },
        ],
    },
    {
        title: '추가 지원 운동',
        name: 'sports',
        tag: [
            { name: '러닝', value: 'running' },
            { name: '수영', value: 'swim' },
            { name: '사이클링', value: 'cycling' },
            { name: '멀티스포츠', value: 'multisport' },
            { name: '다이빙', value: 'diving' },
            { name: '등산', value: 'hiking' },
            { name: '골프', value: 'golf' },
            { name: '피트니스', value: 'fitness' },
        ],
    },
];

export const sportsSortingList = [
    {
        title: '사용분류',
        name: 'sportsSorting',
        tag: [
            { name: '전체 항목', value: '' },
            { name: '러닝', value: '러닝' },
            { name: '아웃도어', value: '아웃도어' },
            { name: '수영/다이빙', value: '수영' },
            { name: '사이클링', value: '사이클링' },
            { name: '멀티스포츠', value: '멀티스포츠' },
            { name: '골프', value: '골프' },
            { name: '피트니스', value: '피트니스' },
        ],
    },
    {
        title: '제품 시리즈',
        name: 'seriesSorting',
        tag: [
            { name: '전체 항목', value: [] },
            { name: '포러너', value: ['포러너'] },
            { name: '피닉스', value: ['피닉스'] },
            { name: '엔듀로/택틱스', value: ['엔듀로', '택틱스'] },
            { name: '인스팅트', value: ['인스팅트'] },
            { name: '어프로치', value: ['어프로치'] },
            { name: '디센트', value: ['디센트'] },
            { name: '베뉴/비보/릴리', value: ['베뉴', '비보', '릴리'] },
        ],
    },
];
