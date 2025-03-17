export const formatPrice = (price) => {
    if (!price || isNaN(price)) return '가격 정보 없음'; // 가격이 없거나 숫자가 아닐 경우 처리
    return new Intl.NumberFormat('ko-KR').format(price); // 한국 스타일 (1,000,000)
};
