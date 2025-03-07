import styled from 'styled-components';

function ProductList() {
    return (
        <ProductListSection>
            <ItemGroupBox>
                <ItemGroup>
                    <h1>Top Picks</h1>
                    <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
                </ItemGroup>
                <ItemGroup>
                    <h1>Category Item</h1>
                    <p>운동에 따라 선택하세요</p>
                </ItemGroup>
                <ItemGroup>
                    <h1>Top Picks</h1>
                    <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
                </ItemGroup>
                <ItemGroup>
                    <h1>Top Picks</h1>
                    <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
                </ItemGroup>
                <ItemGroup>
                    <h1>Top Picks</h1>
                    <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
                </ItemGroup>
                <ItemGroup>
                    <h1>Top Picks</h1>
                    <p>구매자들이 선택한 가민의 인기 제품을 만나보세요</p>
                </ItemGroup>
            </ItemGroupBox>
        </ProductListSection>
    );
}

export default ProductList;

const ProductListSection = styled.section`
    display: flex;
    align-items: stretch; /* 자식 요소 높이 맞춤 */
    width: 100%;
    min-height: 100vh;
`;

const ItemGroupBox = styled.ul`
    flex-grow: 1;
    min-width: 1000px;
    height: 100%;
`;

const ItemGroup = styled.li`
    margin: 200px 100px 150px 100px;

    h1 {
        font-family: Anton;
        font-size: 65px;
        color: #242424;
    }

    p {
        margin-top: 20px;
        font-size: 25px;
        font-weight: 400;
    }
`;

const PromotionBox = styled.aside`
    flex-grow: 1;
    width: 80%;
    background: url(${process.env.PUBLIC_URL}/asset/bestseller/promotion-image-01.png);
    background-size: cover;
    /* background-attachment: fixed; */
`;
