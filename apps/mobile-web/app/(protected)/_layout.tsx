import { Stack, Redirect } from 'expo-router';

// TODO: replace with real auth state from Supabase once auth is wired up
const useIsAuthenticated = () => true;

export default function ProtectedLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Redirect href="/" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="profile" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
