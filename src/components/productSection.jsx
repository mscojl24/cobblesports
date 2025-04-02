import styled from 'styled-components';
import Classification from './products/classification';
import ProductList from './products/productList';
import ProductClassification from './products/productClassification';

function ProductSection() {
    return (
        <ProductBox>
            <CartegoryBox className="flex-h-center">
                <h2>웨어러블 디바이스</h2>
            </CartegoryBox>
            <div className="flex-v-center product-box">
                <Classification />
                <ProductList />
            </div>
            <ProductClassification />
        </ProductBox>
    );
}

export default ProductSection;

const ProductBox = styled.section`
    width: 100%;

    .product-box {
    }
`;

const CartegoryBox = styled.article`
    width: 100%;
    height: 200px;
    background: url(${process.env.REACT_APP_PUBLIC_URL}/asset/cobble-categoty-image-01.png);
    background-position: center;
    background-size: cover;

    h2 {
        font-size: clamp(20px, 6vw, 40px);
        font-weight: 500;
        margin: 0px 10%;
    }
`;
