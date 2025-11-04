import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
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

  const renderInstantTab = () => (
    <>
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
            propsForDots: { r: '0' },
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

        <View style={styles.conversionRate}>
          <Text style={styles.conversionText}>1 BTC = 6 MIRA</Text>
          <TouchableOpacity style={styles.swapButton}>
            <Icon name="repeat" size={20} color="#666" />
          </TouchableOpacity>
        </View>

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

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Swap Now</Text>
      </TouchableOpacity>
    </>
  );

  const renderRecurringTab = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

      <View style={styles.conversionRate}>
        <Text style={styles.conversionText}>1 BTC = 6 MIRA</Text>
        <TouchableOpacity style={styles.swapButton}>
          <Icon name="repeat" size={20} color="#666" />
        </TouchableOpacity>
      </View>

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
            <Text style={styles.amountInputLarge}>100%</Text>
          </View>
        </View>
      </View>

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

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Create a Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderLimitTab = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.amountRange}>0.00 - 7.9</Text>
            <Text style={styles.balanceText}>Balance = 2</Text>
          </View>
        </View>
      </View>

      <View style={styles.conversionRate}>
        <Text style={styles.conversionText}>1 BTC = 6 MIRA</Text>
        <TouchableOpacity style={styles.swapButton}>
          <Icon name="repeat" size={20} color="#666" />
        </TouchableOpacity>
      </View>

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
            <Text style={styles.amountRange}>0.035 - 270</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.currencySection}>
        <Text style={styles.sectionLabel}>From</Text>
        <View style={styles.inputCard}>
          <View style={styles.inputLeft}>
            <View style={styles.currencySelectorStatic}>
              <View style={styles.currencyIconSmall}>
                <Text style={styles.currencyIconText}>🔶</Text>
              </View>
              <Text style={styles.currencyName}>BNB</Text>
            </View>
          </View>
          <View style={styles.inputRight}>
            <Text style={styles.amountInputLarge}>0.00145667</Text>
            <Text style={styles.balanceText}>Balance = 2</Text>
          </View>
        </View>
      </View>

      <View style={styles.expiresSection}>
        <Text style={styles.expiresLabel}>Expires in</Text>
        <TouchableOpacity style={styles.expiresValue}>
          <Text style={styles.expiresValueText}>Expires in 30 Days</Text>
          <Icon name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.previewButton}>
        <Text style={styles.previewButtonText}>Preview</Text>
      </TouchableOpacity>
    </ScrollView>
  );

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

      {activeTab === 'instant' && renderInstantTab()}
      {activeTab === 'recurring' && renderRecurringTab()}
      {activeTab === 'limit' && renderLimitTab()}
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
  currencySelectorStatic: {
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
  amountInputLarge: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    textAlign: 'right',
  },
  amountRange: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ccc',
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
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 24,
  },
  expiresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 24,
  },
  expiresLabel: {
    fontSize: 14,
    color: '#666',
  },
  expiresValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expiresValueText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#FF8C00',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  previewButton: {
    backgroundColor: '#FFE5CC',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 24,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
