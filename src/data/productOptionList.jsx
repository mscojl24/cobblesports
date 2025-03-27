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
        title: '운동종목',
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
