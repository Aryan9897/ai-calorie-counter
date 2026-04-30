import { Slot, Redirect } from 'expo-router';

// TODO: replace with real auth state from Supabase once auth is wired up
const useIsAuthenticated = () => true;

export default function ProtectedLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Redirect href="/" />;

  return <Slot />;
}
