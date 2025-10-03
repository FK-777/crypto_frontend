import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  price: number;
  change24h: number;
}

const cryptoData: CryptoAsset[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '💎',
    color: '#627EEA',
    price: 1126053.25,
    change24h: 1.65,
  },
  {
    id: '2',
    name: 'Plasma',
    symbol: 'XPL',
    icon: '🔵',
    color: '#00B8D4',
    price: 420.99,
    change24h: 22.43,
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    icon: '⚫',
    color: '#14F195',
    price: 56000.0,
    change24h: -3.21,
  },
  {
    id: '4',
    name: 'BNB',
    symbol: 'BNB',
    icon: '🔶',
    color: '#F3BA2F',
    price: 275834.88,
    change24h: 3.83,
  },
  {
    id: '5',
    name: 'Kaito',
    symbol: 'KAITO',
    icon: '⭐',
    color: '#00D4AA',
    price: 319.57,
    change24h: 13.4,
  },
  {
    id: '6',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    price: 30737279.2,
    change24h: -0.2,
  },
];

export const MarketScreen = () => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'coin'>('watchlist');
  const [activeSortTab, setActiveSortTab] = useState<
    'hot' | 'marketCap' | 'price' | '24hChange'
  >('hot');

  const renderCryptoItem = ({ item }: { item: CryptoAsset }) => (
    <TouchableOpacity style={styles.cryptoItem}>
      <View style={styles.cryptoLeft}>
        <View style={[styles.cryptoIcon, { backgroundColor: item.color }]}>
          <Text style={styles.cryptoIconText}>{item.icon}</Text>
        </View>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{item.name}</Text>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
        </View>
      </View>
      <View style={styles.cryptoRight}>
        <Text
          style={[
            styles.changePercent,
            { color: item.change24h >= 0 ? '#00C853' : '#FF3D00' },
          ]}
        >
          {item.change24h >= 0 ? '+' : ''}
          {item.change24h.toFixed(2)}%
        </Text>
        <Text style={styles.cryptoPrice}>Rs {item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Market</Text>
      </View>

      <View style={styles.valueContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Est. Total Value</Text>
          <Icon name="info" size={16} color="#999" style={styles.infoIcon} />
        </View>
        <Text style={styles.value}>Rs 85.53</Text>
      </View>

      <TouchableOpacity style={styles.addFundsButton}>
        <Text style={styles.addFundsButtonText}>Add Funds</Text>
      </TouchableOpacity>

      <View style={styles.promoCard}>
        <View style={styles.promoContent}>
          <Text style={styles.promoTitle}>EARN TOGATHER</Text>
          <Text style={styles.promoSubtitle}>Share $450,000 Prize Pool !</Text>
        </View>
        <View style={styles.promoIcon}>
          <Icon name="arrow-up-right" size={24} color="#ff8c00" />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'watchlist' && styles.activeTab]}
          onPress={() => setActiveTab('watchlist')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'watchlist' && styles.activeTabText,
            ]}
          >
            Watchlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'coin' && styles.activeTab]}
          onPress={() => setActiveTab('coin')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'coin' && styles.activeTabText,
            ]}
          >
            Coin
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortTab,
            activeSortTab === 'hot' && styles.activeSortTab,
          ]}
          onPress={() => setActiveSortTab('hot')}
        >
          <Text
            style={[
              styles.sortTabText,
              activeSortTab === 'hot' && styles.activeSortTabText,
            ]}
          >
            Hot
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortTab,
            activeSortTab === 'marketCap' && styles.activeSortTab,
          ]}
          onPress={() => setActiveSortTab('marketCap')}
        >
          <Text
            style={[
              styles.sortTabText,
              activeSortTab === 'marketCap' && styles.activeSortTabText,
            ]}
          >
            Market Cap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortTab,
            activeSortTab === 'price' && styles.activeSortTab,
          ]}
          onPress={() => setActiveSortTab('price')}
        >
          <Text
            style={[
              styles.sortTabText,
              activeSortTab === 'price' && styles.activeSortTabText,
            ]}
          >
            Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortTab,
            activeSortTab === '24hChange' && styles.activeSortTab,
          ]}
          onPress={() => setActiveSortTab('24hChange')}
        >
          <Text
            style={[
              styles.sortTabText,
              activeSortTab === '24hChange' && styles.activeSortTabText,
            ]}
          >
            24H Change
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  valueContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  infoIcon: {
    marginLeft: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  addFundsButton: {
    backgroundColor: '#ff8c00',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  addFundsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFD54F',
    marginBottom: 16,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 12,
    color: '#F57C00',
    marginBottom: 4,
    fontWeight: '600',
  },
  promoSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  promoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff8c00',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
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
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sortTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeSortTab: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
  },
  sortTabText: {
    fontSize: 14,
    color: '#999',
  },
  activeSortTabText: {
    color: '#ff8c00',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  cryptoIconText: {
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
  cryptoRight: {
    alignItems: 'flex-end',
  },
  changePercent: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cryptoPrice: {
    fontSize: 14,
    color: '#999',
  },
});
