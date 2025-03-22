import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: loadState<CartState>(CART_PERSISTENT_STATE)?.items ?? []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			state.items.forEach((i) => {
				if (i.id === action.payload) {
					i.count++;
				}
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (existed && existed.count > 1) {
				state.items.forEach((i) => {
					if (i.id === action.payload) {
						i.count--;
					}
				});
			} else {
				state.items = state.items.filter(
					(i) => i.id !== action.payload
				);
			}
		},
		delete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		cleanCart: (state) => {
			state.items = [];
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
