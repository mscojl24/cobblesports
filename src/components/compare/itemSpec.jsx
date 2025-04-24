import { useState } from 'react';
import { TbHelpSquareRoundedFilled } from 'react-icons/tb';
import styled from 'styled-components';
import ScriptPopup from './scriptPopup';

function ItemSpec({ item }) {
    const [popupText, setPopupText] = useState(null);

    const displayText = [
        '가민 워치는 **AMOLED**, **MIP**, **LCD** 세 가지 디스플레이를 사용합니다.',
        '**AMOLED** 는 뛰어난 해상도와 생생한 색 표현, 부드러운 터치 조작이 특징으로, 실내 운동이나 일상 속에서도 시각적 만족도가 높습니다.',
        '**MIP** 는 강한 햇빛 아래에서도 높은 시인성을 제공하며 배터리 효율이 우수하지만, 조도에 따라 어둡게 보일 수 있고, 터치 기능은 일부 모델에서만 지원됩니다.',
        '**LCD** 는 가장 단순한 구조로 배터리 소모가 적고, 기본 정보 확인 중심의 사용자에게 적합합니다.',
    ];

    const waterText = [
        '가민 워치는 제품별로 다양한 **방수 등급** (ATM) 을 제공합니다.',
        '**5 ATM**은 일상적인 샤워나 수영에 적합하며, **10 ATM**은 수영, 스노클링 등 수중 스포츠에 대응 가능한 등급입니다.',
        '**다이빙 등급(예: EN13319 인증)**을 받은 일부 모델은 **스킨·스쿠버 다이빙에 특화**되어 있어, 수심과 수압 변화에도 안정적인 사용이 가능합니다.',
        '단, 모든 제품이 동일한 수중 활동에 적합한 것은 아니므로, 활동 목적에 맞는 방수 등급 확인이 필요합니다.',
    ];

    return (
        <>
            <DetailedBox className="flex-h-center column">
                <Spec>
                    <h3 className="spec-title flex-h-center">
                        디스플레이
                        <TbHelpSquareRoundedFilled className="popup-icon" onClick={() => setPopupText(displayText)} />
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
                        방수 등급 지원
                        <TbHelpSquareRoundedFilled className="popup-icon" onClick={() => setPopupText(waterText)} />
                    </h3>
                    <h6 className="spec-script">
                        <p>
                            {item && item.waterProof.waterRating}{' '}
                            {item && item.waterProof.divingRating && `(다이빙 ${item.waterProof.divingRating})`}
                        </p>
                    </h6>
                </Spec>
            </DetailedBox>

            {popupText && <ScriptPopup content={popupText} onClose={() => setPopupText(null)} />}
        </>
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
        font-size: clamp(16px, 4vw, 20px);
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
