import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Currency {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  color: string;
  status?: string;
}

interface ChooseCurrencyScreenProps {
  onClose: () => void;
  onSelectCurrency?: (currency: Currency) => void;
}

const trendingCurrencies: Currency[] = [
  {
    id: '1',
    name: 'PKR',
    fullName: 'Pakistani rupee',
    icon: '🇵🇰',
    color: '#01411C',
  },
  {
    id: '2',
    name: 'Bitcoin',
    fullName: 'Bitcoin',
    icon: '₿',
    color: '#F7931A',
  },
  {
    id: '3',
    name: 'Ethereum',
    fullName: 'Ethereum',
    icon: '💎',
    color: '#627EEA',
  },
  {
    id: '4',
    name: 'TetherUS',
    fullName: 'TetherUS',
    icon: '💵',
    color: '#26A17B',
  },
  { id: '5', name: 'BNB', fullName: 'BNB', icon: '🔶', color: '#F3BA2F' },
];

const allCurrencies: Currency[] = [
  { id: '6', name: 'OG', fullName: 'OG', icon: '⚪', color: '#999' },
  { id: '7', name: '1000CAT', fullName: 'DOGE', icon: '🐱', color: '#FFB800' },
  { id: '8', name: '1000CHEEMS', fullName: 'TRX', icon: '⚫', color: '#333' },
  {
    id: '9',
    name: '1000PEPPER',
    fullName: 'PEPPER',
    icon: '🌶️',
    color: '#FF4444',
    status: 'Suspended',
  },
  {
    id: '10',
    name: '1000SATS',
    fullName: "1000'SATS (Ordinals)",
    icon: '🟠',
    color: '#FF8C00',
  },
];

const alphabet = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const ChooseCurrencyScreen: React.FC<ChooseCurrencyScreenProps> = ({
  onClose,
  onSelectCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const allItems = [...trendingCurrencies, ...allCurrencies];
    if (searchQuery) {
      const filtered = allItems.filter(
        currency =>
          currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          currency.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCurrencies(filtered);
    } else {
      setFilteredCurrencies(allItems);
    }
  }, [searchQuery]);

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => {
        if (item.status !== 'Suspended') {
          onSelectCurrency?.(item);
          onClose();
        }
      }}
      disabled={item.status === 'Suspended'}
    >
      <View style={styles.currencyLeft}>
        <View style={[styles.currencyIcon, { backgroundColor: item.color }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.currencyInfo}>
          <Text
            style={[
              styles.currencyName,
              item.status === 'Suspended' && styles.suspendedText,
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.currencyFullName,
              item.status === 'Suspended' && styles.suspendedText,
            ]}
          >
            {item.fullName}
          </Text>
        </View>
      </View>
      {item.status && <Text style={styles.statusText}>{item.status}</Text>}
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Currency</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coins"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.listContainer}>
          {!searchQuery && renderSectionHeader('Trending')}
          <FlatList
            data={searchQuery ? filteredCurrencies : trendingCurrencies}
            renderItem={renderCurrencyItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No currencies found</Text>
              </View>
            }
          />
          {!searchQuery && (
            <>
              {renderSectionHeader('0')}
              <FlatList
                data={allCurrencies}
                renderItem={renderCurrencyItem}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>

        <View style={styles.alphabetContainer}>
          {alphabet.map(letter => (
            <TouchableOpacity key={letter} style={styles.alphabetItem}>
              <Text style={styles.alphabetText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencyIcon: {
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
  currencyInfo: {
    justifyContent: 'center',
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  currencyFullName: {
    fontSize: 14,
    color: '#999',
  },
  suspendedText: {
    opacity: 0.5,
  },
  statusText: {
    fontSize: 14,
    color: '#999',
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
  alphabetContainer: {
    width: 30,
    paddingVertical: 8,
    alignItems: 'center',
  },
  alphabetItem: {
    paddingVertical: 2,
  },
  alphabetText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
});
