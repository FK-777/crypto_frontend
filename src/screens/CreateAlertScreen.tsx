import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CreateAlertScreenProps {
  route: {
    params: {
      symbol: string;
      name: string;
      icon: string;
      color: string;
      price: number;
      change24h: number;
      alertType: string;
    };
  };
  navigation: any;
}

const alertTypes = [
  'Price reaches',
  'Price rises above',
  'Price drops to',
  'Change is over',
  'Change is under',
  '24H change is over',
  '24H change is down',
];

const frequencies = ['Once', 'Daily', 'Weekly', 'Always'];

export const CreateAlertScreen: React.FC<CreateAlertScreenProps> = ({
  route,
  navigation,
}) => {
  const { symbol, name, icon, color, price, change24h, alertType } =
    route.params;

  const [selectedAlertType, setSelectedAlertType] = useState(
    alertType || alertTypes[0],
  );
  const [value, setValue] = useState(`Rs. ${Math.floor(price * 52)}`);
  const [selectedFrequency, setSelectedFrequency] = useState('Once');
  const [note, setNote] = useState('');
  const [showAlertTypeDropdown, setShowAlertTypeDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const changeAmount = (price * change24h) / 100;

  const handleCreateAlert = () => {
    // Handle create alert logic here
    console.log('Creating alert:', {
      symbol,
      alertType: selectedAlertType,
      value,
      frequency: selectedFrequency,
      note,
    });
    navigation.goBack();
  };

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
          <Text style={styles.headerTitle}>Create Alert</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="more-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.coinCard}>
            <View style={styles.coinInfo}>
              <View style={[styles.coinIcon, { backgroundColor: color }]}>
                <Text style={styles.coinIconText}>{icon}</Text>
              </View>
              <View>
                <Text style={styles.coinSymbol}>{symbol}</Text>
                <Text style={styles.coinName}>{name}</Text>
              </View>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.currentPrice}>${price.toLocaleString()}</Text>
              <Text
                style={[
                  styles.priceChange,
                  { color: change24h >= 0 ? '#00C853' : '#FF3D00' },
                ]}
              >
                {change24h >= 0 ? '+' : ''}
                {changeAmount.toLocaleString()} ({change24h >= 0 ? '+' : ''}
                {change24h.toFixed(1)}%)
              </Text>
            </View>
          </View>

          {/* Alert Type Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Alert Type</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowAlertTypeDropdown(!showAlertTypeDropdown)}
            >
              <Text style={styles.dropdownText}>{selectedAlertType}</Text>
              <Icon
                name={showAlertTypeDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
            {showAlertTypeDropdown && (
              <View style={styles.dropdownMenu}>
                {alertTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedAlertType(type);
                      setShowAlertTypeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Value Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Value</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
          </View>

          {/* Frequency Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Select Frequency</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
            >
              <Text style={styles.dropdownText}>{selectedFrequency}</Text>
              <Icon
                name={showFrequencyDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
            {showFrequencyDropdown && (
              <View style={styles.dropdownMenu}>
                {frequencies.map(freq => (
                  <TouchableOpacity
                    key={freq}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedFrequency(freq);
                      setShowFrequencyDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{freq}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Note Input */}
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Add Note (Optional)"
              placeholderTextColor="#999"
              multiline
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAlert}
          >
            <Text style={styles.createButtonText}>Create Alert</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  coinCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 24,
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
  priceInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 13,
    fontWeight: '500',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
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
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  noteInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
