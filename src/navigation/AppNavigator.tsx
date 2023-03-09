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
import {ModuleAlreadyExistsScreen} from '../screen/ModuleAlreadyExistsScreen';
import {TestingScreen} from '../screen/TestingScreen';
import {TestingProcessFirmwareScreen} from '../screen/TestingProcessFirmwareScreen';
import {TestCasesScreen} from '../screen/TestCasesScreen';
import {NewModuleAssignmentScreen} from '../screen/NewModuleAssignmentScreen';

export type StackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  DashboardScreen: undefined;
  IdAssignmentScreen: undefined;
  ModuleAlreadyExistsScreen: {
    ip: string;
  };
  TestingScreen: undefined;
  TestingProcessFirmwareScreen: undefined;
  TestCasesScreen: undefined;
  NewModuleAssignmentScreen: undefined;
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
  ModuleAlreadyExists = 'ModuleAlreadyExistsScreen',
  Testing = 'TestingScreen',
  TestingProcess = 'TestingProcessFirmwareScreen',
  TestCases = 'TestCasesScreen',
  NewModuleAssignment = 'NewModuleAssignmentScreen',
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
          initialRouteName={Route.NewModuleAssignment}>
          <Stack.Screen name={Route.Splash} component={SplashScreen} />
          <Stack.Screen name={Route.Login} component={LoginScreen} />
          <Stack.Screen name={Route.Dashboard} component={DashboardScreen} />
          <Stack.Screen
            name={Route.IdAssignment}
            component={IdAssignmentScreen}
          />
          <Stack.Screen
            name={Route.ModuleAlreadyExists}
            component={ModuleAlreadyExistsScreen}
          />
          <Stack.Screen name={Route.Testing} component={TestingScreen} />
          <Stack.Screen
            name={Route.TestingProcess}
            component={TestingProcessFirmwareScreen}
          />
          <Stack.Screen name={Route.TestCases} component={TestCasesScreen} />
          <Stack.Screen
            name={Route.NewModuleAssignment}
            component={NewModuleAssignmentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
});
