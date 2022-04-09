import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyColor from '../assets/colors';
import RegisterForm from '../components/register/RegisterForm';
const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        name={'arrow-back-ios'}
        size={24}
        color={'#000'}
      />
      <Text
        style={{fontSize: 37, fontWeight: '700', color: '#000', marginTop: 20}}>
        Lets Register {'\n'}Account
      </Text>
      <Text style={{fontSize: 27, color: '#000'}}>
        Hello user, you have {'\n'}a greatful journey
      </Text>
      <RegisterForm />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: MyColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 30,
  },
  input: {
    marginTop: 16,
  },
  sectionForm: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
});
export default RegisterScreen;
