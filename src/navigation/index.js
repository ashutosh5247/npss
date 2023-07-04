import React, {useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appRoutes } from './app.navigation';
import { authRoutes } from './auth.navigation';

const RootStack = createStackNavigator();

function AppNavigation() {
  // let isloggedIn = useSelector(state => state?.authReducer?.loggedIn);
  let isloggedIn = true;

  useEffect(() => {}, []);

  return (
    <RootStack.Navigator initialRouteName={isloggedIn ? 'App' : 'Auth'}>
      {!isloggedIn ? (
        <RootStack.Screen
          name="Auth"
          component={authRoutes}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={appRoutes}
          options={{
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigation;
