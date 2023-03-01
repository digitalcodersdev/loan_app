import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import RootRoutes from './navigator/RootRoutes';
import store from './store/app.store';
import {ThemeContextProvider} from './store/contexts/ThemeContext';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeContextProvider value={{color: 'white'}}>
        <StatusBar barStyle="light-content" />
        <RootRoutes />
      </ThemeContextProvider>
    </StoreProvider>
  );
};

export default App;
