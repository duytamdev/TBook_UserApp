import React from 'react';
import MainNavigation from './src/navigations';
import {useColorScheme} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {UserProvider} from './src/contexts/UserContext';
import {ProductProvider} from './src/contexts/ProductContext';
const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D45555',
    accent: '#fff',
    text: '#fff',
    textSub: '#e5e5e5',
    background: '#000',
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D45555',
    background: '#fff',
  },
};
const App = () => {
  const scheme = useColorScheme();
  return (
    <UserProvider>
      <ProductProvider>
        <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <Provider store={store}>
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          </Provider>
        </PaperProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
