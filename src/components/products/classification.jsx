import styled from 'styled-components';

function Classification() {
    return <ClassificationBox className="flex-v-center"></ClassificationBox>;
}

export default Classification;

const ClassificationBox = styled.aside`
    position: absolute;
    top: 0px;
    left: 0px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    width: 460px;
    height: 100%;
    background-color: #fff;
`;
