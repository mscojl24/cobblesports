import { useState } from 'react';
import { TbHelpSquareRoundedFilled } from 'react-icons/tb';
import styled from 'styled-components';

function ItemFunction({ item }) {
    const [selectedScript, setSelectedScript] = useState(null);

    const functionList = [
        { name: '고도기압계', value: 'altimeter' },
        { name: '나침반', value: 'compass' },
        { name: '태양광 충전', value: 'solar' },
        { name: '내장 백터맵', value: 'map' },
        { name: '플래시라이트', value: 'flashlight' },
        { name: '수면 모니터링', value: 'sleep' },
        { name: '단축키설정', value: 'hotKey' },
        {
            name: 'Connect IQ',
            value: 'iqstore',
            script: 'Garmin Connect IQ는 가민(Garmin) 워치 및 기기에서 사용할 수 있는 앱, 위젯, 워치페이스, 데이터필드 등을 설치할 수 있는 플랫폼입니다. (가민 전용 앱스토어)',
        },
        {
            name: '음성 통화',
            value: 'call',
            script: '기기 자체에서 음성 통화를 사용하려면 스피커와 마이크가 내장된 모델이어야 합니다. 다만, 음성통화 기능을 지원하지 않는 모델이라도 버튼 또는 터치 조작을 통해 스마트폰의 통화 제어는 가능합니다.',
        },
        { name: '음악 저장/재생', value: 'music' },
        {
            name: '심전도 측정 (ECG)',
            value: 'ecg',
            script: '가민의 ECG (심전도) 기능은 심장의 전기 신호를 측정하여 심박 리듬 이상 여부를 확인할 수 있는 건강 모니터링 기능입니다. 현재 이 기능은 일부 지원 모델에서만 사용할 수 있으며, 미국 등 일부 국가에서만 제한적으로 제공됩니다. (국내 미지원)',
        },
        {
            name: '그린컨투어',
            value: 'greenContuer',
            script: '그린 컨투어(Green Contour) 기능은 골프장에서 퍼팅 그린의 기울기와 지형 윤곽을 시각적으로 표시해주는 고급 골프 기능입니다. 그린 컨투어 데이터는 지원되는 골프장과 호환 기기에서만 제공되며, 일부 지도 데이터는 별도 유료로 제공될 수 있습니다.',
        },
        {
            name: '러닝 다이나믹스',
            value: 'runningDynamics',
            script: '러닝 다이나믹스는 러닝 자세와 효율성을 분석해주는 가민의 고급 기능으로, 케이던스·보폭·지면 접촉 시간 등 6가지 데이터를 통해 러닝폼을 정밀하게 측정하고 개선할 수 있도록 도와줍니다. (일부 기기의 경우 센서 연동 필요)',
        },
        {
            name: 'PacePro',
            value: 'pacePro',
            script: 'PacePro는 달리기 코스의 고도 변화에 따라 자동으로 속도를 조절해주는 가민의 스마트 페이스 전략 기능입니다.오르막에서는 속도를 줄이고, 내리막에서는 속도를 높이며 목표 페이스를 일정하게 유지할 수 있도록 도와줍니다.',
        },
        {
            name: 'MGRS',
            value: 'mgrs',
            script: 'MGRS (Military Grid Reference System) 는 군용 좌표계로, 지구상의 위치를 식별하기 위한 격자 기반 좌표 시스템입니다. 미국 국방부와 NATO 등에서 광범위하게 사용되며, 위도·경도보다 더 빠르고 정밀한 위치 식별이 가능한 것이 특징입니다.',
        },
    ];

    return (
        <>
            <FunctionBox className="flex-h-center column">
                {functionList.map((tag, index) => {
                    const isActive = item?.option?.[tag.value];
                    return (
                        <Function key={index}>
                            <div className="flex-center gap">
                                {tag.name}
                                {tag.script && (
                                    <TbHelpSquareRoundedFilled
                                        className="popup-icon"
                                        onClick={() => setSelectedScript(tag.script)}
                                    />
                                )}
                            </div>

                            {typeof isActive === 'string' ? (
                                <Subscription>구독 필요</Subscription>
                            ) : isActive === true ? (
                                <Active>지원 가능</Active>
                            ) : (
                                <Inactive>미지원</Inactive>
                            )}
                        </Function>
                    );
                })}
            </FunctionBox>

            {selectedScript && (
                <ScriptPopup onClick={() => setSelectedScript(null)}>
                    <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
                        <p>{selectedScript}</p>
                        <button onClick={() => setSelectedScript(null)}>닫기</button>
                    </div>
                </ScriptPopup>
            )}
        </>
    );
}

export default ItemFunction;

const FunctionBox = styled.ul`
    width: calc(100% / 3);
    min-width: 200px;
    margin-bottom: 200px;
`;

const Function = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .gap {
        gap: 5px;
        font-family: '42dot Sans';
    }

    .popup-icon {
        color: #cccdce;
        font-size: 16px;
        cursor: pointer;
    }

    .popup-icon:hover {
        color: #1985f1;
    }
`;

const Active = styled.div`
    font-size: 12px;
    border-radius: 5px;
    padding: 5px;

    border: 1px solid #1472ff;
    color: #1472ff;
    background: #f3f8ff;
`;

const Inactive = styled(Active)`
    font-size: 12px;
    border-radius: 5px;
    padding: 5px;

    border: 1px solid #bbbbbb;
    color: #c2c2c2;
    background: #f8f8f8;
`;

const Subscription = styled(Active)`
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
    background: #fff5f5;
`;

const ScriptPopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;

    .popup-inner {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        font-size: 14px;
        line-height: 1.6;

        button {
            margin-top: 20px;
            padding: 10px 20px;
            background: #1472ff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
`;
