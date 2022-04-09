const initialState = {
  cart: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_IN_CART': {
      const newCart = [...state.cart];
      newCart.push(action.payload);
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'REMOVE_PRODUCT_FROM_CART': {
      let newCart = [];
      newCart = state.cart.filter(cart => cart._id !== action.payload);
      console.log(newCart);
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'ADD_QUANTITY_PRODUCT': {
      const newCart = [...state.cart];
      const indexProduct = state.cart.findIndex(
        cart => cart._id === action.payload.productId,
      );
      newCart[indexProduct].quantity =
        newCart[indexProduct].quantity + action.payload.quantity;
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'MINUS_QUANTITY_PRODUCT': {
      const newCart = [...state.cart];
      const indexProduct = state.cart.findIndex(
        cart => cart._id === action.payload,
      );
      if (newCart[indexProduct].quantity > 1) {
        newCart[indexProduct].quantity -= 1;
      }
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'CLEAR_CART': {
      const newCart = [];
      return {
        ...state,
        cart: newCart,
      };
    }
    default: {
      return {...state};
    }
  }
};
export {cartReducer};
