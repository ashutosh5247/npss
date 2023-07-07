import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './route.constants';
import LoginScreen from '../screens/auth/LoginScreen.js';

const AuthStack = createStackNavigator();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator initialRouteName={ROUTES.AUTH.LOGINSCREEN}>
      <AuthStack.Screen
        name={ROUTES.AUTH.LOGINSCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}
