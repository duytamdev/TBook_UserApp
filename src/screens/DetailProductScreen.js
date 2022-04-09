import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT} from './SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import {addFavouriteBook, removeFavouriteBook} from '../redux/actions/BookMark';
import MyColor from '../assets/colors';
import axiosInstance from '../config/axios';
import ProgressDialog from 'react-native-progress-dialog';
import {addProductInCart, addQuantityProduct} from '../redux/actions/Cart';
const colorBookMark = marked => {
  return marked ? MyColor.primary : '#000';
};
const DetailProductScreen = ({navigation, route}) => {
  const {_id} = route.params;
  const favoriteList = useSelector(state => state.bookmark.listBookMark);
  const cart = useSelector(state => state.cart.cart);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //call actions
  const dispatch = useDispatch();
  const checkIfBookIsFavoriteList = () => {
    return favoriteList.some(book => book._id === product._id);
  };
  const checkIfBookInCart = () => {
    return cart.some(p => p._id === product._id);
  };
  useEffect(() => {
    const getProduct = async () => {
      await axiosInstance.get(`api/product/${_id}`).then(response => {
        setProduct(response);
        return response;
      });
    };
    getProduct().then(() => setIsLoading(false));
  }, []);
  const handleBuyBook = () => {
    if (checkIfBookInCart() === true) {
      // + quaity
      dispatch(addQuantityProduct(product._id, 1));
    } else {
      // add to cart
      const data = {
        _id: product._id,
        price: product.price,
        quantity: 1,
        name: product.name,
        image: product.image,
      };
      dispatch(addProductInCart(data));
    }
    ToastAndroid.show('Added to cart', 2000);
  };
  const handleFavoriteBook = () => {
    if (checkIfBookIsFavoriteList() === true) {
      // unlike bookmark
      dispatch(removeFavouriteBook(product._id));
      ToastAndroid.show('remove book of favorites list', 2000);
    } else {
      dispatch(addFavouriteBook(product));
      ToastAndroid.show('saved book to favorites list', 2000);
    }
  };
  useEffect(() => {
    return () => {
      setIsLoading(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ProgressDialog loaderColor={MyColor.primary} visible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name={'arrowleft'}
            size={24}
            color={'#000'}
          />
          <MaterialCommunityIcons
            onPress={handleFavoriteBook}
            name={'bookmark'}
            size={24}
            color={colorBookMark(checkIfBookIsFavoriteList())}
          />
        </View>
        {product && (
          <>
            <View style={styles.sectionImage}>
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={{uri: product.image}}
              />
              <Text style={styles.authorText}>{product.name}</Text>
              <Text>{product.author}</Text>
            </View>
            <View style={styles.sectionMain}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: 18,
                  marginTop: 18,
                }}>
                Overview
              </Text>
              <Text>{product.description}</Text>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.sectionBottom}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              Read Preview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBuyBook}
            style={[styles.button, {backgroundColor: '#000'}]}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              Buy for {product.price} vnd
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: MyColor.primary,
    width: 158,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBottom: {
    position: 'absolute',
    bottom: 10,
    left: 35,
    right: 35,
  },
  sectionMain: {
    marginTop: 35,
  },
  authorText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    paddingHorizontal: 104,
    height: (HEIGHT * 2) / 5,
    borderRadius: 8,
  },
  sectionImage: {
    alignItems: 'center',
  },
  sectionHeader: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: '#fff',
  },
});
export default DetailProductScreen;
