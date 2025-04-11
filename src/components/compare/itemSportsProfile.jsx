import styled from 'styled-components';

function ItemSportsProfile({ item }) {
    const sportsTag = [
        { name: '러닝', value: 'running' },
        { name: '사이클링', value: 'cycling' },
        { name: '수영', value: 'swim' },
        { name: '풀수영 (Only)', value: 'indoorSwim' },
        { name: '다이빙', value: 'diving' },
        { name: '등산', value: 'hiking' },
        { name: '멀티스포츠', value: 'multisport' },
        { name: '골프', value: 'golf' },
        { name: '피트니스', value: 'fitness' },
    ];

    const profiles = item?.activityProfiles || {};

    const filteredTags = sportsTag.filter((tag) => {
        if (!item) return true; // item이 없을 때는 전체 출력
        if (tag.value === 'swim' && profiles.indoorSwim === true) return false;
        if (tag.value === 'indoorSwim' && profiles.swim === true) return false;
        return true;
    });

    return (
        <SportsBox className="flex-h-center">
            {filteredTags.map((tag, index) => (
                <SportsTag key={index} className="flex-center" $active={item && profiles[tag.value] === true}>
                    {tag.name}
                </SportsTag>
            ))}
        </SportsBox>
    );
}

export default ItemSportsProfile;

// ✅ 스타일
const SportsBox = styled.section`
    padding: 20px;
    width: calc(100% / 3);
    min-width: 200px;
    flex-wrap: wrap;
    gap: 10px;
`;

const SportsTag = styled.div`
    padding: 6px 10px;
    border-radius: 15px;
    background-color: #f8f8f8;
    min-width: calc(100% / 4 - 5px);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);

    /* 활성화 상태일 경우 */
    ${({ $active }) =>
        $active &&
        `
        border: 1px solid #1472ff;
        color: #1472ff;
        background : #f3f8ff;
    `}
`;
