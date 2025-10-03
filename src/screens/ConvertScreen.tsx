import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

interface ConvertScreenProps {
  onClose: () => void;
}

export const ConvertScreen: React.FC<ConvertScreenProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'recurring' | 'limit'>(
    'instant',
  );
  const [selectedPeriod, setSelectedPeriod] = useState('1D');

  const periods = ['1D', '1W', '1M'];

  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: [0.0015, 0.0018, 0.0014, 0.0016, 0.0015, 0.00145],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Convert</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'instant' && styles.activeTab]}
          onPress={() => setActiveTab('instant')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'instant' && styles.activeTabText,
            ]}
          >
            Instant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recurring' && styles.activeTab]}
          onPress={() => setActiveTab('recurring')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'recurring' && styles.activeTabText,
            ]}
          >
            Recurring
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'limit' && styles.activeTab]}
          onPress={() => setActiveTab('limit')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'limit' && styles.activeTabText,
            ]}
          >
            Limit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>1 MIRA = 0.00145667 BNB</Text>
        <Text style={styles.rateChange}>-2.96%</Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 6,
            color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '0',
            },
          }}
          bezier
          style={styles.chart}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
        />
      </View>

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
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="info" size={16} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.convertContainer}>
        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>From</Text>
          <View style={styles.availableContainer}>
            <Text style={styles.availableText}>Available 0.00030437 BNB</Text>
          </View>
          <TouchableOpacity style={styles.currencyCard}>
            <View style={styles.currencyLeft}>
              <View style={styles.currencyIcon}>
                <Text style={styles.currencyIconText}>🔶</Text>
              </View>
              <View style={styles.currencyInfo}>
                <Text style={styles.currencyName}>BNB</Text>
                <Text style={styles.currencySubtext}>ETHW</Text>
              </View>
              <View style={styles.dropdownIcon}>
                <Icon name="chevron-down" size={20} color="#999" />
              </View>
            </View>
            <View style={styles.currencyRight}>
              <Text style={styles.amountRange}>0.00001 - 8.2</Text>
              <TouchableOpacity>
                <Text style={styles.maxButton}>Max</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.swapIconContainer}>
          <TouchableOpacity style={styles.swapButton}>
            <Icon name="repeat" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.currencySection}>
          <Text style={styles.sectionLabel}>To</Text>
          <TouchableOpacity style={styles.currencyCard}>
            <View style={styles.currencyLeft}>
              <View style={styles.currencyIcon}>
                <Text style={styles.currencyIconText}>💎</Text>
              </View>
              <View style={styles.currencyInfo}>
                <Text style={styles.currencyName}>ETHW</Text>
              </View>
              <View style={styles.dropdownIcon}>
                <Icon name="chevron-down" size={20} color="#999" />
              </View>
            </View>
            <View style={styles.currencyRight}>
              <Text style={styles.amountRangeTo}>0.0072 - 5700</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addFundsButton}>
        <Text style={styles.addFundsButtonText}>Add Funds</Text>
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
  placeholder: {
    width: 32,
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
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rateText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  rateChange: {
    fontSize: 14,
    color: '#FF3D00',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#FFFBF5',
  },
  chart: {
    marginVertical: 0,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 24,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  periodButtonActive: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
  },
  periodText: {
    fontSize: 14,
    color: '#999',
  },
  periodTextActive: {
    color: '#ff8c00',
    fontWeight: '600',
  },
  infoButton: {
    padding: 4,
  },
  convertContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  currencySection: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  availableContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  availableText: {
    fontSize: 12,
    color: '#999',
  },
  currencyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currencyIconText: {
    fontSize: 20,
  },
  currencyInfo: {
    justifyContent: 'center',
    marginRight: 8,
  },
  currencyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  currencySubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  dropdownIcon: {
    padding: 4,
  },
  currencyRight: {
    alignItems: 'flex-end',
  },
  amountRange: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ccc',
    marginBottom: 4,
  },
  amountRangeTo: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ccc',
  },
  maxButton: {
    fontSize: 14,
    color: '#ff8c00',
    fontWeight: '600',
  },
  swapIconContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFundsButton: {
    backgroundColor: '#FFD699',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 24,
    alignItems: 'center',
  },
  addFundsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
