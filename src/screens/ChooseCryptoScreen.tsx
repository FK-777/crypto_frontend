import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  price: number;
}

interface ChooseCryptoScreenProps {
  onClose: () => void;
  onSelectCrypto?: (crypto: Crypto) => void;
  onBuyCrypto?: (crypto: Crypto, amount: number) => void;
  title?: string;
  transactionType?: 'Buy' | 'Sell';
}

const topCryptos: Crypto[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    price: 30846446.78,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '💎',
    color: '#627EEA',
    price: 1129784.96,
  },
  {
    id: '3',
    name: 'TetherUS',
    symbol: 'USDT',
    icon: '💵',
    color: '#26A17B',
    price: 281.37,
  },
  {
    id: '4',
    name: 'BNB',
    symbol: 'BNB',
    icon: '🔶',
    color: '#F3BA2F',
    price: 272492.77,
  },
  {
    id: '5',
    name: 'USDC',
    symbol: 'USDC',
    icon: '🔵',
    color: '#2775CA',
    price: 281.14,
  },
  {
    id: '6',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: '🐕',
    color: '#C2A633',
    price: 65.36,
  },
  {
    id: '7',
    name: 'TRON',
    symbol: 'TRX',
    icon: '🔺',
    color: '#FF060A',
    price: 95.32,
  },
  {
    id: '8',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '🔷',
    color: '#0033AD',
    price: 222.25,
  },
  {
    id: '9',
    name: 'SHIBA INU',
    symbol: 'SHIB',
    icon: '🐕',
    color: '#FFA409',
    price: 0.00333986,
  },
];

export const ChooseCryptoScreen: React.FC<ChooseCryptoScreenProps> = ({
  onClose,
  onSelectCrypto,
  onBuyCrypto,
  title = 'Choose Crypto',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState(topCryptos);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const filtered = topCryptos.filter(
        crypto =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCryptos(filtered);
    } else {
      setFilteredCryptos(topCryptos);
    }
  }, [searchQuery]);

  const handleCryptoPress = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setShowAmountModal(true);
  };

  const handleContinue = () => {
    const amountValue = parseFloat(amount);
    if (selectedCrypto && amountValue > 0) {
      setShowAmountModal(false);
      setAmount('');
      if (onBuyCrypto) {
        onBuyCrypto(selectedCrypto, amountValue);
      }
      onClose();
    }
  };

  const renderCryptoItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={styles.cryptoItem}
      onPress={() => handleCryptoPress(item)}
    >
      <View style={styles.cryptoLeft}>
        <View style={[styles.cryptoIcon, { backgroundColor: item.color }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{item.name}</Text>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
        </View>
      </View>
      <Text style={styles.cryptoPrice}>Rs {item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Search</Text>
      </View>

      <FlatList
        data={filteredCryptos}
        renderItem={renderCryptoItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cryptocurrencies found</Text>
          </View>
        }
      />

      {/* Amount Input Modal */}
      <Modal
        visible={showAmountModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAmountModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Buy {selectedCrypto?.symbol}</Text>
            <Text style={styles.modalHint}>Enter amount in USD</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="e.g., 100"
              keyboardType="numeric"
              style={styles.modalInput}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => {
                  setShowAmountModal(false);
                  setAmount('');
                }}
              >
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnContinue]}
                onPress={handleContinue}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <Text style={styles.modalBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  placeholder: {
    width: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cryptoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  cryptoInfo: {
    justifyContent: 'center',
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cryptoSymbol: {
    fontSize: 14,
    color: '#999',
  },
  cryptoPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalBtnContinue: {
    backgroundColor: '#ff8c00',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalBtnTextCancel: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});
