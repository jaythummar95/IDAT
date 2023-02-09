import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {SplashScreen} from '../screen/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {LoginScreen} from '../screen/LoginScreen';
import {DashboardScreen} from '../screen/DashboardScreen';
import {IdAssignmentScreen} from '../screen/IdAssignmentScreen';
import {Box} from '../component/Box';
import {StatusBar} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';

export type StackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  DashboardScreen: undefined;
  IdAssignmentScreen: undefined;
};
const navigationRef = createNavigationContainerRef<StackParamList>();

interface NavigationProps {
  screenName: Route;
  params?: any;
}

export function navigate({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
}
export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}
const Stack = createStackNavigator<StackParamList>();

export enum Route {
  Splash = 'SplashScreen',
  Login = 'LoginScreen',
  Dashboard = 'DashboardScreen',
  IdAssignment = 'IdAssignmentScreen',
}

export const AppNavigator: React.FC = observer(() => {
  const {colors} = useTheme<Theme>();
  return (
    <Box flex={1}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={Route.Splash}>
          <Stack.Screen name={Route.Splash} component={SplashScreen} />
          <Stack.Screen name={Route.Login} component={LoginScreen} />
          <Stack.Screen name={Route.Dashboard} component={DashboardScreen} />
          <Stack.Screen
            name={Route.IdAssignment}
            component={IdAssignmentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
});
