import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface BuySellScreenProps {
  navigation: any;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  color: string;
  priceUSD: number;
  balance: number;
}

const cryptoList: Crypto[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    color: '#F7931A',
    priceUSD: 26000,
    balance: 10,
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    color: '#627EEA',
    priceUSD: 1800,
    balance: 5,
  },
  {
    id: '3',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'S',
    color: '#00FFA3',
    priceUSD: 20,
    balance: 100,
  },
];

export const BuySellScreen: React.FC<BuySellScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'Buy' | 'Sell'>('Buy');
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>(cryptoList[0]);
  const [amount, setAmount] = useState('2');
  const [showTokenModal, setShowTokenModal] = useState(false);

  const totalUSD = (parseFloat(amount) * selectedCrypto.priceUSD).toFixed(2);
  const estimatedFee = 0.00001;

  const handleBuySell = () => {
    console.log(`${activeTab} ${amount} ${selectedCrypto.symbol}`);
    // Add your buy/sell logic here
    navigation.goBack();
  };

  const renderCryptoItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={styles.tokenItem}
      onPress={() => {
        setSelectedCrypto(item);
        setShowTokenModal(false);
      }}
    >
      <View style={[styles.tokenIcon, { backgroundColor: item.color }]}>
        <Text style={styles.tokenIconText}>{item.icon}</Text>
      </View>
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenSymbol}>{item.symbol}</Text>
        <Text style={styles.tokenName}>{item.name}</Text>
      </View>
      {selectedCrypto.id === item.id && (
        <Icon name="check" size={20} color="#ff8c00" />
      )}
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
        <Text style={styles.headerTitle}>Buy/sell</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Buy/Sell Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Buy' && styles.activeTab]}
            onPress={() => setActiveTab('Buy')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Buy' && styles.activeTabText,
              ]}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Sell' && styles.activeTab]}
            onPress={() => setActiveTab('Sell')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Sell' && styles.activeTabText,
              ]}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Token Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Token</Text>
          <TouchableOpacity
            style={styles.tokenSelector}
            onPress={() => setShowTokenModal(true)}
          >
            <View style={styles.tokenSelectorLeft}>
              <View
                style={[
                  styles.selectedTokenIcon,
                  { backgroundColor: selectedCrypto.color },
                ]}
              >
                <Text style={styles.selectedTokenIconText}>
                  {selectedCrypto.icon}
                </Text>
              </View>
              <Text style={styles.selectedTokenText}>
                {selectedCrypto.symbol}
              </Text>
            </View>
            <Icon name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0"
            />
            <View style={styles.amountInfo}>
              <Text style={styles.amountConversion}>
                {amount} {selectedCrypto.symbol} = {totalUSD} USD
              </Text>
              {activeTab === 'Sell' && (
                <Text style={styles.balanceText}>
                  Balance = {selectedCrypto.balance}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Price Info */}
        <View style={styles.priceInfo}>
          <Text style={styles.priceInfoText}>
            1 {selectedCrypto.symbol} ={' '}
            {selectedCrypto.priceUSD.toLocaleString()} USD
          </Text>
          <Text style={styles.priceInfoText}>
            Est fee {estimatedFee} {selectedCrypto.symbol}
          </Text>
        </View>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionLabel}>Payment</Text>
          <View style={styles.paymentSelector}>
            <Icon name="credit-card" size={20} color="#666" />
            <Text style={styles.paymentText}>Debit or Credit</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuySell}>
            <Text style={styles.buyButtonText}>
              {activeTab === 'Buy' ? 'Buy Now' : 'Sell Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Token Selection Modal */}
      <Modal
        visible={showTokenModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTokenModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTokenModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Token</Text>
              <TouchableOpacity onPress={() => setShowTokenModal(false)}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={cryptoList}
              renderItem={renderCryptoItem}
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
  menuButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
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
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  tokenSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTokenIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedTokenIconText: {
    fontSize: 18,
    color: '#fff',
  },
  selectedTokenText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  amountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountConversion: {
    fontSize: 13,
    color: '#666',
  },
  balanceText: {
    fontSize: 13,
    color: '#666',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priceInfoText: {
    fontSize: 13,
    color: '#666',
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  paymentText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#ff8c00',
  },
  cancelButtonText: {
    color: '#ff8c00',
    fontSize: 16,
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#ff8c00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    maxHeight: '70%',
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
