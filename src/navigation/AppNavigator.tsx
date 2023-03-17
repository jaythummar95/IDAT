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
import {Box} from '../component/Box';
import {StatusBar} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';
import {TestingProcessFirmwareScreen} from '../screen/TestingProcessFirmwareScreen';
import {NewModuleAssignmentScreen} from '../screen/NewModuleAssignmentScreen';
import {ScanQrCodeScreen} from '../screen/ScanQrCodeScreen';
import {TestingModuleScreen} from '../screen/TestingModuleScreen';
import {ExperimentScreen} from '../screen/ExperimentScreen';

export type StackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  DashboardScreen: undefined;
  ModuleAlreadyExistsScreen: {
    ip: string;
  };
  TestingScreen: undefined;
  TestingProcessFirmwareScreen: undefined;
  NewModuleAssignmentScreen: undefined;
  ScanQrCodeScreen: {onScanComplete: (qrcodeResult: string) => void};
  TestingModuleScreen: undefined;
  ExperimentScreen: undefined;
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
  TestingProcess = 'TestingProcessFirmwareScreen',
  TestCases = 'TestCasesScreen',
  NewModuleAssignment = 'NewModuleAssignmentScreen',
  ScanQrCode = 'ScanQrCodeScreen',
  TestingModule = 'TestingModuleScreen',
  Experiment = 'ExperimentScreen',
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
          initialRouteName={Route.Experiment}>
          <Stack.Screen name={Route.Splash} component={SplashScreen} />
          <Stack.Screen name={Route.Login} component={LoginScreen} />
          <Stack.Screen name={Route.Dashboard} component={DashboardScreen} />
          <Stack.Screen
            name={Route.TestingProcess}
            component={TestingProcessFirmwareScreen}
          />
          <Stack.Screen
            name={Route.NewModuleAssignment}
            component={NewModuleAssignmentScreen}
          />
          <Stack.Screen name={Route.ScanQrCode} component={ScanQrCodeScreen} />
          <Stack.Screen
            name={Route.TestingModule}
            component={TestingModuleScreen}
          />
          <Stack.Screen name={Route.Experiment} component={ExperimentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
});
