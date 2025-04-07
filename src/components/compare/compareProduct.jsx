import { useAtom } from 'jotai';
import styled from 'styled-components';
import { compareState, productsState } from '../../atoms/useIndexState';
import { CgRemove } from 'react-icons/cg';

function CompareProduct() {
    const [compareList] = useAtom(compareState);
    const [product] = useAtom(productsState);
    const [, setCompareList] = useAtom(compareState);

    const handleRemove = (productNum) => {
        setCompareList((prev) => prev.filter((num) => num !== String(productNum)));
    };

    const compareProducts = product.filter((item) => compareList.includes(String(item.productNum)));

    // 최대 4개 고정 배열 생성
    const paddedList = Array(4)
        .fill(null)
        .map((_, idx) => compareProducts[idx] ?? null);

    console.log(compareProducts);

    return (
        <CompareList className="flex-h-center">
            {paddedList.map((item, index) => (
                <CompareItemCard key={index} className="flex-center column">
                    {item ? (
                        <MainInfo>
                            <ItemImage>
                                <img
                                    src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${item.spec.image[0]}`}
                                    alt={item.title}
                                />
                            </ItemImage>
                            <CgRemove onClick={() => handleRemove(item.productNum)} />
                            <MainInfo>{item.title}</MainInfo>
                            <DetailedInfo>{item.spec.size}</DetailedInfo>
                        </MainInfo>
                    ) : (
                        <ItemImage>비교할 제품을 넣어주세요</ItemImage>
                    )}
                </CompareItemCard>
            ))}
        </CompareList>
    );
}

export default CompareProduct;

const CompareList = styled.ul`
    width: 100%;
    overflow-x: scroll;
`;

const CompareItemCard = styled.li`
    width: calc(100% / 4);
    min-width: 220px;
    padding: 20px;
    height: 100%;
    background: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
        border-right: none;
    }
`;

const MainInfo = styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
`;

const DetailedInfo = styled.div`
    font-size: 14px;
`;

const ItemImage = styled.div`
    color: #f8f8f8;

    text-align: center;

    img {
        width: 100%;
    }
`;
