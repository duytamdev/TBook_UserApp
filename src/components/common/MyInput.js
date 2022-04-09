import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyColor from '../../assets/colors';
const MyInput = ({styleContainer, icon, isPassword, ...props}) => {
  const [isSecurity, setIsSecurity] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <View
      style={[
        styles.container,
        // {borderColor: isFocused ? MyColor.primary : MyColor.primaryLight},
        styleContainer,
      ]}>
      <View style={styles.inputContainer}>
        {icon && <View style={{marginEnd: 8}}>{icon}</View>}
        <TextInput
          onFocus={handleFocus}
          secureTextEntry={isPassword ? isSecurity : false}
          style={styles.input}
          {...props}
        />
        {isPassword && (
          <MaterialCommunityIcons
            style={{marginHorizontal: 8}}
            onPress={() => setIsSecurity(!isSecurity)}
            name={isSecurity ? 'eye' : 'eye-off'}
            size={24}
            color={'#919191'}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#fff',
    paddingStart: 14,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#8E8383',
  },
});
export default MyInput;
