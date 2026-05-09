import { Stack, Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStatus } from '@/components/useAuthStatus';

export default function ProtectedLayout() {
  const status = useAuthStatus();

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (status === 'anon') return <Redirect href="/" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="profile" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
