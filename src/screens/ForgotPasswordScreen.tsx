import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ForgotPasswordScreenProps {
  onNavigateBack: () => void;
  onNavigateToResetPassword: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigateBack,
  onNavigateToResetPassword,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSendLink = () => {
    if (!emailOrPhone.trim()) {
      alert('Please enter your email or phone number');
      return;
    }
    // Add your reset password logic here
    console.log('Send reset link to:', emailOrPhone);
    onNavigateToResetPassword();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password ?</Text>
          <Text style={styles.subtitle}>
            Please Enter your Email or Phone Number to reset youe account
            password.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Please enter your mail or phone number"
              placeholderTextColor="#999"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Icon name="eye" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendLink}>
            <Text style={styles.sendButtonText}>Send Re-set Link</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  sendButton: {
    backgroundColor: '#ff8c00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
