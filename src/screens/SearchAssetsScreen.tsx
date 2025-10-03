import React, { useState, useEffect, useRef } from 'react';
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
import { Asset } from '../types';

interface SearchAssetsScreenProps {
  assets: Asset[];
  onClose: () => void;
  onSelectAsset?: (asset: Asset) => void;
}

export const SearchAssetsScreen: React.FC<SearchAssetsScreenProps> = ({
  assets,
  onClose,
  onSelectAsset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(assets);
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto-focus the search input when screen opens
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    let filtered = assets;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter zero balance
    if (hideZeroBalance) {
      filtered = filtered.filter(asset => asset.amount > 0);
    }

    setFilteredAssets(filtered);
  }, [searchQuery, hideZeroBalance, assets]);

  const renderAssetItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity
      style={styles.assetItem}
      onPress={() => {
        onSelectAsset?.(item);
        onClose();
      }}
    >
      <View style={styles.assetLeft}>
        <View
          style={[
            styles.assetIcon,
            { backgroundColor: item.color || '#f0f0f0' },
          ]}
        >
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{item.name}</Text>
          <Text style={styles.assetSymbol}>{item.symbol}</Text>
        </View>
      </View>
      <View style={styles.assetRight}>
        <Text style={styles.assetAmount}>{item.amount}</Text>
        <Text style={styles.assetValue}>Rs {item.value.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Portfolio</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search Coins"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="x" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setHideZeroBalance(!hideZeroBalance)}
        >
          <View
            style={[
              styles.checkboxBox,
              hideZeroBalance && styles.checkboxChecked,
            ]}
          >
            {hideZeroBalance && <Icon name="check" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Hide 0 Balance</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAssets}
        renderItem={renderAssetItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No assets found</Text>
          </View>
        }
      />
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
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
  assetInfo: {
    justifyContent: 'center',
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  assetSymbol: {
    fontSize: 14,
    color: '#999',
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  assetValue: {
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
});
