import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LineChart } from 'react-native-chart-kit';
import { Platform, StatusBar } from 'react-native';

interface MarketDetailScreenProps {
  route: {
    params: {
      symbol: string;
      name: string;
      icon: string;
      color: string;
      price: number;
      change24h: number;
    };
  };
  navigation: any;
}

const chartData = {
  labels: ['', '', '', '', ''],
  datasets: [
    {
      data: [97.93, 102, 95, 88, 92.28],
      color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

export const MarketDetailScreen: React.FC<MarketDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { symbol, name, icon, color, price, change24h } = route.params;
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [showAlertModal, setShowAlertModal] = useState(false);

  const periods = ['7D', '30D', '180D', '360D'];

  const alertTypes = [
    'Price reaches',
    'Price rises above',
    'Price drops to',
    'Change is over',
    'Change is under',
    '24H change is over',
    '24H change is down',
  ];

  const handleAlertTypeSelect = (alertType: string) => {
    setShowAlertModal(false);
    navigation.navigate('CreateAlert', {
      symbol,
      name,
      icon,
      color,
      price,
      change24h,
      alertType,
    });
  };

  const changeAmount = (price * change24h) / 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Market Detail</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="more-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.coinHeader}>
            <View style={styles.coinInfo}>
              <View style={[styles.coinIcon, { backgroundColor: color }]}>
                <Text style={styles.coinIconText}>{icon}</Text>
              </View>
              <View style={styles.coinText}>
                <Text style={styles.coinSymbol}>{symbol}</Text>
                <Text style={styles.coinName}>{name}</Text>
              </View>
            </View>
            <View style={styles.coinActions}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => setShowAlertModal(true)}
              >
                <Icon name="bell" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <Icon name="share-2" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <Icon name="star" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceLeft}>
              <Text style={styles.price}>${price.toLocaleString()}</Text>
              <Text
                style={[
                  styles.change,
                  { color: change24h >= 0 ? '#00C853' : '#FF3D00' },
                ]}
              >
                {change24h >= 0 ? '+' : ''}
                {changeAmount.toLocaleString()} ({change24h >= 0 ? '+' : ''}
                {change24h.toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.priceRight}>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>High</Text>
                <Text style={styles.priceValue}>
                  {(price * 1.05).toLocaleString()}
                </Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Low</Text>
                <Text style={styles.priceValue}>
                  {(price * 0.95).toLocaleString()}
                </Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>24H Vol (USD)</Text>
                <Text style={styles.priceValue}>658,45M</Text>
              </View>
            </View>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.currentValue}>Rs 92.28</Text>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 32}
              height={180}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#FFF8F0',
                backgroundGradientTo: '#FFF8F0',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ff8c00',
                  fill: '#ff8c00',
                },
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
              }}
              bezier
              style={styles.chart}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
            />
            <Text style={styles.startValue}>Rs 97.93</Text>

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

          <View style={styles.statsSection}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Your Balance</Text>
              <Text style={styles.statValue}>0 {symbol}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Rank</Text>
              <Text style={styles.statValue}>No. 1</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Market Cap</Text>
              <Text style={styles.statValue}>$ 500</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Market Domination</Text>
              <Text style={styles.statValue}>70,22 %</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Circulation Supply</Text>
              <Text style={styles.statValue}>17,54M {symbol}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Max Supply</Text>
              <Text style={styles.statValue}>25M {symbol}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Supply</Text>
              <Text style={styles.statValue}>15,2M {symbol}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Issue Date</Text>
              <Text style={styles.statValue}>2008-11-01</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Issue Price</Text>
              <Text style={styles.statValue}>$0.308</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>All Time High</Text>
              <Text style={styles.statValue}>$4953.7329</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>All Time Low</Text>
              <Text style={styles.statValue}>$0.4208970069886525</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.sellButton}>
              <Text style={styles.sellButtonText}>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Alert Type Modal */}
        <Modal
          visible={showAlertModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowAlertModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowAlertModal(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Alert Type</Text>
              {alertTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.alertTypeItem}
                  onPress={() => handleAlertTypeSelect(type)}
                >
                  <Text style={styles.alertTypeText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuButton: {
    padding: 4,
  },
  coinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coinIconText: {
    fontSize: 24,
    color: '#fff',
  },
  coinText: {
    justifyContent: 'center',
  },
  coinSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  coinName: {
    fontSize: 14,
    color: '#999',
  },
  coinActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    padding: 8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  priceLeft: {
    justifyContent: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceRight: {
    alignItems: 'flex-end',
  },
  priceItem: {
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  chartSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  currentValue: {
    position: 'absolute',
    top: 26,
    right: 16,
    fontSize: 13,
    fontWeight: '600',
    color: '#ff8c00',
    zIndex: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  startValue: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginLeft: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
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
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 100,
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#FF3D00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 8,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    paddingVertical: 8,
  },
  alertTypeItem: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  alertTypeText: {
    fontSize: 15,
    color: '#333',
  },
});
