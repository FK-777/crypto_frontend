import React, { useState } from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';

type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'reset-password';

interface AuthNavigatorProps {
  onAuthSuccess: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({
  onAuthSuccess,
}) => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');

  const handleLoginSuccess = () => {
    onAuthSuccess();
  };

  const handleSignupSuccess = () => {
    // After successful signup, you can either:
    // 1. Auto-login the user
    onAuthSuccess();
    // 2. Or go back to login
    // setCurrentScreen('login');
  };

  const handleResetSuccess = () => {
    // After password reset, go back to login
    setCurrentScreen('login');
  };

  switch (currentScreen) {
    case 'login':
      return (
        <LoginScreen
          onNavigateToSignup={() => setCurrentScreen('signup')}
          onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          onLoginSuccess={handleLoginSuccess}
        />
      );

    case 'signup':
      return (
        <SignupScreen
          onNavigateBack={() => setCurrentScreen('login')}
          onSignupSuccess={handleSignupSuccess}
        />
      );

    case 'forgot-password':
      return (
        <ForgotPasswordScreen
          onNavigateBack={() => setCurrentScreen('login')}
          onNavigateToResetPassword={() => setCurrentScreen('reset-password')}
        />
      );

    case 'reset-password':
      return (
        <ResetPasswordScreen
          onNavigateBack={() => setCurrentScreen('forgot-password')}
          onResetSuccess={handleResetSuccess}
        />
      );

    default:
      return (
        <LoginScreen
          onNavigateToSignup={() => setCurrentScreen('signup')}
          onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          onLoginSuccess={handleLoginSuccess}
        />
      );
  }
};
