import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface RecurringConvertScreenProps {
  onClose: () => void;
  onTabChange?: (tab: 'instant' | 'recurring' | 'limit') => void;
}

export const RecurringConvertScreen: React.FC<RecurringConvertScreenProps> = ({
  onClose,
  onTabChange,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Convert</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bar-chart-2" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange?.('instant')}
        >
          <Text style={styles.tabText}>Instant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Recurring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange?.('limit')}
        >
          <Text style={styles.tabText}>Limit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* From Section */}
        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>From</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputLeft}>
              <TouchableOpacity style={styles.currencySelector}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencyIconText}>🔶</Text>
                </View>
                <Text style={styles.currencyName}>BNB</Text>
                <Icon name="chevron-down" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputRight}>
              <Text style={styles.amountRange}>0.1 - 490000</Text>
              <Text style={styles.balanceText}>Balance = 2</Text>
            </View>
          </View>
        </View>

        {/* Conversion Rate */}
        <View style={styles.conversionRate}>
          <Text style={styles.conversionText}>1 BTC = 6 MIRA</Text>
          <TouchableOpacity style={styles.swapButton}>
            <Icon name="repeat" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* To Section */}
        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>
            To <Text style={styles.percentageLabel}>(100% / 100%)</Text>
          </Text>
          <View style={styles.inputCard}>
            <View style={styles.inputLeft}>
              <TouchableOpacity style={styles.currencySelector}>
                <View style={styles.currencyIconSmall}>
                  <Text style={styles.currencyIconText}>💎</Text>
                </View>
                <Text style={styles.currencyName}>MIRA</Text>
                <Icon name="chevron-down" size={16} color="#999" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputRight}>
              <Text style={styles.amountInput}>100%</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Frequency</Text>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>Daily, 00:00 (UTC)+5</Text>
              <Icon name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Asset Destination</Text>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>Spot Amount</Text>
              <Icon name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Plan Name</Text>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>BTC Recurring Plan</Text>
              <Icon name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Max Period</Text>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>--</Text>
              <Icon name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Limit Price</Text>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>--</Text>
              <Icon name="chevron-down" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create a Plan</Text>
      </TouchableOpacity>
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
  iconButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  currencySection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  percentageLabel: {
    color: '#00C853',
    fontSize: 13,
  },
  inputCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  inputLeft: {
    flex: 1,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIconText: {
    fontSize: 18,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inputRight: {
    alignItems: 'flex-end',
  },
  amountRange: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ccc',
    textAlign: 'right',
  },
  amountInput: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  balanceText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  conversionRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  conversionText: {
    fontSize: 14,
    color: '#666',
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    marginTop: 24,
    paddingBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#FF8C00',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
