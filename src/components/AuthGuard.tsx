import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    Alert.alert(
      'Login Required',
      'Please log in to access this feature',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('Login' as never) },
      ],
      { cancelable: true }
    );
    return null;
  }

  return <>{children}</>;
};

export const withAuthGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { fallback?: React.ReactNode } = {}
) => {
  return function WithAuthGuardComponent(props: P) {
    return (
      <AuthGuard fallback={options.fallback}>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };
};
