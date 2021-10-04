const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const GET_TOTALS = 'GET_TOTALS';
const CLEAN_CART = 'CLEAR_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';

const SORT_BY_PRICE_LU = 'SORT_BY_PRICE_LU';
const SORT_BY_PRICE_UL = 'SORT_BY_PRICE_UL';

const reducer = (state, action) => {
	switch (action.type) {
		case CLEAN_CART:
			return { ...state, cart: [] };
		case REMOVE_ITEM:
			return {
				...state,
				cart: state.cart.filter((item, index) => {
					return item.id !== action.payload;
				})
			};
		case INCREASE:
			let tempCartInc = state.cart.map((cartItem) => {
				if (cartItem.id === action.payload) {
					return { ...cartItem, amount: cartItem.amount + 1 };
				}
				return cartItem;
			});
			return {
				...state,
				cart: tempCartInc
			};
		case DECREASE:
			let tempCartDec = state.cart
				.map((cartItem) => {
					if (cartItem.id === action.payload) {
						return { ...cartItem, amount: cartItem.amount - 1 };
					}
					return cartItem;
				})
				.filter((cartItem) => cartItem.amount > 0);
			return {
				...state,
				cart: tempCartDec
			};
		case SORT_BY_PRICE_LU:
			const sortedUL = [...state.cart].sort((a, b) => {
				return b.price - a.price;
			});
			return { ...state, cart: sortedUL };
		case SORT_BY_PRICE_UL:
			const sortedLU = [...state.cart].sort((a, b) => {
				return a.price - b.price;
			});
			return { ...state, cart: sortedLU };
		case GET_TOTALS:
			let { total, amount } = state.cart.reduce(
				(cartTotal, cartItem) => {
					const { amount, price } = cartItem;
					const itemTotal = price * amount;

					cartTotal.amount += amount;
					cartTotal.total += itemTotal;

					return cartTotal;
				},
				{
					total: 0,
					amount: 0
				}
			);
			total = parseFloat(total.toFixed(2));

			return { ...state, total, amount };
		case 'LOADING':
			return { ...state, loading: true };
		case 'DISPLAY_ITEMS':
			return { ...state, cart: action.payload, loading: false };
		default:
			return { ...state };
	}
};
export default reducer;
