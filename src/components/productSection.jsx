import styled from 'styled-components';
import Classification from './products/classification';
import ProductList from './products/productList';

function ProductSection() {
    console.log(process.env.REACT_APP_PUBLIC_URL + `/asset/cobble-categoty-image-01.png`);
    return (
        <ProductBox>
            <CartegoryBox></CartegoryBox>
            <div className="flex-center">
                <Classification />
                <ProductList />
            </div>
        </ProductBox>
    );
}

export default ProductSection;

const CartegoryBox = styled.article`
    width: 100%;
    height: 300px;
    background: url(${process.env.REACT_APP_PUBLIC_URL}/asset/cobble-categoty-image-01.png);
    background-position: center;
    background-size: cover;
`;

const ProductBox = styled.section`
    width: 100%;
    height: calc(100vh - 70px);
    overflow: hidden;

    @media (max-width: 1500px) {
        flex-direction: column;
    }
`;
