import { Redirect, useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import Login from '@/screens/Login/Login';
import { useAuthStatus } from '@/components/useAuthStatus';

export default function LoginRoute() {
  const router = useRouter();
  const status = useAuthStatus();

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (status === 'authed') return <Redirect href="/dashboard" />;

  return (
    <Login
      onLogin={() => router.replace('/dashboard')}
      onSignup={() => router.push('/signup')}
    />
  );
}
