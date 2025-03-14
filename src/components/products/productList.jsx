import styled from 'styled-components';

function ProductList() {
    return <ProductListBox className="flex-v-center"></ProductListBox>;
}

export default ProductList;

const ProductListBox = styled.article`
    width: 100%;
    height: 100vh;
    background: #f2f3f6;
`;
