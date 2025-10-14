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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface LoginScreenProps {
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login:', emailOrPhone, password);
    // For now, just navigate to main app
    onLoginSuccess();
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    console.log('Google login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>Faraz Khan!</Text>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText}>back .</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or Phone number"
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onNavigateToForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={onNavigateToSignup}
            >
              <Text style={styles.createAccountText}>Create an Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ff8c00',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
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
  forgotPassword: {
    textAlign: 'right',
    color: '#ff8c00',
    fontSize: 14,
    marginBottom: 24,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#ff8c00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginVertical: 16,
  },
  createAccountButton: {
    backgroundColor: '#FFF5E6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  createAccountText: {
    color: '#ff8c00',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff8c00',
    borderRadius: 12,
    paddingVertical: 16,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff8c00',
    marginRight: 8,
  },
  googleText: {
    color: '#ff8c00',
    fontSize: 16,
    fontWeight: '600',
  },
});
