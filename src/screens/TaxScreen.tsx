import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface DropdownItem {
  label: string;
  value: string;
}

const exchanges: DropdownItem[] = [
  { label: 'Binance', value: 'binance' },
  { label: 'Coinbase', value: 'coinbase' },
  { label: 'Kraken', value: 'kraken' },
  { label: 'MetaMask', value: 'metamask' },
];

const taxYears: DropdownItem[] = [
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
];

const countries: DropdownItem[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
];

export const TaxScreen = () => {
  const [showExchanges, setShowExchanges] = useState(false);
  const [showTaxYear, setShowTaxYear] = useState(false);
  const [showCountry, setShowCountry] = useState(false);

  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedTaxYear, setSelectedTaxYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calculate Tax</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Capital Gains</Text>
            <Text style={styles.summaryValue}>$1,000</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Losses</Text>
            <Text style={styles.summaryValue}>$1,000</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Income (Staking, Airdrops)</Text>
            <Text style={styles.summaryValue}>$1,000</Text>
          </View>
        </View>

        {/* Dropdowns */}
        <View style={styles.dropdownsContainer}>
          {/* Connected Exchanges & Wallets */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowExchanges(!showExchanges);
              setShowTaxYear(false);
              setShowCountry(false);
            }}
          >
            <Text style={styles.dropdownText}>
              {selectedExchange || 'Connected Exchanges & Wallets'}
            </Text>
            <Icon
              name={showExchanges ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {showExchanges && (
            <View style={styles.dropdownMenu}>
              {exchanges.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedExchange(item.label);
                    setShowExchanges(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tax Year */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowTaxYear(!showTaxYear);
              setShowExchanges(false);
              setShowCountry(false);
            }}
          >
            <Text style={styles.dropdownText}>
              {selectedTaxYear || 'Tax Year'}
            </Text>
            <Icon
              name={showTaxYear ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {showTaxYear && (
            <View style={styles.dropdownMenu}>
              {taxYears.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTaxYear(item.label);
                    setShowTaxYear(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Country */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowCountry(!showCountry);
              setShowExchanges(false);
              setShowTaxYear(false);
            }}
          >
            <Text style={styles.dropdownText}>
              {selectedCountry || 'Country'}
            </Text>
            <Icon
              name={showCountry ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {showCountry && (
            <View style={styles.dropdownMenu}>
              {countries.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCountry(item.label);
                    setShowCountry(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdownsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#333',
  },
});
