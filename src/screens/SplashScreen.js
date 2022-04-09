import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MyColor from '../assets/colors';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Image
        resizeMode={'contain'}
        style={styles.image}
        source={require('../assets/images/Study.png')}
      />
      <View style={styles.sectionMain}>
        <Text style={[styles.title, {color: colors.text}]}>
          Read your favourite books
        </Text>
        <Text style={[styles.text, {color: colors.textSub}]}>
          All your favourites book in one place, read any book, staying at home,
          on travelling, or anywhere else
        </Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, {backgroundColor: colors.primary}]}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Let Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: MyColor.primary,
    width: 193,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  sectionMain: {
    paddingHorizontal: 54,
    alignItems: 'center',
    flex: 2,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
    marginTop: 80,
  },
  image: {
    height: HEIGHT / 2 - 8,
  },
  container: {
    paddingTop: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default SplashScreen;
