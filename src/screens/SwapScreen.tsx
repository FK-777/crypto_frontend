import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SwapScreenProps {
  navigation: any;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  color: string;
  balance: number;
}

const cryptoList: Crypto[] = [
  {
    id: '1',
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '◆',
    color: '#F3BA2F',
    balance: 2,
  },
  {
    id: '2',
    symbol: 'MIRA',
    name: 'Mira Token',
    icon: 'M',
    color: '#000',
    balance: 20,
  },
  {
    id: '3',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    color: '#F7931A',
    balance: 0.5,
  },
];

type TabType = 'Instant' | 'Recurring' | 'Limit';

export const SwapScreen: React.FC<SwapScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Instant');
  const [fromCrypto, setFromCrypto] = useState<Crypto>(cryptoList[0]);
  const [toCrypto, setToCrypto] = useState<Crypto>(cryptoList[1]);
  const [fromAmount, setFromAmount] = useState('0.00145667');
  const [toAmount, setToAmount] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  // Recurring tab states
  const [recurringFromAmount, setRecurringFromAmount] =
    useState('0.1 - 490000');
  const [recurringToAmount, setRecurringToAmount] = useState('100%');
  const [frequency, setFrequency] = useState('Daily, 00:00 (UTC)+5');
  const [assetDestination, setAssetDestination] = useState('Spot Amount');
  const [planName, setPlanName] = useState('BTC Recurring Plan');
  const [maxPeriod, setMaxPeriod] = useState('--');
  const [limitPrice, setLimitPrice] = useState('--');

  // Limit tab states
  const [limitFromAmount, setLimitFromAmount] = useState('0.00 - 7.9');
  const [limitToAmount, setLimitToAmount] = useState('0.035 - 270');
  const [limitFromFinal, setLimitFromFinal] = useState('0.00145667');
  const [expiresIn, setExpiresIn] = useState('Expires in 30 Days');

  const periods = ['7D', '30D', '180D', '360D'];
  const conversionRate = '1 MIRA = 0.00145667 BNB';
  const btcConversion = '1 BTC = 6 MIRA';
  const priceChange = '-2.96%';

  const handleSwapTokens = () => {
    const temp = fromCrypto;
    setFromCrypto(toCrypto);
    setToCrypto(temp);
  };

  const renderCryptoItem = ({
    item,
    isFrom,
  }: {
    item: Crypto;
    isFrom: boolean;
  }) => (
    <TouchableOpacity
      style={styles.tokenItem}
      onPress={() => {
        if (isFrom) {
          setFromCrypto(item);
          setShowFromModal(false);
        } else {
          setToCrypto(item);
          setShowToModal(false);
        }
      }}
    >
      <View style={[styles.tokenIcon, { backgroundColor: item.color }]}>
        <Text style={styles.tokenIconText}>{item.icon}</Text>
      </View>
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenSymbol}>{item.symbol}</Text>
        <Text style={styles.tokenName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Swap</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Instant' && styles.activeTab]}
            onPress={() => setActiveTab('Instant')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Instant' && styles.activeTabText,
              ]}
            >
              Instant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Recurring' && styles.activeTab]}
            onPress={() => setActiveTab('Recurring')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Recurring' && styles.activeTabText,
              ]}
            >
              Recurring
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Limit' && styles.activeTab]}
            onPress={() => setActiveTab('Limit')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Limit' && styles.activeTabText,
              ]}
            >
              Limit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instant Tab */}
        {activeTab === 'Instant' && (
          <>
            {/* Price Info */}
            <View style={styles.priceInfo}>
              <Text style={styles.conversionRate}>{conversionRate}</Text>
              <Text style={styles.priceChange}>{priceChange}</Text>
            </View>

            {/* Chart Placeholder */}
            <View style={styles.chartContainer}>
              <View style={styles.chartPlaceholder} />
            </View>

            {/* Period Selector */}
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

            {/* From Section */}
            <View style={styles.swapSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>From</Text>
                <Text style={styles.balanceText}>
                  Balance = {fromCrypto.balance}
                </Text>
              </View>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowFromModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: fromCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{fromCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{fromCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <TextInput
                  style={styles.amountInput}
                  value={fromAmount}
                  onChangeText={setFromAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                />
              </View>
            </View>

            {/* Conversion Info */}
            <View style={styles.conversionInfo}>
              <Text style={styles.conversionText}>{btcConversion}</Text>
              <TouchableOpacity onPress={handleSwapTokens}>
                <Icon name="refresh-cw" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* To Section */}
            <View style={styles.swapSection}>
              <Text style={styles.sectionLabel}>To</Text>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowToModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: toCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{toCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{toCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <TextInput
                  style={styles.amountInput}
                  value={toAmount}
                  onChangeText={setToAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                />
              </View>
              <Text style={styles.balanceText}>
                Balance = {toCrypto.balance}
              </Text>
            </View>

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>Swap Now</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Recurring Tab */}
        {activeTab === 'Recurring' && (
          <>
            {/* From Section */}
            <View style={styles.swapSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>From</Text>
                <Text style={styles.balanceText}>
                  Balance = {fromCrypto.balance}
                </Text>
              </View>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowFromModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: fromCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{fromCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{fromCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={styles.rangeText}>{recurringFromAmount}</Text>
              </View>
            </View>

            {/* Conversion Info */}
            <View style={styles.conversionInfo}>
              <Text style={styles.conversionText}>{btcConversion}</Text>
              <TouchableOpacity onPress={handleSwapTokens}>
                <Icon name="refresh-cw" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* To Section */}
            <View style={styles.swapSection}>
              <Text style={styles.sectionLabel}>
                To <Text style={styles.percentageHint}>( 100% / 100% )</Text>
              </Text>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowToModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: toCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{toCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{toCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={styles.percentageText}>{recurringToAmount}</Text>
              </View>
            </View>

            {/* Recurring Options */}
            <View style={styles.recurringOptions}>
              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Frequency</Text>
                <TouchableOpacity style={styles.optionValue}>
                  <Text style={styles.optionValueText}>{frequency}</Text>
                  <Icon name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Asset Destination</Text>
                <TouchableOpacity style={styles.optionValue}>
                  <Text style={styles.optionValueText}>{assetDestination}</Text>
                  <Icon name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Plan Name</Text>
                <TouchableOpacity style={styles.optionValue}>
                  <Text style={styles.optionValueText}>{planName}</Text>
                  <Icon name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Max Period</Text>
                <TouchableOpacity style={styles.optionValue}>
                  <Text style={styles.optionValueText}>{maxPeriod}</Text>
                  <Icon name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Limit Price</Text>
                <TouchableOpacity style={styles.optionValue}>
                  <Text style={styles.optionValueText}>{limitPrice}</Text>
                  <Icon name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>Creat a Plan</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Limit Tab */}
        {activeTab === 'Limit' && (
          <>
            {/* From Section */}
            <View style={styles.swapSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>From</Text>
                <Text style={styles.balanceText}>
                  Balance = {fromCrypto.balance}
                </Text>
              </View>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowFromModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: fromCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{fromCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{fromCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={styles.rangeText}>{limitFromAmount}</Text>
              </View>
            </View>

            {/* To Section */}
            <View style={styles.swapSection}>
              <Text style={styles.sectionLabel}>To</Text>
              <View style={styles.swapBox}>
                <TouchableOpacity
                  style={styles.cryptoSelector}
                  onPress={() => setShowToModal(true)}
                >
                  <View
                    style={[
                      styles.cryptoIcon,
                      { backgroundColor: toCrypto.color },
                    ]}
                  >
                    <Text style={styles.cryptoIconText}>{toCrypto.icon}</Text>
                  </View>
                  <Text style={styles.cryptoSymbol}>{toCrypto.symbol}</Text>
                  <Icon name="chevron-down" size={18} color="#333" />
                </TouchableOpacity>
                <Text style={styles.rangeText}>{limitToAmount}</Text>
              </View>
            </View>

            {/* From Final Amount */}
            <View style={styles.swapSection}>
              <Text style={styles.sectionLabel}>From</Text>
              <View style={styles.swapBox}>
                <View
                  style={[
                    styles.cryptoIcon,
                    { backgroundColor: fromCrypto.color },
                  ]}
                >
                  <Text style={styles.cryptoIconText}>{fromCrypto.icon}</Text>
                </View>
                <Text style={styles.cryptoSymbol}>{fromCrypto.symbol}</Text>
                <Text style={styles.finalAmount}>{limitFromFinal}</Text>
              </View>
              <Text style={styles.balanceText}>
                Balance = {fromCrypto.balance}
              </Text>
            </View>

            {/* Expires In */}
            <View style={styles.expiresSection}>
              <Text style={styles.expiresLabel}>Expires in</Text>
              <TouchableOpacity style={styles.expiresValue}>
                <Text style={styles.expiresText}>{expiresIn}</Text>
                <Icon name="chevron-down" size={16} color="#333" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.swapButton, styles.previewButton]}>
              <Text style={[styles.swapButtonText, styles.previewButtonText]}>
                Preview
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* From Token Modal */}
      <Modal visible={showFromModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFromModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Token</Text>
              <TouchableOpacity onPress={() => setShowFromModal(false)}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={cryptoList}
              renderItem={({ item }) =>
                renderCryptoItem({ item, isFrom: true })
              }
              keyExtractor={item => item.id}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* To Token Modal */}
      <Modal visible={showToModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowToModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Token</Text>
              <TouchableOpacity onPress={() => setShowToModal(false)}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={cryptoList}
              renderItem={({ item }) =>
                renderCryptoItem({ item, isFrom: false })
              }
              keyExtractor={item => item.id}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#ff8c00',
  },
  tabText: {
    fontSize: 15,
    color: '#999',
  },
  activeTabText: {
    color: '#ff8c00',
    fontWeight: '600',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  conversionRate: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  priceChange: {
    fontSize: 14,
    color: '#FF3D00',
    fontWeight: '500',
  },
  chartContainer: {
    height: 150,
    marginBottom: 16,
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  periodButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
  },
  periodText: {
    fontSize: 14,
    color: '#999',
  },
  periodTextActive: {
    color: '#ff8c00',
    fontWeight: '600',
  },
  swapSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  balanceText: {
    fontSize: 13,
    color: '#666',
  },
  swapBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cryptoSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cryptoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cryptoIconText: {
    fontSize: 18,
    color: '#fff',
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  conversionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginVertical: 12,
  },
  conversionText: {
    fontSize: 13,
    color: '#666',
  },
  swapButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  swapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rangeText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    textAlign: 'right',
  },
  percentageHint: {
    color: '#00C853',
    fontSize: 13,
  },
  percentageText: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  recurringOptions: {
    marginTop: 24,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
    fontSize: 14,
    color: '#666',
  },
  optionValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionValueText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  finalAmount: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  expiresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 24,
  },
  expiresLabel: {
    fontSize: 14,
    color: '#666',
  },
  expiresValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expiresText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  previewButton: {
    backgroundColor: '#FFF3E0',
  },
  previewButtonText: {
    color: '#ff8c00',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tokenIconText: {
    fontSize: 20,
    color: '#fff',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  tokenName: {
    fontSize: 13,
    color: '#666',
  },
});
