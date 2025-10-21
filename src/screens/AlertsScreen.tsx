import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Alert {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  color: string;
  price: number;
  change24h: number;
  alertType: string;
  value: string;
  valueInRs: string;
  frequency: string;
  note: string;
}

interface AlertsScreenProps {
  navigation: any;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({ navigation }) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      color: '#F7931A',
      price: 62000.0,
      change24h: 4.2,
      alertType: 'Price Reaches',
      value: '113,500.00 USDT',
      valueInRs: '(~Rs 32,028,802.62)',
      frequency: 'Only Once',
      note: 'Optional Notes',
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      color: '#F7931A',
      price: 62000.0,
      change24h: 4.2,
      alertType: 'Price rises above',
      value: '114,481.00 USDT',
      valueInRs: '(~Rs 32,028,802.62)',
      frequency: 'Only Once',
      note: 'Optional Notes',
    },
    {
      id: '3',
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      color: '#F7931A',
      price: 62000.0,
      change24h: 4.2,
      alertType: 'Price drops to',
      value: '112,481.00 USDT',
      valueInRs: '(~Rs 32,028,802.62)',
      frequency: 'Only Once',
      note: 'Optional Notes',
    },
  ]);

  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = (alert: Alert) => {
    navigation.navigate('EditAlert', { alert });
  };

  const handleDelete = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const AlertCard = ({ alert }: { alert: Alert }) => {
    return (
      <TouchableOpacity
        style={styles.alertCard}
        onPress={() => handleEdit(alert)}
      >
        <View style={styles.alertHeader}>
          <Text style={styles.alertType}>{alert.alertType}</Text>
          <View style={styles.alertActions}>
            <TouchableOpacity
              onPress={() => handleEdit(alert)}
              style={styles.iconButton}
            >
              <Icon name="edit-2" size={18} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(alert.id)}
              style={styles.iconButton}
            >
              <Icon name="trash-2" size={18} color="#FF3D00" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.alertValue}>{alert.value}</Text>
        <Text style={styles.alertValueInRs}>{alert.valueInRs}</Text>

        <View style={styles.alertFooter}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{alert.frequency}</Text>
          </View>
          <View style={[styles.badge, styles.badgeLast]}>
            <Text style={styles.badgeText}>Last Price</Text>
          </View>
        </View>

        <Text style={styles.alertNote}>{alert.note}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Alerts</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Icon name="more-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Crypto Info */}
        <View style={styles.cryptoInfo}>
          <View style={styles.cryptoLeft}>
            <View style={[styles.cryptoIcon, { backgroundColor: '#F7931A' }]}>
              <Text style={styles.cryptoIconText}>₿</Text>
            </View>
            <View>
              <Text style={styles.cryptoSymbol}>BTC</Text>
              <Text style={styles.cryptoName}>Bitcoin</Text>
            </View>
          </View>
          <View style={styles.cryptoRight}>
            <Text style={styles.cryptoPrice}>$62,000.00</Text>
            <Text style={styles.cryptoChange}>+ 20,000.00 (4.2%)</Text>
          </View>
        </View>

        {/* Alerts List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </ScrollView>

        {/* Add Alert Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('CreateAlert', {
              symbol: 'BTC',
              name: 'Bitcoin',
              icon: '₿',
              color: '#F7931A',
              price: 62000.0,
              change24h: 4.2,
              alertType: 'Price Reaches',
            })
          }
        >
          <Text style={styles.addButtonText}>Add Alert</Text>
        </TouchableOpacity>
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
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 4,
  },
  cryptoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cryptoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 24,
    color: '#fff',
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cryptoName: {
    fontSize: 13,
    color: '#999',
  },
  cryptoRight: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cryptoChange: {
    fontSize: 13,
    color: '#00C853',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertType: {
    fontSize: 14,
    color: '#999',
  },
  alertActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  alertValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  alertValueInRs: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  alertFooter: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeLast: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '500',
  },
  alertNote: {
    fontSize: 13,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#FF8C00',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
