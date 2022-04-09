import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import MyColor from '../../assets/colors';
import MyInput from '../common/MyInput';
import {UserContext} from '../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressDialog from 'react-native-progress-dialog';
import {checkUsernameIsUsed} from '../../services/UserService';
import axios from 'axios';

const registerYupSchema = Yup.object().shape({
  username: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Required!')
    .test('unique username', 'username already in use', function (value) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://t-book.herokuapp.com/api/auth/usernameIsUsed/${value}`)
          .then(res => {
            resolve(res.data.status);
          })
          .catch(error => {
            if (
              error.response.data.content ===
              'The email has already been taken.'
            ) {
              resolve(false);
            }
          });
      });
    }),
  password: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .min(6, 'Minimum 6 characters')
    .required('Required!'),
  confirmPassword: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .min(6, 'Minimum 6 characters')
    .required('Required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {onRegister} = useContext(UserContext);
  const navigation = useNavigation();
  const handleRegister = async values => {
    setIsLoading(true);
    const res = await onRegister(values.username, values.password);
    checkRegister(res);
    setIsLoading(false);
  };
  const checkRegister = result => {
    if (result) {
      ToastAndroid.show('Register successful', 2000);
      navigation.goBack();
    } else {
      ToastAndroid.show('Register failed', 2000);
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
        confirmPassword: '',
      }}
      onSubmit={values => handleRegister(values)}
      validationOnMount={true}
      validateOnChange={false} // disable on every keystroke
      validationSchema={registerYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.sectionForm}>
          <ProgressDialog loaderColor={MyColor.primary} visible={isLoading} />
          <View>
            <MyInput
              styleContainer={{
                borderColor: values.username.length < 1 ? 'red' : '#ccc',
              }}
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              icon={
                <FontAwesome5 name={'user-alt'} size={16} color={'#919191'} />
              }
              placeholder="Username"
            />
            {errors.username && (
              <Text style={styles.textError}>{errors.username}</Text>
            )}
          </View>
          <View>
            <MyInput
              value={values.password}
              onChangeText={handleChange('password')}
              icon={<FontAwesome5 name={'lock'} size={16} color={'#919191'} />}
              styleContainer={[
                styles.input,
                {
                  borderColor: values.password.length < 6 ? 'red' : '#ccc',
                },
              ]}
              isPassword={true}
              placeholder="Password"
              onBlur={handleBlur('password')}
            />
            {errors.password && (
              <Text style={styles.textError}>{errors.password}</Text>
            )}
          </View>
          <View>
            <MyInput
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              icon={<FontAwesome5 name={'lock'} size={16} color={'#919191'} />}
              styleContainer={[
                styles.input,
                {
                  borderColor:
                    values.confirmPassword.length < 6 ||
                    values.confirmPassword !== values.password
                      ? 'red'
                      : '#ccc',
                },
              ]}
              onBlur={handleBlur('confirmPassword')}
              isPassword={true}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <Text style={styles.textError}>{errors.confirmPassword}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>Already have an account ? </Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: MyColor.primary,
              }}>
              Login
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  textError: {
    color: MyColor.error,
    fontSize: 12,
  },
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
    backgroundColor: '#fff',
  },
});
export default RegisterForm;
