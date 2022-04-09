import {combineReducers} from 'redux';
import {bookMarkReducer} from './BookMark';
import {cartReducer} from './Cart';

const rootReducer = combineReducers({
  bookmark: bookMarkReducer,
  cart: cartReducer,
});
export default rootReducer;
