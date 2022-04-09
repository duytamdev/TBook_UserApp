import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BookItem = ({style, name, author, image, _id, colors}) => {
  const navigation = useNavigation();
  const goToDetailBook = () => {
    navigation.navigate('DetailProduct', {_id: _id});
  };
  return (
    <TouchableOpacity
      onPress={goToDetailBook}
      style={[styles.container, style]}>
      <Image resizeMode={'cover'} style={styles.image} source={{uri: image}} />
      <View style={{marginLeft: 10}}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 250,
    borderRadius: 8,
  },
  author: {
    color: '#9D9D9D',
  },
  title: {
    maxWidth: '90%',
    color: '#19191B',
    fontWeight: '600',
    fontSize: 16,
  },
  container: {},
});
export default BookItem;
