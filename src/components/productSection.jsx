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
            <ProductClassification />
            <div className="flex-v-center">
                <Classification />
                <ProductList />
            </div>
        </ProductBox>
    );
}

export default ProductSection;

const ProductBox = styled.section`
    width: 100%;
`;

const CartegoryBox = styled.article`
    width: 100%;
    height: 300px;
    background: url(${process.env.REACT_APP_PUBLIC_URL}/asset/cobble-categoty-image-01.png);
    background-position: center;
    background-size: cover;

    h2 {
        font-size: clamp(20px, 6vw, 40px);
        font-weight: 500;
        margin: 0px 10%;
    }
`;
