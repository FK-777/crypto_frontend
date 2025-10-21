import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MarketScreen } from '../screens/MarketScreen';
import { MarketDetailScreen } from '../screens/MarketDetailScreen';
import { CreateAlertScreen } from '../screens/CreateAlertScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
// import { EditAlertScreen } from '../screens/EditAlertScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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
  Alerts: undefined;
  EditAlert: {
    alert: any;
  };
};

const Stack = createStackNavigator<MarketStackParamList>();

export const MarketStackNavigator = ({ navigation, route }: any) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MarketList';
    if (routeName !== 'MarketList') {
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
      <Stack.Screen name="MarketList" component={MarketScreen} />
      <Stack.Screen name="MarketDetail" component={MarketDetailScreen} />
      <Stack.Screen name="CreateAlert" component={CreateAlertScreen} />
      <Stack.Screen name="Alerts" component={AlertsScreen} />
      {/* <Stack.Screen name="EditAlert" component={EditAlertScreen} /> */}
    </Stack.Navigator>
  );
};
