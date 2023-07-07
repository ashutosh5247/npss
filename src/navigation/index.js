import React, {useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRoutes} from './app.navigation';
import {AuthRoutes} from './auth.navigation';

const RootStack = createStackNavigator();

function AppNavigation() {
  let isloggedIn = useSelector(state => state?.authReducer?.loggedIn);
  console.log('isloggedIn', isloggedIn);

  // let isloggedIn = false;

  useEffect(() => {}, []);

  return (
    <RootStack.Navigator initialRouteName={isloggedIn ? 'App' : 'Auth'}>
      {!Boolean(isloggedIn) ? (
        <RootStack.Screen
          name="Auth"
          component={AuthRoutes}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={AppRoutes}
          options={{
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigation;
