import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './route.constants';
import DashboardScreen from '../screens/app/DashboardScreen';

const AppStack = createStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName={ROUTES.APP.DASHBOARDSCREEN}>
      <AppStack.Screen
        name={ROUTES.APP.DASHBOARDSCREEN}
        component={DashboardScreen}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}
