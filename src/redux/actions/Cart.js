export const addProductInCart = product => {
  return {
    type: 'ADD_PRODUCT_IN_CART',
    payload: product,
  };
};
export const removeProductFromCart = productId => {
  return {
    type: 'REMOVE_PRODUCT_FROM_CART',
    payload: productId,
  };
};
export const addQuantityProduct = (productId, quantity) => {
  return {
    type: 'ADD_QUANTITY_PRODUCT',
    payload: {productId, quantity},
  };
};
export const minusQuantityProduct = productId => {
  return {
    type: 'MINUS_QUANTITY_PRODUCT',
    payload: productId,
  };
};
export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
