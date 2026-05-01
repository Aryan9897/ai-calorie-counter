import { useRouter } from 'expo-router';

import Dashboard from '@/screens/Dashboard/Dashboard';

export default function DashboardRoute() {
  const router = useRouter();

  return (
    <Dashboard
      onProfile={() => router.push('/profile')}
    />
  );
}
