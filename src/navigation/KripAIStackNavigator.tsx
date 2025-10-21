import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { KripAiScreen } from '../screens/KripAiScreen';
import { LimitOrdersScreen } from '../screens/LimitOrdersScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Note: Install if not already installed:
// npm install @react-navigation/stack
// npm install react-native-gesture-handler react-native-reanimated

export type KripAiStackParamList = {
  KripAiChat: undefined;
  LimitOrders: undefined;
};

const Stack = createStackNavigator<KripAiStackParamList>();

export const KripAiNavigator = ({ navigation, route }: any) => {
  // Hide tab bar when not on main screen (same pattern as WalletStackNavigator)
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'KripAiChat';
    if (routeName !== 'KripAiChat') {
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
      <Stack.Screen name="KripAiChat" component={KripAiScreen} />
      <Stack.Screen name="LimitOrders" component={LimitOrdersScreen} />
    </Stack.Navigator>
  );
};
