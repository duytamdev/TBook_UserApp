import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BookItem from '../components/home/BookItem';
import {WIDTH} from './SplashScreen';

const BookMarkScreen = () => {
  const favoriteList = useSelector(state => state.bookmark.listBookMark);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Book</Text>
      {favoriteList.length > 0 ? (
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          numColumns={2}
          data={favoriteList}
          renderItem={({item}) => {
            return (
              <BookItem
                key={item._id}
                _id={item._id}
                style={styles.bookItem}
                name={item.name}
                author={item.author}
                image={item.image}
              />
            );
          }}
        />
      ) : (
        <View>
          <Text>You not have favorite book!!</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  bookItem: {
    maxWidth: WIDTH / 2 - 64,
    marginBottom: 16,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});
export default BookMarkScreen;
