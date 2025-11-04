import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface EditAlertScreenProps {
  navigation: any;
  route: any;
}

export const EditAlertScreen: React.FC<EditAlertScreenProps> = ({
  navigation,
  route,
}) => {
  const { alert } = route.params || {};

  const [alertType, setAlertType] = useState(
    alert?.alertType || 'Price Reaches',
  );
  const [value, setValue] = useState(
    alert?.value?.split(' ')[0] || 'Rs. 32028785.69',
  );
  const [frequency, setFrequency] = useState(alert?.frequency || 'Once');
  const [note, setNote] = useState(alert?.note || 'No Additional Notes');
  const [showMenu, setShowMenu] = useState(false);
  const [showAlertTypeDropdown, setShowAlertTypeDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const alertTypes = [
    'Price Reaches',
    'Price rises above',
    'Price drops to',
    'Change is over',
    'Change is under',
    '24H change is over',
    '24H change is down',
  ];

  const frequencies = ['Once', 'Every time', 'Daily'];

  const handleSave = () => {
    // Save logic here
    console.log('Saving alert:', { alertType, value, frequency, note });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Alert</Text>
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

        {/* Form */}
        <View style={styles.form}>
          {/* Alert Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alert Type</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowAlertTypeDropdown(true)}
            >
              <Text style={styles.dropdownText}>{alertType}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Value */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Value</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          {/* Frequency */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Frequency</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowFrequencyDropdown(true)}
            >
              <Text style={styles.dropdownText}>{frequency}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Note */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
              placeholder="Add optional notes..."
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Alert Type Dropdown Modal */}
      <Modal
        visible={showAlertTypeDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAlertTypeDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAlertTypeDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Alert Type</Text>
            {alertTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setAlertType(type);
                  setShowAlertTypeDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
                {alertType === type && (
                  <Icon name="check" size={20} color="#FF8C00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Frequency Dropdown Modal */}
      <Modal
        visible={showFrequencyDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFrequencyDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFrequencyDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Frequency</Text>
            {frequencies.map((freq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setFrequency(freq);
                  setShowFrequencyDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{freq}</Text>
                {frequency === freq && (
                  <Icon name="check" size={20} color="#FF8C00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 8,
    maxHeight: '70%',
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
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#333',
  },
});
