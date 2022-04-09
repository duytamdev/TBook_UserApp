import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import Cart from '../components/home/Cart';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import MyColor from '../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuantityProduct,
  clearCart,
  minusQuantityProduct,
  removeProductFromCart,
} from '../redux/actions/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../constants';
import {ProductContext} from '../contexts/ProductContext';
const Header = () => {
  return (
    <View style={{margin: 8}}>
      <Text style={{color: '#000', fontWeight: '600', fontSize: 25}}>Cart</Text>
    </View>
  );
};
const CartScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  const {onAddCart} = useContext(ProductContext);
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  const handleRemove = id => {
    Alert.alert(
      'Chắc chưa bro ?',
      'Bạn thực sự muốn xoá sách này ra khỏi giỏ hàng',
      [
        {
          text: 'Huỷ',
          onPress: null,
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: () => onRemove(id),
        },
      ],
    );
  };
  const handleMinusQuantity = id => {
    dispatch(minusQuantityProduct(id));
  };
  const handleAddQuantity = id => {
    dispatch(addQuantityProduct(id, 1));
  };
  const onRemove = id => {
    console.log(id);
    dispatch(removeProductFromCart(id));
  };
  const handleSaveCartToDatabase = async () => {
    const idUserCurrent = await AsyncStorage.getItem(CONSTANTS.ID_USER);
    const data = {
      id: idUserCurrent.slice(1, idUserCurrent.length - 1), // auto gender /" "/
      products: cart.map(product => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      total: cart.reduce((pre, product) => {
        return pre + product.price * product.quantity;
      }, 0),
    };
    const res = await onAddCart(data);
    if (res) {
      ToastAndroid.show('Order success', 2000);
      // clear cart
      dispatch(clearCart());
      // change to success screen
      navigation.push('OrderSuccess');
    } else {
      ToastAndroid.show('Order failed', 2000);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      {cart.length >= 1 ? (
        <FlatList
          data={cart}
          renderItem={({item}) => {
            return (
              <Cart
                onMinusQuantity={() => handleMinusQuantity(item._id)}
                onAddQuantity={() => handleAddQuantity(item._id)}
                onRemove={() => handleRemove(item._id)}
                key={item._id}
                product={item}
              />
            );
          }}
        />
      ) : (
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <Text style={{color: '#0c0c0c'}}>
            Chưa có sản phẩm nào trong giỏ hàng
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text
              style={{color: MyColor.primary, fontWeight: '600', fontSize: 16}}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.sectionBottom, {bottom: tabBarHeight + 12}]}>
        <TouchableOpacity
          onPress={handleSaveCartToDatabase}
          disabled={!cart.length >= 1}
          style={[
            styles.button,
            {
              backgroundColor:
                cart.length >= 1 ? MyColor.primary : 'rgba(206,86,86,0.84)',
            },
          ]}>
          <Text style={styles.textButton}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  button: {
    backgroundColor: MyColor.primary,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  sectionBottom: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#efefef',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
});
export default CartScreen;
