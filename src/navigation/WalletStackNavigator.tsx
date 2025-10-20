import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WalletScreen } from '../screens/WalletScreen';
import { AccountInfoScreen } from '../screens/AccountInfoScreen';
import { SecurityScreen } from '../screens/SecurityScreen';
import { BuySellScreen } from '../screens/BuySellScreen';
import { SwapScreen } from '../screens/SwapScreen';

export type WalletStackParamList = {
  WalletMain: undefined;
  AccountInfo: undefined;
  Security: undefined;
  BuySell: undefined;
  Swap: undefined;
};

const Stack = createStackNavigator<WalletStackParamList>();

export const WalletStackNavigator = () => {
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
    </Stack.Navigator>
  );
};
