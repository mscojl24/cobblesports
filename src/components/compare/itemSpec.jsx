import { TbHelpSquareRoundedFilled } from 'react-icons/tb';
import styled from 'styled-components';

function ItemSpec({ item }) {
    console.log(item);
    return (
        <DetailedBox className="flex-h-center column">
            <Spec>
                <h3 className="spec-title flex-h-center">
                    디스플레이
                    <TbHelpSquareRoundedFilled className="popup-icon" />
                </h3>
                <h6 className="spec-script">
                    <p>
                        {item && item.spec.display.touch && '터치형'} {item ? item.spec.display.color : '-'}{' '}
                        {item && `${item.spec.display.type} 디스플레이`}
                    </p>
                    <p>{item ? `${item.spec.display.size} 화면 크기` : '-'}</p>
                    <p>{item ? `제품 무게 ${item.spec.weight}` : '-'}</p>
                </h6>
            </Spec>
            <Spec>
                <h3 className="spec-title">호환가능 밴드</h3>
                <h6 className="spec-script">
                    <p>{item ? `${item.spec.band} 밴드 호환` : '-'}</p>
                </h6>
            </Spec>
            <Spec>
                <h3 className="spec-title flex-h-center">
                    방수 등급 지원 <TbHelpSquareRoundedFilled className="popup-icon" />
                </h3>
                <h6 className="spec-script">
                    <p>
                        {item && item.waterProof.waterRating}{' '}
                        {item && item.waterProof.divingRating && `(다이빙 ${item.waterProof.divingRating})`}
                    </p>
                </h6>
            </Spec>
        </DetailedBox>
    );
}

export default ItemSpec;

const DetailedBox = styled.section`
    padding: 20px;
    width: calc(100% / 3);
    min-width: 200px;
    gap: 30px;
`;

const Spec = styled.div`
    width: 100%;

    .spec-title {
        padding: 20px 0px;
        font-size: clamp(16px, 5vw, 20px);
        font-weight: 600;
        font-family: '42dot Sans';

        gap: 5px;

        .popup-icon {
            color: #cccdce;
            font-size: 20px;
            cursor: pointer;
        }

        .popup-icon:hover {
            color: #1985f1;
        }
    }

    .spec-script {
        line-height: 1.5;
        font-size: clamp(14px, 2vw, 15px);

        * {
            font-family: '42dot Sans';
        }
    }
`;
