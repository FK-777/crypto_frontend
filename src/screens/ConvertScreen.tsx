import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

interface ConvertScreenProps {
  onClose: () => void;
}

// Token addresses mapping (Ethereum mainnet)
const TOKEN_ADDRESSES = {
  ETH: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  BNB: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};

export const ConvertScreen: React.FC<ConvertScreenProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'recurring' | 'limit'>(
    'instant',
  );
  const [selectedPeriod, setSelectedPeriod] = useState('7D');

  // Swap state
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [walletAddress] = useState(
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  ); // User's wallet

  const periods = ['7D', '30D', '180D', '360D'];

  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: [0.0015, 0.0018, 0.0014, 0.0016, 0.0015, 0.00145],
      },
    ],
  };

  // Replace with your actual 0x API key
  const ZERO_X_API_KEY = '1482c004-2e55-4ede-893f-3271a178e9bb';
  const CHAIN_ID = 1; // Ethereum mainnet

  // Fetch quote from 0x API
  const fetchQuote = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const sellTokenAddress =
        TOKEN_ADDRESSES[fromToken] || TOKEN_ADDRESSES.ETH;
      const buyTokenAddress = TOKEN_ADDRESSES[toToken] || TOKEN_ADDRESSES.USDC;

      // Convert amount to wei (assuming 18 decimals)
      const sellAmount = (parseFloat(fromAmount) * 1e18).toString();

      const url = `https://api.0x.org/swap/permit2/quote?chainId=${CHAIN_ID}&sellToken=${sellTokenAddress}&buyToken=${buyTokenAddress}&sellAmount=${sellAmount}&taker=${walletAddress}`;

      console.log('Fetching quote from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          '0x-api-key': ZERO_X_API_KEY,
          '0x-version': 'v2',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.reason || 'Failed to fetch quote');
      }

      const data = await response.json();
      setQuoteData(data);

      // Calculate the buy amount (convert from wei to token amount)
      const buyAmount = (parseInt(data.buyAmount) / 1e18).toFixed(6);
      setToAmount(buyAmount);

      console.log('Quote received:', data);
    } catch (error) {
      console.error('Error fetching quote:', error);
      Alert.alert('Error', `Failed to get quote: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch quote when amount changes (debounced)
  useEffect(() => {
    if (activeTab === 'instant' && fromAmount && parseFloat(fromAmount) > 0) {
      const timer = setTimeout(() => {
        fetchQuote();
      }, 1000); // Wait 1 second after user stops typing

      return () => clearTimeout(timer);
    }
  }, [fromAmount, fromToken, toToken, activeTab]);

  const handleSwapNow = async () => {
    if (!quoteData) {
      Alert.alert('Error', 'Please wait for the quote to load');
      return;
    }

    // Here you would execute the swap
    // This typically involves:
    // 1. Approving the token spend (if not ETH)
    // 2. Signing the transaction
    // 3. Submitting to the blockchain

    Alert.alert(
      'Swap Ready',
      `Swap ${fromAmount} ${fromToken} for approximately ${toAmount} ${toToken}\n\nPrice: ${
        quoteData.price
      }\nGas: ${quoteData.gas || 'N/A'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Execute Swap',
          onPress: () => {
            // TODO: Implement actual swap execution
            console.log('Executing swap with data:', quoteData);
            Alert.alert(
              'Info',
              'Swap execution would happen here. Connect your wallet to proceed.',
            );
          },
        },
      ],
    );
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const renderInstantTab = () => (
    <>
      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>
          1 {fromToken} = {quoteData?.price || '...'} {toToken}
        </Text>
        {quoteData?.priceImpact && (
          <Text style={styles.rateChange}>
            {parseFloat(quoteData.priceImpact) >= 0 ? '+' : ''}
            {(parseFloat(quoteData.priceImpact) * 100).toFixed(2)}%
          </Text>
        )}
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#FFFBF5',
            backgroundGradientTo: '#FFFBF5',
            decimalPlaces: 6,
            color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: { r: '0' },
          }}
          bezier
          style={styles.chart}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
        />
      </View>

      <View style={styles.periodSelector}>
        {periods.map(period => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.convertContainer}>
        {/* From Section */}
        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>From</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputLeft}>
              <TouchableOpacity style={styles.currencySelector}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencyIconText}>🔶</Text>
                </View>
                <Text style={styles.currencyName}>{fromToken}</Text>
                <Icon name="chevron-down" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputRight}>
              <TextInput
                style={styles.amountInput}
                value={fromAmount}
                onChangeText={setFromAmount}
                keyboardType="decimal-pad"
                placeholderTextColor="#ccc"
                placeholder="0.00"
              />
              <Text style={styles.balanceText}>Balance = 2.5</Text>
            </View>
          </View>
        </View>

        {/* Swap Button */}
        <View style={styles.conversionRate}>
          <Text style={styles.conversionText}>
            {quoteData
              ? `1 ${fromToken} = ${parseFloat(quoteData.price).toFixed(
                  6,
                )} ${toToken}`
              : 'Enter amount to see rate'}
          </Text>
          <TouchableOpacity style={styles.swapButton} onPress={swapTokens}>
            <Icon name="repeat" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* To Section */}
        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>To</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputLeft}>
              <TouchableOpacity style={styles.currencySelector}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencyIconText}>💎</Text>
                </View>
                <Text style={styles.currencyName}>{toToken}</Text>
                <Icon name="chevron-down" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputRight}>
              <View style={styles.amountInputContainer}>
                {loading && <ActivityIndicator size="small" color="#FF8C00" />}
                <Text style={styles.amountDisplay}>
                  {loading ? 'Loading...' : toAmount || '0.00'}
                </Text>
              </View>
              <Text style={styles.balanceText}>Balance = 1000</Text>
            </View>
          </View>
        </View>

        {/* Quote Details */}
        {quoteData && (
          <View style={styles.quoteDetails}>
            <View style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>Rate</Text>
              <Text style={styles.quoteValue}>
                1 {fromToken} = {parseFloat(quoteData.price).toFixed(6)}{' '}
                {toToken}
              </Text>
            </View>
            {quoteData.estimatedGas && (
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Est. Gas</Text>
                <Text style={styles.quoteValue}>{quoteData.estimatedGas}</Text>
              </View>
            )}
            {quoteData.sources && (
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Route</Text>
                <Text style={styles.quoteValue}>
                  {quoteData.sources[0]?.name || 'Best Route'}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          (!quoteData || loading) && styles.actionButtonDisabled,
        ]}
        onPress={handleSwapNow}
        disabled={!quoteData || loading}
      >
        <Text style={styles.actionButtonText}>
          {loading ? 'Getting Quote...' : 'Swap Now'}
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderRecurringTab = () => (
    <View style={styles.comingSoon}>
      <Icon name="clock" size={48} color="#ccc" />
      <Text style={styles.comingSoonText}>Recurring Swaps Coming Soon</Text>
    </View>
  );

  const renderLimitTab = () => (
    <View style={styles.comingSoon}>
      <Icon name="trending-up" size={48} color="#ccc" />
      <Text style={styles.comingSoonText}>Limit Orders Coming Soon</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Convert</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bar-chart-2" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'instant' && styles.activeTab]}
          onPress={() => setActiveTab('instant')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'instant' && styles.activeTabText,
            ]}
          >
            Instant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recurring' && styles.activeTab]}
          onPress={() => setActiveTab('recurring')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'recurring' && styles.activeTabText,
            ]}
          >
            Recurring
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'limit' && styles.activeTab]}
          onPress={() => setActiveTab('limit')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'limit' && styles.activeTabText,
            ]}
          >
            Limit
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'instant' && renderInstantTab()}
      {activeTab === 'recurring' && renderRecurringTab()}
      {activeTab === 'limit' && renderLimitTab()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  iconButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#ff8c00',
    fontWeight: '600',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rateText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  rateChange: {
    fontSize: 14,
    color: '#FF3D00',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#FFFBF5',
  },
  chart: {
    marginVertical: 0,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 24,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  periodButtonActive: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
  },
  periodText: {
    fontSize: 14,
    color: '#999',
  },
  periodTextActive: {
    color: '#ff8c00',
    fontWeight: '600',
  },
  convertContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  currencySection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  inputLeft: {
    flex: 1,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIconText: {
    fontSize: 18,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inputRight: {
    alignItems: 'flex-end',
  },
  amountInput: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    textAlign: 'right',
    padding: 0,
    minWidth: 100,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountDisplay: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
  },
  balanceText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  conversionRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  conversionText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteDetails: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quoteLabel: {
    fontSize: 14,
    color: '#666',
  },
  quoteValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#FF8C00',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#FFD699',
    opacity: 0.6,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});
