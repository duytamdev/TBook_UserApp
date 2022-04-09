import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BookMarkScreen from '../screens/BookMarkScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyColor from '../assets/colors';
import CartScreen from '../screens/CartScreen';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: MyColor.primary,
        tabBarInactiveTintColor: '#CDCDCD',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          elevation: 0,
          borderTopLeftRadius: 88,
          borderTopRightRadius: 88,
          borderBottomLeftRadius: 44,
          borderBottomRightRadius: 44,
          height: 66,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <MaterialCommunityIcons
                name={'home'}
                size={focused ? 25 : 20}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons name={'cart'} size={focused ? 25 : 20} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={BookMarkScreen}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <MaterialCommunityIcons
                name={'bookmark'}
                size={focused ? 25 : 20}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
