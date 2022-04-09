import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MyColor from '../../assets/colors';

const Cart = ({product, onRemove, onMinusQuantity, onAddQuantity}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 70, height: 100, margin: 8, marginRight: 18}}
        source={{uri: product.image}}
      />
      <View style={{height: 100, paddingTop: 10}}>
        <Text style={{color: '#000', fontWeight: '600', fontSize: 18}}>
          {product.name}
        </Text>
        <View style={{marginTop: 'auto'}}>
          <Text>Số lượng:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 4,
            }}>
            <TouchableOpacity
              onPress={onMinusQuantity}
              style={{
                width: 30,
                height: 30,
                borderColor: '#bd0000',
                borderWidth: 2,
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 20, color: 'black'}}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{product.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={onAddQuantity}
              style={{
                width: 30,
                height: 30,
                borderColor: '#bd0000',
                borderWidth: 2,
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 20, color: 'black'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginLeft: 'auto', marginTop: 'auto', padding: 16}}>
        <Text
          style={{color: MyColor.primary, fontSize: 18, fontWeight: 'bold'}}>
          {product.price} d
        </Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.buttonRemove}>
        <Text style={{color: '#fff'}}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonRemove: {
    backgroundColor: '#ff3d3d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 4,
  },
});
export default Cart;
