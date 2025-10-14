import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
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
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    price: 62000.0,
    change24h: 0.5,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    color: '#627EEA',
    price: 45000.0,
    change24h: 0.2,
  },
  {
    id: '3',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    icon: '🐕',
    color: '#FFA409',
    price: 0.0184,
    change24h: -0.2,
  },
  {
    id: '4',
    name: 'Cortex',
    symbol: 'CXTX',
    icon: '△',
    color: '#000',
    price: 0.1593,
    change24h: -0.4,
  },
  {
    id: '5',
    name: 'Binance Coin',
    symbol: 'BNB',
    icon: '◆',
    color: '#F3BA2F',
    price: 318.0,
    change24h: -0.2,
  },
  {
    id: '6',
    name: 'Flux',
    symbol: 'FLUX',
    icon: '⬢',
    color: '#2B6DE6',
    price: 0.664,
    change24h: 0.15,
  },
  {
    id: '7',
    name: 'Flow',
    symbol: 'FLOW',
    icon: '◉',
    color: '#00EF8B',
    price: 0.6988,
    change24h: 1.2,
  },
];

export const MarketScreen = () => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'coin'>('watchlist');
  const [activeSortTab, setActiveSortTab] = useState<
    'hot' | 'marketCap' | 'price' | '24hChange'
  >('hot');
  const [searchQuery, setSearchQuery] = useState('');

  const renderCryptoItem = ({ item }: { item: CryptoAsset }) => (
    <TouchableOpacity style={styles.cryptoItem}>
      <View style={styles.cryptoLeft}>
        <View style={[styles.cryptoIcon, { backgroundColor: item.color }]}>
          <Text style={styles.cryptoIconText}>{item.icon}</Text>
        </View>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
          <Text style={styles.cryptoName}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.cryptoRight}>
        <Text style={styles.cryptoPrice}>${item.price.toLocaleString()}</Text>
        <Text
          style={[
            styles.changePercent,
            { color: item.change24h >= 0 ? '#00C853' : '#FF3D00' },
          ]}
        >
          {item.change24h >= 0 ? '+' : ''}
          {item.change24h.toFixed(1)}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Market</Text>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Token"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="sliders" size={20} color="#333" />
          </TouchableOpacity>
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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  filterButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
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
    fontSize: 13,
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
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 24,
    color: '#fff',
  },
  cryptoInfo: {
    justifyContent: 'center',
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cryptoName: {
    fontSize: 13,
    color: '#999',
  },
  cryptoRight: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  changePercent: {
    fontSize: 13,
    fontWeight: '500',
  },
});
