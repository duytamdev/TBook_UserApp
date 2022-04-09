import axiosInstance from '../config/axios';

export const addCartToDatabase = async cart => {
  return axiosInstance.post('api/cart/add', cart);
};
