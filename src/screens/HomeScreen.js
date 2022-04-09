import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import BookItem from '../components/home/BookItem';
import {WIDTH} from './SplashScreen';
import {useTheme} from 'react-native-paper';
import axiosInstance from '../config/axios';
import MyColor from '../assets/colors';
import ProgressDialog from 'react-native-progress-dialog';

const HeaderSection = ({colors}) => {
  return (
    <View style={{marginBottom: 8}}>
      <Text style={{fontWeight: '600', fontSize: 24, color: colors.text}}>
        New Arrivals
      </Text>
    </View>
  );
};
const CategoryText = ({focussed, name, colors}) => {
  return (
    <View style={{marginRight: 30, marginTop: 34}}>
      <Text
        numberOfLines={1}
        style={{
          color: focussed === true ? colors.text : colors.textSub,
          fontSize: 16,
          maxWidth: 100,
        }}>
        {name}
      </Text>
      {focussed === true && (
        <View
          style={{borderBottomWidth: 2, borderBottomColor: MyColor.primary}}
        />
      )}
    </View>
  );
};
const HomeScreen = () => {
  const {colors} = useTheme();

  const [dataCategories, setDataCategories] = useState([]);
  const [dataBooks, setDataBooks] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axiosInstance.get('api/categories/get-all').then(response => {
      setDataCategories(response);
      setCategoryFocusing(response[0]._id); // get fist category
    });
  }, []);
  useEffect(() => {
    axiosInstance.get('api/products/get-all').then(response => {
      const books = [...response].reverse();
      setDataBooks(books);
    });
  }, []);

  const [textSearching, setTextSearching] = useState();
  const [categoryFocusing, setCategoryFocusing] = useState('');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axiosInstance.get('api/products/get-all').then(response => {
      setDataBooks(response);
    });
    axiosInstance.get('api/categories/get-all').then(response => {
      setDataCategories(response);
      setCategoryFocusing(response[0]._id); // get fist category
    });
    setRefreshing(false);
  }, []);
  const handleFocusCategory = idCategory => {
    setCategoryFocusing(idCategory);
  };
  const dataBooksOfCategory = useMemo(() => {
    if (dataBooks) {
      return dataBooks.filter(book => book.category._id === categoryFocusing);
    }
    return [];
  }, [categoryFocusing, dataBooks]);
  if (!dataBooks) {
    return <ProgressDialog loaderColor={MyColor.primary} visible={true} />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.welcomeText}>Welcome back, Bunny!</Text>
        <Text style={[styles.welcomeMainText, {color: colors.text}]}>
          What do you want to {'\n'} read today?
        </Text>
        <SearchBar
          containerStyle={{padding: 0, borderRadius: 12, marginTop: 32}}
          inputContainerStyle={{
            backgroundColor: 'rgba(218,218,218,0.81)',
            paddingLeft: 8,
          }}
          onChangeText={text => setTextSearching(text)}
          lightTheme={true}
          placeholder="Search..."
          value={textSearching}
        />
      </View>
      {/*render book of category*/}
      <View>
        <FlatList
          style={{marginBottom: 16}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={dataCategories}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleFocusCategory(item._id)}
                key={item.id}>
                <CategoryText
                  colors={colors}
                  name={item.name}
                  focussed={categoryFocusing === item._id}
                />
              </TouchableOpacity>
            );
          }}
        />
        {dataBooksOfCategory.length > 0 ? (
          <FlatList
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={dataBooksOfCategory}
            renderItem={({item}) => {
              return (
                <BookItem
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
          <View style={{alignItems: 'center', marginTop: 8}}>
            <Text style={{color: '#000'}}>
              [404] No books in this category!!
            </Text>
          </View>
        )}
      </View>
      {/*render all book*/}
      <View style={{marginTop: 30}}>
        <HeaderSection colors={colors} />
        <FlatList
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={dataBooks}
          renderItem={({item}) => {
            return (
              <BookItem
                _id={item._id}
                style={styles.bookItem}
                name={item.name}
                author={item.author}
                image={item.image}
              />
            );
          }}
        />
      </View>
      {/*tranh bi ghi de boi bottom tab*/}
      <View style={{marginBottom: 110}} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  bookItem: {
    maxWidth: WIDTH / 2 - 32,
    marginRight: 16,
  },
  welcomeMainText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: -4,
  },
  welcomeText: {
    color: '#9D9D9D',
    fontSize: 16,
  },
  sectionHeader: {},
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});
export default HomeScreen;
