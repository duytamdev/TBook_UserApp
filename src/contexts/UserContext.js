import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext} from 'react';
import {checkUsernameIsUsed, login, register} from '../services/UserService';
import CONSTANTS from '../constants';
const UserContext = createContext();
const UserProvider = ({children}) => {
  const onLogin = async (username, password) => {
    try {
      const res = await login(username, password);
      if (res.status === true) {
        const token = res.token;
        await AsyncStorage.setItem(CONSTANTS.ID_USER, JSON.stringify(res._id)); //get data current user
        await AsyncStorage.setItem(CONSTANTS.TOKEN_KEY, token);
        await AsyncStorage.setItem(CONSTANTS.IS_LOGIN, JSON.stringify(true));
        return true;
      }
    } catch (e) {
      console.log('onLogin error', e);
    }
    await AsyncStorage.removeItem('token');
    return false;
  };
  const onCheckUsernameIsUsed = async username => {
    try {
      const res = await checkUsernameIsUsed(username);
      if (res.status === true) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };
  const onRegister = async (email, password) => {
    try {
      const res = await register(email, password, password);
      if (res.status === true) {
        return true;
      }
    } catch (e) {
      console.log('onRgister error', e);
    }
    return false;
  };
  return (
    <UserContext.Provider value={{onLogin, onRegister}}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContext, UserProvider};
