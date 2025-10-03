import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { WalletScreen } from './src/screens/WalletScreen';
import { TradeBottomSheet } from './src/components/TradeBottomSheet';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { ConvertScreen } from './src/screens/ConvertScreen';
import { MarketScreen } from './src/screens/MarketScreen';
import { ChooseCryptoScreen } from './src/screens/ChooseCryptoScreen';
import { ChooseCurrencyScreen } from './src/screens/ChooseCurrencyScreen';

// Placeholder screens
// function MarketScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Market Screen</Text>
//     </View>
//   );
// }

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
  const [showBuyScreen, setShowBuyScreen] = React.useState(false);
  const [showSellScreen, setShowSellScreen] = React.useState(false);
  const [showDepositScreen, setShowDepositScreen] = React.useState(false);

  const [tradeSheetVisible, setTradeSheetVisible] = React.useState(false);

  const handleTradeOptionPress = (optionId: string) => {
    console.log('Selected option:', optionId);
    if (optionId === 'buy') {
      setShowBuyScreen(true);
    } else if (optionId === 'sell') {
      setShowSellScreen(true);
    } else if (optionId === 'convert') {
      setShowConvertScreen(true);
    } else if (optionId === 'deposit') {
      setShowDepositScreen(true);
    }
  };

  const [showConvertScreen, setShowConvertScreen] = React.useState(false);

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
      <Modal
        visible={showConvertScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ConvertScreen onClose={() => setShowConvertScreen(false)} />
      </Modal>

      <Modal
        visible={showBuyScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChooseCryptoScreen
          title="Choose Crypto"
          onClose={() => setShowBuyScreen(false)}
          onSelectCrypto={crypto => {
            console.log('Selected crypto for buy:', crypto);
            // Navigate to Buy screen with selected crypto
          }}
        />
      </Modal>

      <Modal
        visible={showSellScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChooseCryptoScreen
          title="Choose Crypto"
          onClose={() => setShowSellScreen(false)}
          onSelectCrypto={crypto => {
            console.log('Selected crypto for sell:', crypto);
            // Navigate to Sell screen with selected crypto
          }}
        />
      </Modal>

      <Modal
        visible={showDepositScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChooseCurrencyScreen
          onClose={() => setShowDepositScreen(false)}
          onSelectCurrency={currency => {
            console.log('Selected currency for deposit:', currency);
            // Navigate to Deposit screen with selected currency
          }}
        />
      </Modal>
    </>
  );
}
