import { useAtom } from 'jotai';
import styled from 'styled-components';
import { formatPrice } from '../../hooks/useFormatPrice';

function ItemMainInfo({ item }) {
    return (
        <MainBox>
            <div className="title-box">
                <h1>{item.title}</h1>
                <em>{item.subtitle}</em>
                <h2 className="pro-price">
                    {item.spec.discount && (
                        <em className="discount-text">
                            {Math.round(((item.spec.price - item.spec.discount) / item.spec.price) * 100)}%
                        </em>
                    )}{' '}
                    {formatPrice(item.spec.discount ?? item.spec.price)}원{' '}
                </h2>
            </div>
        </MainBox>
    );
}

export default ItemMainInfo;

const MainBox = styled.section`
    width: 100%;
    padding: 20px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;

    .title-box {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */

        * {
            font-family: '42dot Sans';
        }

        gap: 8px;

        h1 {
            font-size: clamp(14px, 2vw, 20px);
            font-weight: 500;
        }

        em {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
        }
    }

    .pro-price {
        font-weight: 400;
        margin-top: 20px;
        font-family: '42dot Sans';

        .discount-text {
            font-family: '42dot Sans';
            color: #cc3e3e;
        }
    }
`;
