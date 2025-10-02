import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

function MarketScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Market Screen</Text>
    </View>
  );
}

function KripAiScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>KRIP AI Screen</Text>
    </View>
  );
}

function TradeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Trade Screen</Text>
    </View>
  );
}

function TaxScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tax Screen</Text>
    </View>
  );
}

function WalletScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Wallet Screen</Text>
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';

            if (route.name === 'Market') iconName = 'bar-chart';
            else if (route.name === 'KRIP AI') iconName = 'cpu';
            else if (route.name === 'Trade') iconName = 'repeat';
            else if (route.name === 'Tax') iconName = 'file-text';
            else if (route.name === 'Wallet') iconName = 'wallet';

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="KRIP AI" component={KripAiScreen} />
        <Tab.Screen name="Trade" component={TradeScreen} />
        <Tab.Screen name="Tax" component={TaxScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
