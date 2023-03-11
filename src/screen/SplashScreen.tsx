import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Route, StackParamList } from "../navigation/AppNavigator";
import { DeviceHelper } from "../helper/DeviceHelper";
import { Images } from "../assets";
import { observer } from "mobx-react";
import { Box } from "../component/Box";
import { Screen, StatusBarType } from "../component/Screen";
import { Image } from "../component/Image";

export const SplashScreen: React.FC = observer(() => {
  const {replace} = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    checkAndNavigate();
  }, []);

  const checkAndNavigate = async () => {
    setTimeout(async () => {
      replace(Route.Login);
    }, 2000);
  };

  return (
    <Screen statusBarType={StatusBarType.Light}>
      <Box
        flex={1}
        backgroundColor={'pattensBlue'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Image
          height={DeviceHelper.calculateHeightRatio(150)}
          width={DeviceHelper.calculateWidthRatio(250)}
          source={Images.splash_logo}
        />
      </Box>
    </Screen>
  );
});
