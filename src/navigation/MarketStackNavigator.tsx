import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MarketScreen } from '../screens/MarketScreen';
import { MarketDetailScreen } from '../screens/MarketDetailScreen';
import { CreateAlertScreen } from '../screens/CreateAlertScreen';

// Define the param list for type safety
export type MarketStackParamList = {
  MarketList: undefined;
  MarketDetail: {
    symbol: string;
    name: string;
    icon: string;
    color: string;
    price: number;
    change24h: number;
  };
  CreateAlert: {
    symbol: string;
    name: string;
    icon: string;
    color: string;
    price: number;
    change24h: number;
    alertType: string;
  };
};

const Stack = createStackNavigator<MarketStackParamList>();

export const MarketStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MarketList" component={MarketScreen} />
      <Stack.Screen name="MarketDetail" component={MarketDetailScreen} />
      <Stack.Screen name="CreateAlert" component={CreateAlertScreen} />
    </Stack.Navigator>
  );
};
