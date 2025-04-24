import { useAtom } from 'jotai';
import styled from 'styled-components';
import { formatPrice } from '../../hooks/useFormatPrice';
import { VscGitCompare } from 'react-icons/vsc';
import { FaCirclePlus } from 'react-icons/fa6';
import { BtnBox } from '../products/productsList';

function ItemMainInfo({ item }) {
    const handleBuyClick = (productNum) => {
        const url = `https://smartstore.naver.com/cobblesports/products/${productNum}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <MainBox>
                <div className="title-box">
                    <h1>{item.title}</h1>
                    <em>{item.subtitle}</em>
                </div>
                <PriceBox>
                    <small className="price-text">제품 최종가</small>
                    <h2 className="pro-price">
                        {item.spec.discount && (
                            <em className="discount-text">
                                {Math.round(((item.spec.price - item.spec.discount) / item.spec.price) * 100)}%
                            </em>
                        )}{' '}
                        {formatPrice(item.spec.discount ?? item.spec.price)}원{' '}
                        {item.spec.discount && <del> {formatPrice(item.spec.price)}</del>}{' '}
                    </h2>
                    <ButtonBox className="flex-center column">
                        <button onClick={() => handleBuyClick(item.productNum)}>
                            <strong className="btn-text">제품 구매하기 </strong>{' '}
                            <FaCirclePlus fontSize="22px" className="btn-icon" />
                        </button>
                    </ButtonBox>
                </PriceBox>
            </MainBox>
            <MessageBox>
                <div className="flex-h-center purpose-box">
                    {item.purpose.map((tag, index) => (
                        <span key={index} className="purpose-tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <h6 className="message-text">{item.message}</h6>
            </MessageBox>
        </>
    );
}

export default ItemMainInfo;

// 제품 이름 및 서브 타이틀 섹션 -----------------------------------------------------
const MainBox = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    padding: 30px 20px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    height: 260px;

    position: sticky;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .title-box {
        display: flex;
        flex-direction: column;
        top: 0px;

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
`;

// 제품 가격 설정 섹션 ===================================================
const PriceBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    gap: 10px;

    .price-text {
        font-size: 14px;
        font-family: '42dot Sans';
        font-weight: 400;
    }

    .pro-price {
        display: flex;
        align-items: flex-end;
        gap: 5px;

        font-weight: 400;
        font-family: '42dot Sans';
        font-size: clamp(14px, 2vw, 18px);

        del {
            font-family: '42dot Sans';
            font-size: 12px;
            opacity: 0.3;
        }

        .discount-text {
            font-size: clamp(14px, 2vw, 18px);
            font-family: '42dot Sans';
            color: #215cff;
        }
    }
`;

// 제품 설명 섹션 ========================================================
const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding: 30px 20px;

    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */

    .purpose-box {
        width: 100%;
        gap: 5px;
        flex-wrap: wrap;
    }

    .purpose-tag {
        padding: 8px 15px;
        border-radius: 50px;
        background-color: #f3f3f3;
        font-size: 12px;
        font-weight: 500;
    }

    .message-text {
        font-family: '42dot Sans';
        font-size: 13px;
        opacity: 0.5;
        line-height: 1.5;
        white-space: pre-wrap;
    }
`;

// 구매하기 버튼 ==========================================================
const ButtonBox = styled(BtnBox)`
    button {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
    margin: 0px;
`;
