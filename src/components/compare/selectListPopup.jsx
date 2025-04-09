import styled from 'styled-components';
import { useAtom } from 'jotai';
import { compareState, productsState, popupTextState } from '../../atoms/useIndexState';
import { useState } from 'react';

function SelectListPopup({ onClose }) {
    const [products] = useAtom(productsState);
    const [compareList, setCompareList] = useAtom(compareState);
    const [, setPopupText] = useAtom(popupTextState);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');

    const handleSelect = (productNum) => {
        if (compareList.includes(String(productNum))) {
            setPopupText('이미 선택된 상품입니다.');
            return;
        }

        if (compareList.length >= 4) {
            setPopupText('비교는 최대 4개까지 가능합니다.');
            return;
        }

        setCompareList([...compareList, String(productNum)]);
        setPopupText('비교 리스트에 추가되었습니다.');
        onClose();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setConfirmedSearchTerm(searchTerm);
    };

    const selectableProducts = products.filter((p) => {
        const isAlreadySelected = compareList.includes(String(p.productNum));
        const titleMatch = p.title?.toLowerCase().includes(confirmedSearchTerm.toLowerCase());
        const subtitleMatch = p.subtitle?.toLowerCase().includes(confirmedSearchTerm.toLowerCase());
        return !isAlreadySelected && (titleMatch || subtitleMatch);
    });

    return (
        <PopupOverlay onClick={onClose}>
            <PopupBox onClick={(e) => e.stopPropagation()}>
                <h3>비교 제품 선택</h3>
                <SearchBox className="flex-center" onSubmit={handleSearch}>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="제품명을 검색해보세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input className="submit-input" type="submit" value="검색" />
                </SearchBox>
                <ul className="popup-list">
                    {selectableProducts.map((item) => (
                        <li key={item.productNum} onClick={() => handleSelect(item.productNum)}>
                            <img
                                src={`${process.env.REACT_APP_PUBLIC_URL}/asset/${item.spec.image[0]}`}
                                alt={item.title}
                                className="item-image"
                            />
                            <div className="info flex-v-center column">
                                <strong>{item.title}</strong>
                                <em className="sub-title">{item.subtitle}</em>
                            </div>
                        </li>
                    ))}
                    {selectableProducts.length === 0 && (
                        <NoResult>검색 결과가 없습니다. 제품명을 정확히 확인해주세요.</NoResult>
                    )}
                </ul>
            </PopupBox>
        </PopupOverlay>
    );
}

export default SelectListPopup;

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    background: rgba(119, 119, 119, 0.4);
    backdrop-filter: blur(30px);
    transition: all ease-in-out 0.3s;

    display: flex;
    justify-content: center;
    align-items: center;

    animation: openModal 0.3s ease-in-out forwards;

    @keyframes openModal {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const PopupBox = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 80vh;
    height: 80vh;
    overflow-y: auto;

    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin-top: 20px;
        gap: 10px;

        li {
            display: flex;
            align-items: center;
            width: calc(100% / 2 - 5px);
            gap: 6px;
            padding: 5px 20px;

            cursor: pointer;

            border-radius: 10px;
            border: 1px solid #f5f5f5;
            font-family: '42dot Sans';

            &:hover {
                background-color: #f5f5f5;
            }

            .item-image {
                width: 100px;
            }
            strong {
                font-family: '42dot Sans';
            }

            em {
                color: rgba(0, 0, 0, 0.3);
                font-size: 12px;
                font-family: '42dot Sans';
            }

            .info {
                gap: 5px;
            }
        }

        @media (max-width: 860px) {
            li {
                width: 100%;
            }
        }
    }

    h3 {
        font-weight: 500;
    }
`;

const SearchBox = styled.form`
    margin-top: 10px;
    gap: 10px;

    input {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        font-family: '42dot Sans';
        transition: all 0.2s;

        &:focus {
            outline: none;
            border-color: #0873ff;
            box-shadow: 0 0 0 3px rgba(8, 115, 255, 0.1);
        }
    }

    .submit-input {
        cursor: pointer;
        width: 20%;
        background-color: #3564ff;
        border: none;
        color: #fff;
    }

    .submit-input:hover {
        background-color: #6a99ff;
    }
`;

const NoResult = styled.div`
    width: 100%;
    text-align: center;
    padding: 30px 0;
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
`;
