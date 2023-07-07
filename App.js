import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Configurestore from './src/redux/store/store';
import {Provider, useStore} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider} from 'react-native-paper';
import NewComp from './src/components/x';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation';
import {navigationRef} from './src/navigation/navigation.service';

function App() {
  const {store, persistor} = Configurestore();

  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaView style={styles.safeAreaContainer}>
            <NavigationContainer ref={navigationRef}>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: COLORS.backgroundColor,
  },
});

export default App;
