import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

interface InstantConvertScreenProps {
  onClose: () => void;
}

export const InstantConvertScreen: React.FC<InstantConvertScreenProps> = ({
  onClose,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [fromAmount, setFromAmount] = useState('0.00145667');
  const [toAmount, setToAmount] = useState('1');

  const periods = ['7D', '30D', '180D', '360D'];

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
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bar-chart-2" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tabs remain here for navigation between modes */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Instant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Recurring</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Limit</Text>
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
            backgroundGradientFrom: '#FFFBF5',
            backgroundGradientTo: '#FFFBF5',
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
      </View>

      <View style={styles.convertContainer}>
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
              <TextInput
                style={styles.amountInput}
                value={fromAmount}
                onChangeText={setFromAmount}
                keyboardType="decimal-pad"
                placeholderTextColor="#ccc"
              />
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
          <Text style={styles.sectionLabel}>To</Text>
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
              <TextInput
                style={styles.amountInput}
                value={toAmount}
                onChangeText={setToAmount}
                keyboardType="decimal-pad"
                placeholderTextColor="#ccc"
              />
              <Text style={styles.balanceText}>Balance = 20</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.swapNowButton}>
        <Text style={styles.swapNowButtonText}>Swap Now</Text>
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
  convertContainer: {
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
  amountInput: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    textAlign: 'right',
    padding: 0,
    minWidth: 100,
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
  swapNowButton: {
    backgroundColor: '#FF8C00',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  swapNowButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
