import { atom } from 'jotai';

export const scrollYState = atom(0);
export const scrollXState = atom(0);

export const productsState = atom([]);
export const sortProductsState = atom([]);

export const loderPageState = atom(true);

export const compareState = atom([]);

export const compareMax = atom(false);
export const popupTextState = atom('');

export const classState = atom([]);

// 여기는 정렬 데이터

export const sportsSorting = atom('');
export const seriesSorting = atom([]);

// 여기서부터 제품 조건 데이터

export const sportsState = atom([]);
export const orderState = atom('최신순');
export const sizeState = atom([]);
export const waterProofState = atom([]);
export const batterySMState = atom([]);
export const batteryGPSState = atom([]);

export const saleState = atom(false);

export const minPriceState = atom(100000);
export const maxPriceState = atom(3000000);
