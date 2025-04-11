import styled from 'styled-components';

function ScriptPopup({ content, onClose }) {
    // 강조 마크다운을 <strong>으로 변환
    const formatText = (text) => {
        const withBold = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return withBold.replace(/\n/g, '<br />'); // 줄바꿈도 적용
    };

    return (
        <PopupOverlay onClick={onClose}>
            <PopupInner onClick={(e) => e.stopPropagation()}>
                <PopupContent>
                    {Array.isArray(content) ? (
                        content.map((line, idx) => (
                            <p key={idx} dangerouslySetInnerHTML={{ __html: formatText(line) }} />
                        ))
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: formatText(content) }} />
                    )}
                </PopupContent>
                <button onClick={onClose}>닫기</button>
            </PopupInner>
        </PopupOverlay>
    );
}

export default ScriptPopup;

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    font-size: 14px;
    line-height: 1.5;

    p {
        font-family: '42dot Sans';
        margin-bottom: 20px;
        word-break: keep-all;
    }

    strong {
        font-family: '42dot Sans';
        font-weight: bold;
        color: #111;
    }
`;

const PopupInner = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;

    button {
        margin-top: 20px;
        padding: 10px 20px;
        background: #1472ff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;
