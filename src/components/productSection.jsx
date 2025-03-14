import styled from 'styled-components';
import Classification from './products/classification';
import ProductList from './products/productList';

function ProductSection() {
    return (
        <ProductBox className="flex-center">
            <Classification />
            <ProductList />
        </ProductBox>
    );
}

export default ProductSection;

const ProductBox = styled.section`
    width: 100%;
    height: calc(100vh - 70px);
    overflow: scroll;
`;
