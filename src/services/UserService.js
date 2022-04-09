import axiosInstance from '../config/axios';

export const login = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  console.log(data);
  return await axiosInstance.post('/api/auth/login', data);
};
export const register = async (username, password, confirm_password) => {
  const data = {
    username: username,
    password: password,
    confirm_password: confirm_password,
  };
  return await axiosInstance.post('/api/auth/register', data);
};
export const checkUsernameIsUsed = async username => {
  return await axiosInstance.post('/auth/usernameIsUsed', {username});
};
