import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WalletScreen } from '../screens/WalletScreen';
import { AccountInfoScreen } from '../screens/AccountInfoScreen';
import { SecurityScreen } from '../screens/SecurityScreen';
import { BuySellScreen } from '../screens/BuySellScreen';
import { SwapScreen } from '../screens/SwapScreen';
import { SendScreen } from '../screens/SendScreen';
import { ReceiveScreen } from '../screens/ReceiveScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export type WalletStackParamList = {
  WalletMain: undefined;
  AccountInfo: undefined;
  Security: undefined;
  BuySell: undefined;
  Swap: undefined;
  Send: undefined;
  Receive: undefined;
};

const Stack = createStackNavigator<WalletStackParamList>();

export const WalletStackNavigator = ({ navigation, route }: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'WalletMain';
    if (routeName !== 'WalletMain') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
          borderTopWidth: 0,
        },
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WalletMain" component={WalletScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="BuySell" component={BuySellScreen} />
      <Stack.Screen name="Swap" component={SwapScreen} />
      <Stack.Screen name="Send" component={SendScreen} />
      <Stack.Screen name="Receive" component={ReceiveScreen} />
    </Stack.Navigator>
  );
};
