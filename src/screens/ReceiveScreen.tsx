import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';

interface ReceiveScreenProps {
  navigation: any;
}

export const ReceiveScreen: React.FC<ReceiveScreenProps> = ({ navigation }) => {
  const walletAddress = '0x182289181s9ki93820wrws28272';

  const handleCopyAddress = () => {
    console.log('Address copied:', walletAddress);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receive</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={walletAddress}
              size={200}
              backgroundColor="#fff"
              color="#000"
            />
          </View>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{walletAddress}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyAddress}
          >
            <Icon name="copy" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 40,
    alignItems: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  qrCodeWrapper: {
    backgroundColor: '#f5f5f5',
    padding: 24,
    borderRadius: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
});
