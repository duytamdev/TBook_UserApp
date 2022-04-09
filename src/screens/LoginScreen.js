import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LoginForm from '../components/login/LoginForm';
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 37, fontWeight: '700', color: '#000', marginTop: 20}}>
        Lets Sign you in
      </Text>
      <Text style={{fontSize: 27, color: '#000'}}>
        Welcome Back , {'\n'}
        You have been missed
      </Text>
      <LoginForm />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
});
export default LoginScreen;
