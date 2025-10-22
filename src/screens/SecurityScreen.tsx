import React from 'react';
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

interface SecurityScreenProps {
  navigation: any;
}

const securityOptions = [
  {
    id: 'passkeys',
    icon: 'key',
    label: 'Passkeys (Biometrics)',
  },
  {
    id: 'authenticator',
    icon: 'smartphone',
    label: 'Authenticator App',
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email',
  },
  {
    id: 'password',
    icon: 'lock',
    label: 'Password',
  },
  {
    id: 'pin',
    icon: 'hash',
    label: 'Pay PIN',
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Phone Number',
  },
];

export const SecurityScreen: React.FC<SecurityScreenProps> = ({
  navigation,
}) => {
  const handleOptionPress = (optionId: string, label: string) => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 2FA Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Two-Factor Authentication (2FA)</Text>
          <Text style={styles.infoDescription}>
            To protect your account, it is recommended to enable at least two
            forms of 2FA
          </Text>
        </View>

        {/* Security Options List */}
        <View style={styles.optionsList}>
          {securityOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                index === securityOptions.length - 1 && styles.lastOptionItem,
              ]}
              onPress={() => handleOptionPress(option.id, option.label)}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={option.icon} size={20} color="#333" />
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  optionsList: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '400',
  },
});
