import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import { initSupabase } from '@calorie/services';

initSupabase(Platform.OS === 'web' ? undefined : AsyncStorage);

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(protected)" options={{ animation: 'fade' }} />
      </Stack>
    </ThemeProvider>
  );
}
