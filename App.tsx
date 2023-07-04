import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Configurestore from './src/redux/store/store';
import {Provider, useStore} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native-paper';
import NewComp from './src/components/x';

function App(): JSX.Element {
  const {store, persistor} = Configurestore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View>
            <Text>qdqdwqdwq</Text>
            <NewComp />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
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
