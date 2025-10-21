import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { WalletScreen } from './src/screens/WalletScreen';
import { TradeBottomSheet } from './src/components/TradeBottomSheet';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { ConvertScreen } from './src/screens/ConvertScreen';
import { MarketStackNavigator } from './src/navigation/MarketStackNavigator';
import { ChooseCryptoScreen } from './src/screens/ChooseCryptoScreen';
import { ChooseCurrencyScreen } from './src/screens/ChooseCurrencyScreen';
import { KripAiScreen } from './src/screens/KripAiScreen';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { WebView } from 'react-native-webview';
import { TaxScreen } from './src/screens/TaxScreen';
import { WalletStackNavigator } from './src/navigation/WalletStackNavigator';
import { KripAiNavigator } from './src/navigation/KripAIStackNavigator';

// Empty component since we use the bottom sheet
function TradeScreen() {
  return null;
}

// function TaxScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Tax Screen</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Trade and modal states
  const [tradeSheetVisible, setTradeSheetVisible] = React.useState(false);
  const [showBuyScreen, setShowBuyScreen] = React.useState(false);
  const [showSellScreen, setShowSellScreen] = React.useState(false);
  const [showDepositScreen, setShowDepositScreen] = React.useState(false);
  const [showConvertScreen, setShowConvertScreen] = React.useState(false);
  const [showTransakWebView, setShowTransakWebView] = React.useState(false);
  const [transakUrl, setTransakUrl] = React.useState('');
  const [transactionType, setTransactionType] = React.useState<'BUY' | 'SELL'>(
    'BUY',
  );

  const handleTradeOptionPress = (optionId: string) => {
    console.log('Selected option:', optionId);
    setTradeSheetVisible(false);

    if (optionId === 'buy') {
      setTransactionType('BUY');
      setTimeout(() => setShowBuyScreen(true), 300);
    } else if (optionId === 'sell') {
      setTransactionType('SELL');
      setTimeout(() => setShowSellScreen(true), 300);
    } else if (optionId === 'convert') {
      setTimeout(() => setShowConvertScreen(true), 300);
    }
  };

  const openTransakWebView = (
    symbol: string,
    amount: number,
    type: 'BUY' | 'SELL',
  ) => {
    const apiKey = '8dd96a64-fedb-4153-98db-d168a878f23a';
    const walletAddress = '0xf0c6Eb0f878f8c91C2711a10900d3B9D0CF8B221';

    const network =
      symbol === 'BTC' ? 'bitcoin' : symbol === 'SOL' ? 'solana' : 'ethereum';

    const url =
      `https://global-stg.transak.com?apiKey=${apiKey}` +
      `&fiatAmount=${amount}` +
      `&cryptoCurrencyCode=${symbol}` +
      `&network=${network}` +
      `&walletAddress=${walletAddress}` +
      `&productsAvailed=${type}` +
      `&hideExchangeScreen=true` +
      `&disableWalletAddressForm=true`;

    console.log('Opening Transak with URL:', url);
    setTransakUrl(url);
    setShowBuyScreen(false);
    setShowSellScreen(false);

    setTimeout(() => {
      setShowTransakWebView(true);
      console.log('Transak WebView opened');
    }, 400);
  };

  if (!isAuthenticated) {
    return <AuthNavigator onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

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
          <Tab.Screen name="Market" component={MarketStackNavigator} />
          <Tab.Screen name="KRIP AI" component={KripAiNavigator} />
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
          <Tab.Screen name="Wallet" component={WalletStackNavigator} />
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
          onBuyCrypto={(crypto, amount) => {
            console.log('Buy crypto:', crypto.symbol, 'Amount:', amount);
            openTransakWebView(crypto.symbol, amount, 'BUY');
          }}
          transactionType="Buy"
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
          onBuyCrypto={(crypto, amount) => {
            console.log('Sell crypto:', crypto.symbol, 'Amount:', amount);
            openTransakWebView(crypto.symbol, amount, 'SELL');
          }}
          transactionType="Sell"
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
            setShowDepositScreen(false);
          }}
        />
      </Modal>

      <Modal
        visible={showTransakWebView}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowTransakWebView(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <View
            style={{
              backgroundColor: '#ff8c00',
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log('Closing Transak');
                setShowTransakWebView(false);
              }}
              style={{
                position: 'absolute',
                left: 16,
                padding: 8,
              }}
            >
              <Icon name="x" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              {transactionType === 'BUY'
                ? 'Buy Crypto To Your Wallet'
                : 'Sell Crypto From Your Wallet'}
            </Text>
          </View>
          {transakUrl ? (
            <WebView
              source={{ uri: transakUrl }}
              style={{ flex: 1 }}
              startInLoadingState={true}
              renderLoading={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    Loading...
                  </Text>
                </View>
              )}
              onError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
              onLoad={() => console.log('WebView loaded')}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
              }}
            >
              <Text style={{ color: '#fff' }}>No URL set</Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </>
  );
}
