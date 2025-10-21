import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Asset } from '../types';

const assets: Asset[] = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 1.2,
    value: 62000.0,
    icon: '₿',
    color: '#F7931A',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 2.5,
    value: 45000.0,
    icon: 'Ξ',
    color: '#627EEA',
  },
];

interface WalletScreenProps {
  navigation: any;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const [showAssetAllocation, setShowAssetAllocation] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [hideZeroBalance, setHideZeroBalance] = useState(false);

  const periods = ['7D', '30D', '180D', '360D'];

  const filteredAssets = hideZeroBalance
    ? assets.filter(asset => asset.amount > 0)
    : assets;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('AccountInfo')}
          >
            <Icon name="user" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Portfolio</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="grid" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Icon name="eye" size={18} color="#666" style={styles.eyeIcon} />
          </View>

          <View style={styles.balanceRow}>
            <Text style={styles.walletAddress}>0x182....8272</Text>
            <Icon name="copy" size={16} color="#666" />
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.balanceAmount}>$90,000.00</Text>
            <View style={styles.changeContainer}>
              <View style={styles.changeBadge}>
                <Text style={styles.changeText}>+ $200</Text>
              </View>
              <Text style={styles.changePercent}>+ 0.5 %</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Asset Trend</Text>
            <View style={styles.chartIcons}>
              <TouchableOpacity
                style={styles.chartIconButton}
                onPress={() => setShowAssetAllocation(!showAssetAllocation)}
              >
                <Icon
                  name="bar-chart-2"
                  size={18}
                  color={showAssetAllocation ? '#999' : '#ff8c00'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartIconButton}>
                <Icon name="clock" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          </View>

          {showAssetAllocation ? (
            <View style={styles.allocationChart}>
              <View style={styles.donutPlaceholder}>
                <View style={styles.donutCenter} />
              </View>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#4169E1' }]}
                  />
                  <Text style={styles.legendText}>BNB</Text>
                  <Text style={styles.legendPercent}>70%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#87CEEB' }]}
                  />
                  <Text style={styles.legendText}>Ethereum PoW</Text>
                  <Text style={styles.legendPercent}>20%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#FFD700' }]}
                  />
                  <Text style={styles.legendText}>Tether US</Text>
                  <Text style={styles.legendPercent}>5%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#20B2AA' }]}
                  />
                  <Text style={styles.legendText}>Others</Text>
                  <Text style={styles.legendPercent}>5%</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.trendChart}>
              <Text style={styles.currentValue}>Rs 92.28</Text>
              <View style={styles.chartPlaceholder} />
              <Text style={styles.startValue}>Rs 97.93</Text>
            </View>
          )}

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
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Send')}
          >
            <Icon name="arrow-up" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Receive')}
          >
            <Icon name="arrow-down" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Swap')}
          >
            <Icon name="repeat" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Swap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BuySell')}
          >
            <Icon name="credit-card" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Buy/Sell</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.assetListContainer}>
          <View style={styles.assetListHeader}>
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
                {hideZeroBalance && (
                  <Icon name="check" size={12} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Hide 0 Balance</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="search" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {filteredAssets.map(asset => (
            <View key={asset.id} style={styles.assetItem}>
              <View style={styles.assetLeft}>
                <View
                  style={[styles.assetIcon, { backgroundColor: asset.color }]}
                >
                  <Text style={styles.assetIconText}>{asset.icon}</Text>
                </View>
                <View style={styles.assetInfo}>
                  <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                  <Text style={styles.assetAmount}>
                    {asset.amount} {asset.symbol}
                  </Text>
                </View>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>
                  ${asset.value.toLocaleString()}
                </Text>
                <Text style={styles.assetChange}>+ 0.5 %</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  balanceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  eyeIcon: {
    marginLeft: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletAddress: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  changeContainer: {
    alignItems: 'flex-end',
  },
  changeBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  changeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  changePercent: {
    fontSize: 13,
    color: '#00C853',
    fontWeight: '500',
  },
  chartSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chartIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  chartIconButton: {
    padding: 4,
  },
  allocationChart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  donutPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  legend: {
    flex: 1,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  legendPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  trendChart: {
    height: 150,
    marginBottom: 16,
  },
  currentValue: {
    position: 'absolute',
    top: 10,
    right: 0,
    fontSize: 13,
    fontWeight: '600',
    color: '#ff8c00',
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
  },
  startValue: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
    fontWeight: '500',
  },
  assetListContainer: {
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  assetListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 18,
    height: 18,
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
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 24,
    color: '#fff',
  },
  assetInfo: {
    justifyContent: 'center',
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  assetAmount: {
    fontSize: 13,
    color: '#999',
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  assetChange: {
    fontSize: 13,
    color: '#00C853',
    fontWeight: '500',
  },
});
