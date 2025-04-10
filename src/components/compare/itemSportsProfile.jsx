import { useAtom } from 'jotai';
import styled from 'styled-components';

function ItemSportsProfile({ item }) {
    const sportsTag = ['러닝', '사이클링', '수영', '다이빙', '등산', '멀티스포츠', '골프', '피트니스'];

    console.log(item);
    return (
        <SportsBox className="flex-h-center">
            {sportsTag.map((tag, index) => (
                <SportsTag key={index} className="flex-center">
                    {tag}
                </SportsTag>
            ))}
        </SportsBox>
    );
}

export default ItemSportsProfile;

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
    color: rgba(0, 0, 0, 0.3);

    font-size: 14px;
`;
