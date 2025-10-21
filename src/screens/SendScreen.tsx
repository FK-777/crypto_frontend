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

interface SendScreenProps {
  navigation: any;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  color: string;
  balance: number;
  priceUSD: number;
}

const cryptoList: Crypto[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    color: '#F7931A',
    balance: 2,
    priceUSD: 26000,
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    color: '#627EEA',
    balance: 5,
    priceUSD: 1800,
  },
  {
    id: '3',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'S',
    color: '#00FFA3',
    balance: 100,
    priceUSD: 20,
  },
];

export const SendScreen: React.FC<SendScreenProps> = ({ navigation }) => {
  const [receiverAddress, setReceiverAddress] = useState(
    '0x103290h193910dk193810',
  );
  const [amount, setAmount] = useState('0.010');
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>(cryptoList[0]);
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const numpadButtons = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '000',
    '0',
    'backspace',
  ];

  const handleNumpadPress = (value: string) => {
    if (value === 'backspace') {
      setAmount(prev => prev.slice(0, -1) || '0');
    } else if (value === '000') {
      setAmount(prev => prev + '000');
    } else {
      setAmount(prev => (prev === '0' ? value : prev + value));
    }
  };

  const handleScan = () => {
    console.log('Open QR scanner');
    // Add QR scanner logic here
  };

  const handleSend = () => {
    console.log(
      'Sending:',
      amount,
      selectedCrypto.symbol,
      'to',
      receiverAddress,
    );
    // Add send transaction logic here
    navigation.goBack();
  };

  const renderCryptoItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={styles.tokenItem}
      onPress={() => {
        setSelectedCrypto(item);
        setShowCryptoModal(false);
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
        <Text style={styles.headerTitle}>Send</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Receiver Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Receiver</Text>
          <View style={styles.receiverContainer}>
            <TextInput
              style={styles.receiverInput}
              value={receiverAddress}
              onChangeText={setReceiverAddress}
              placeholder="Enter wallet address"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
              <Icon name="maximize" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <View style={styles.amountContainer}>
            <View style={styles.amountHeader}>
              <TouchableOpacity
                style={styles.cryptoSelector}
                onPress={() => setShowCryptoModal(true)}
              >
                <View
                  style={[
                    styles.cryptoIcon,
                    { backgroundColor: selectedCrypto.color },
                  ]}
                >
                  <Text style={styles.cryptoIconText}>
                    {selectedCrypto.icon}
                  </Text>
                </View>
                <Text style={styles.cryptoSymbol}>{selectedCrypto.symbol}</Text>
                <Icon name="chevron-down" size={18} color="#333" />
              </TouchableOpacity>
              <Text style={styles.balanceText}>
                Balance : {selectedCrypto.balance}
              </Text>
            </View>
            <Text style={styles.amountDisplay}>{amount}</Text>
          </View>
        </View>

        {/* Conversion Info */}
        <View style={styles.conversionInfo}>
          <Text style={styles.conversionText}>
            1 {selectedCrypto.symbol} ={' '}
            {selectedCrypto.priceUSD.toLocaleString()} USD
          </Text>
          <Text style={styles.conversionText}>
            Est fee 0.00001 {selectedCrypto.symbol}
          </Text>
        </View>

        {/* Numpad */}
        <View style={styles.numpad}>
          {numpadButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numpadButton}
              onPress={() => handleNumpadPress(button)}
            >
              {button === 'backspace' ? (
                <Icon name="delete" size={24} color="#333" />
              ) : (
                <Text style={styles.numpadText}>{button}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Swap Now</Text>
        </TouchableOpacity>
      </View>

      {/* Crypto Selection Modal */}
      <Modal
        visible={showCryptoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCryptoModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCryptoModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Token</Text>
              <TouchableOpacity onPress={() => setShowCryptoModal(false)}>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  scanButton: {
    padding: 8,
    marginLeft: 8,
  },
  amountContainer: {
    gap: 12,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  balanceText: {
    fontSize: 13,
    color: '#666',
  },
  amountDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  conversionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  conversionText: {
    fontSize: 13,
    color: '#666',
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  numpadButton: {
    width: '31%',
    aspectRatio: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  numpadText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
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
