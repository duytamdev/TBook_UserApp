import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import MyColor from '../assets/colors';

const OrderSuccessScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.anim}
        source={require('../assets/animations/correct_ani.json')}
        autoPlay
        loop={false}
      />
      <Text style={styles.text}>Your Order has been{'\n'} accepted</Text>
      <Text style={styles.sub}>
        Your items has been placed and is on{'\n'}
        it’s way to being processed
      </Text>
      <TouchableOpacity onPress={navigation.goBack} style={styles.btnBack}>
        <Text style={styles.textButton}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  textButton: {
    color: MyColor.primary,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  btnBack: {
    marginTop: 20,
  },
  container: {
    paddingHorizontal: 25,
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#181725',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    textAlign: 'center',
  },
  sub: {
    marginTop: 20,
    textAlign: 'center',
  },
  anim: {
    width: 120,
    height: 120,
  },
});
export default OrderSuccessScreen;
