import { useRouter } from 'expo-router';

import Profile from '@/screens/Profile/Profile';

export default function ProfileRoute() {
  const router = useRouter();

  return (
    <Profile
      onBack={() => router.back()}
      onLogout={() => router.replace('/')}
    />
  );
}
