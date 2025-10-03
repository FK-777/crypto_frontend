import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AssetItem } from '../components/AssetItem';
import { AssetTrend } from '../components/AssetTrend';
import { AssetAllocation } from '../components/AssetAllocation';
import { PeriodSelector } from '../components/PeriodSelector';
import { SearchAssetsScreen } from './SearchAssetsScreen';
import { Asset, AllocationItem } from '../types';

const assets: Asset[] = [
  {
    id: 1,
    name: 'BNB',
    symbol: 'BNB',
    amount: 0.00030437,
    value: 82.93,
    icon: '🔶',
    color: '#F3BA2F',
  },
  {
    id: 2,
    name: 'ETHW',
    symbol: 'ETHW',
    amount: 0.0026973,
    value: 1.02,
    icon: '💎',
    color: '#627EEA',
  },
  {
    id: 3,
    name: 'USDT',
    symbol: 'USDT',
    amount: 0.001,
    value: 0.28334,
    icon: '💵',
    color: '#26A17B',
  },
];

const allocations: AllocationItem[] = [
  { name: 'BNB', percentage: 70, color: '#4169E1' },
  { name: 'Ethereum PoW', percentage: 20, color: '#87CEEB' },
  { name: 'Tether US', percentage: 5, color: '#FFD700' },
  { name: 'Others', percentage: 5, color: '#20B2AA' },
];

const chartData = {
  labels: ['', '', '', '', ''],
  datasets: [
    {
      data: [97.93, 102, 95, 88, 92.28],
    },
  ],
};

export const WalletScreen = () => {
  const [showAssetAllocation, setShowAssetAllocation] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  const periods = ['7D', '30D', '180D', '360D'];

  const filteredAssets = hideZeroBalance
    ? assets.filter(asset => asset.amount > 0)
    : assets;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio</Text>
        </View>

        <View style={styles.valueContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Est. Total Value</Text>
            <Icon name="info" size={16} color="#999" style={styles.infoIcon} />
          </View>
          <Text style={styles.value}>Rs 85.53</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.takeOutButton}>
            <Text style={styles.takeOutButtonText}>Take Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addFundsButton}>
            <Text style={styles.addFundsButtonText}>Add Funds</Text>
          </TouchableOpacity>
        </View>

        {showAssetAllocation ? (
          <AssetAllocation
            allocations={allocations}
            onToggleView={() => setShowAssetAllocation(false)}
          />
        ) : (
          <AssetTrend
            data={chartData}
            currentValue="Rs 92.28"
            startValue="Rs 97.93"
            onToggleView={() => setShowAssetAllocation(true)}
          />
        )}

        <PeriodSelector
          periods={periods}
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
        />

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
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setShowSearchScreen(true)}
          >
            <Icon name="search" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.assetList}>
          {filteredAssets.map(asset => (
            <AssetItem key={asset.id} asset={asset} />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showSearchScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SearchAssetsScreen
          assets={assets}
          onClose={() => setShowSearchScreen(false)}
          onSelectAsset={(asset: any) => {
            console.log('Selected asset:', asset);
            // Handle asset selection here
          }}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  valueContainer: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  infoIcon: {
    marginLeft: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#fff',
    gap: 12,
  },
  takeOutButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  takeOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addFundsButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ff8c00',
    borderRadius: 8,
    alignItems: 'center',
  },
  addFundsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
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
  searchButton: {
    padding: 4,
  },
  assetList: {
    backgroundColor: '#fff',
  },
});
