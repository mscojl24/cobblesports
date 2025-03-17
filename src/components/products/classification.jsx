import styled from 'styled-components';

function Classification() {
    return <ClassificationBox className="flex-v-center"></ClassificationBox>;
}

export default Classification;

const ClassificationBox = styled.aside`
    width: 460px;
    height: 100%;
    background-color: #fff;

    @media (max-width: 1500px) {
        width: 100%;
        height: 150px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
`;
