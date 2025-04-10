import { useAtom } from 'jotai';
import styled from 'styled-components';

function ItemDetailedInfo({ item }) {
    console.log(item);
    return (
        <DetailedBox className="flex-h-center">
            <Spec>
                <h3 className="spec-title">디스플레이</h3>
                <h6 className="spec-script">
                    <p>
                        {item && item.spec.display.touch && '터치형'} {item ? item.spec.display.color : '-'}{' '}
                        {item && `${item.spec.display.type} 디스플레이`}
                    </p>
                    <p>{item ? item.spec.display.size : '-'}</p>
                </h6>
            </Spec>
        </DetailedBox>
    );
}

export default ItemDetailedInfo;

const DetailedBox = styled.section`
    padding: 20px;
    width: calc(100% / 3);
    min-width: 200px;
`;

const Spec = styled.div`
    .spec-title {
        padding: 20px 0px;
        font-size: clamp(16px, 5vw, 20px);
        font-weight: 600;
        font-family: '42dot Sans';
    }

    .spec-script {
        line-height: 1.5;
        font-size: clamp(14px, 2vw, 16px);

        * {
            font-family: '42dot Sans';
        }
    }
`;
