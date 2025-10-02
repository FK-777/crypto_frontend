import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { WalletScreen } from './src/screens/WalletScreen';
import { TradeBottomSheet } from './src/components/TradeBottomSheet';
import { View, Text, TouchableOpacity } from 'react-native';

// Placeholder screens
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

// Empty component since we use the bottom sheet
function TradeScreen() {
  return null;
}

function TaxScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tax Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [tradeSheetVisible, setTradeSheetVisible] = React.useState(false);

  const handleTradeOptionPress = (optionId: string) => {
    console.log('Selected option:', optionId);
    // Navigate to appropriate screen based on optionId
    // You can add navigation logic here
  };

  return (
    <>
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
            tabBarActiveTintColor: '#ff8c00',
            tabBarInactiveTintColor: '#999',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Market" component={MarketScreen} />
          <Tab.Screen name="KRIP AI" component={KripAiScreen} />
          <Tab.Screen
            name="Trade"
            component={TradeScreen}
            listeners={{
              tabPress: e => {
                e.preventDefault();
                setTradeSheetVisible(true);
              },
            }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: '#ff8c00',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -20,
                    shadowColor: '#ff8c00',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <Icon name="repeat" size={28} color="#fff" />
                </View>
              ),
            }}
          />
          <Tab.Screen name="Tax" component={TaxScreen} />
          <Tab.Screen name="Wallet" component={WalletScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <TradeBottomSheet
        visible={tradeSheetVisible}
        onClose={() => setTradeSheetVisible(false)}
        onOptionPress={handleTradeOptionPress}
      />
    </>
  );
}
