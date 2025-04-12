import React from 'react';
import { useAuth } from '../context/AuthContext'; // Re-added import
import { useNavigation } from '@react-navigation/native';
import { Alert, View, ActivityIndicator } from 'react-native'; // Added View, ActivityIndicator
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '../store'; // Import RootState

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  // Get state directly from Redux
  const isAuthenticated = useSelector((state: RootState) => !!state.user.user);
  // Get loading state from AuthContext (represents initialization/ongoing auth ops)
  // We need useAuth back just for isLoading
  const { isLoading } = useAuth();
  const navigation = useNavigation();

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If not loading and not authenticated
  if (!isAuthenticated) {
    // If a fallback component is provided, render it
    if (fallback) {
      return <>{fallback}</>;
    }

    // Otherwise, show the login prompt alert (consider if this alert is the desired UX)
    // This alert might be disruptive. Often, navigation to LoginScreen is preferred.

    // Example: Redirect immediately instead of Alert
    // React.useEffect(() => {
    //   navigation.navigate('Login' as never);
    // }, [navigation]);
    // return null; // Return null while navigating

    // Keeping original Alert logic for now:
    Alert.alert(
      'Login Required',
      'Please log in to access this feature.', // Added period
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
