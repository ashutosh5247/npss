import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './route.constants';
import DashboardScreen from '../screens/app/dashboardscreen';
import LoginScreen from '../screens/auth/loginscreen.js';

const AuthStack = createStackNavigator();

export function authRoutes() {
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
