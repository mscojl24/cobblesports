import { useAtom } from 'jotai';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoBatteryChargingOutline } from 'react-icons/io5';
import { MdOutlineMoreTime } from 'react-icons/md';
import { PiPlugChargingFill } from 'react-icons/pi';
import { RxLightningBolt } from 'react-icons/rx';
import styled from 'styled-components';

function ItemBattery({ item }) {
    return (
        <DetailedBox className="flex-h-center column">
            <Spec>
                <h3 className="spec-title">스마트워치 모드</h3>
                <h6 className="spec-script">
                    {item ? (
                        <p className="flex-center">
                            <MdOutlineMoreTime />
                            최대{' '}
                            <em>
                                {item.battery.smartwatch}일{item.option.solar && ' +@'}
                            </em>{' '}
                            지속가능
                        </p>
                    ) : (
                        <p>-</p>
                    )}
                </h6>
            </Spec>
            <Spec>
                <h3 className="spec-title">
                    GPS 모드 <small>(야외운동)</small>
                </h3>
                <h6 className="spec-script">
                    {item ? (
                        <p className="flex-center">
                            <RxLightningBolt />
                            최대{' '}
                            <em>
                                {item.battery.gpsOnly}시간{item.option.solar && ' +@'}
                            </em>{' '}
                            지속가능
                        </p>
                    ) : (
                        <p>-</p>
                    )}
                </h6>
            </Spec>
        </DetailedBox>
    );
}

export default ItemBattery;

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

        small {
            font-size: clamp(12px, 2vw, 14px);
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
        }
    }

    .spec-script {
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: max-content;
        padding: 5px 10px;
        border-radius: 3px;
        background-color: #f8f8f8;

        line-height: 1.5;
        font-size: clamp(14px, 2vw, 14px);

        em {
            color: rgb(0, 0, 0);
            font-weight: bold;
            font-size: 16px;
        }

        p {
            gap: 5px;
        }

        * {
            font-family: '42dot Sans';
        }
    }
`;
