import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {UserContext} from '../../contexts/UserContext';
const loginYupSchema = Yup.object().shape({
  username: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Required!'),
  password: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .min(6, 'Minimum 6 characters')
    .required('Required!'),
});
import {useNavigation} from '@react-navigation/native';
import MyInput from '../common/MyInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyColor from '../../assets/colors';
import ProgressDialog from 'react-native-progress-dialog';
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {onLogin} = useContext(UserContext);
  const navigation = useNavigation();
  const handleLogin = async values => {
    setIsLoading(true);
    const result = await onLogin(values.username, values.password);
    checkLogin(result);
    setIsLoading(false);
  };
  const checkLogin = result => {
    if (result === false) {
      ToastAndroid.show('Đăng nhập không thành công!', 2000);
    } else {
      navigation.replace('BottomTab');
      ToastAndroid.show('Đăng nhập thành công', 2000);
    }
  };
  useEffect(() => {
    return () => {
      setIsLoading(null);
    };
  }, []);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => handleLogin(values)}
      validationSchema={loginYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.sectionMain}>
          <ProgressDialog loaderColor={MyColor.primary} visible={isLoading} />
          <View style={{marginBottom: 16}}>
            <MyInput
              styleContainer={{
                borderColor: values.username.length < 1 ? 'red' : '#ccc',
              }}
              value={values.username}
              onChangeText={handleChange('username')}
              icon={
                <FontAwesome5 name={'user-alt'} size={16} color={'#919191'} />
              }
              placeholder={'Username'}
              onBlur={handleBlur('username')}
            />
            {errors.username && (
              <Text style={{color: MyColor.error, fontSize: 12}}>
                {errors.username}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 16}}>
            <MyInput
              styleContainer={{
                borderColor: values.password.length < 6 ? 'red' : '#ccc',
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              icon={<FontAwesome5 name={'lock'} size={16} color={'#919191'} />}
              isPassword={true}
              placeholder={'Password'}
            />
            {errors.password && (
              <Text style={{color: MyColor.error, fontSize: 12}}>
                {errors.password}
              </Text>
            )}
          </View>

          <View style={{marginLeft: 'auto'}}>
            <Text style={{color: '#000', fontSize: 15}}>Forgot password?</Text>
          </View>
          <TouchableOpacity
            disabled={!isValid}
            onPress={handleSubmit}
            style={[styles.button]}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text
              style={{marginHorizontal: 4, fontWeight: 'bold', color: '#000'}}>
              {' '}
              Or{' '}
            </Text>
            <View style={styles.line} />
          </View>
          <View
            style={{
              marginTop: 33,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 100,
            }}>
            <Image source={require('../../assets/images/logoGg.png')} />
            <Image source={require('../../assets/images/logoFb.png')} />
            <Image source={require('../../assets/images/logoApple.png')} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 18,
            }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: MyColor.primary, fontWeight: 'bold'}}>
                {' '}
                Register now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  line: {
    height: 0.5,
    flex: 1,
    backgroundColor: '#585858',
  },
  orContainer: {
    alignItems: 'center',
    marginTop: 34,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: MyColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 5,
    marginTop: 25,
  },
  sectionMain: {
    marginTop: 70,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default LoginForm;
