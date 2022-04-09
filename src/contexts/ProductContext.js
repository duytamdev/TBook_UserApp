import React from 'react';
import {createContext} from 'react';
import {addCartToDatabase} from '../services/ProductService';

const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const onAddCart = async cart => {
    const res = await addCartToDatabase(cart);
    return !!res;
  };
  return (
    <ProductContext.Provider value={{onAddCart}}>
      {children}
    </ProductContext.Provider>
  );
};
export {ProductContext, ProductProvider};
