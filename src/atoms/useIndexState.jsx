import { atom } from 'jotai';

export const scrollYState = atom(0);
export const scrollXState = atom(0);

export const productsState = atom([]);
export const sortProductsState = atom([]);

export const loderPageState = atom(true);

export const sportsState = atom([]);
export const orderState = atom('최신순');
export const sizeState = atom('ALL');

export const minPriceState = atom(100000);
export const maxPriceState = atom(3000000);
